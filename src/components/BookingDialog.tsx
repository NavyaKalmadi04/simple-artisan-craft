import { useEffect, useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Loader2, MessageCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

export type BookingService = {
  key: string;
  label: string;
  whatsappTemplate: string;
};

const WHATSAPP_NUMBER = "918428638871";

const bookingSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(120),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z
    .string()
    .trim()
    .min(4, "Phone is required")
    .max(32)
    .regex(/^[0-9+\-\s()]+$/, "Only digits, spaces, +, -, ( )"),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  projectType: z.string().trim().max(120).optional().or(z.literal("")),
  budget: z.string().trim().max(60).optional().or(z.literal("")),
  timeline: z.string().trim().max(60).optional().or(z.literal("")),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
});

type BookingForm = z.infer<typeof bookingSchema>;

const BUDGETS = [
  "Under ₹50k",
  "₹50k – ₹2L",
  "₹2L – ₹5L",
  "₹5L – ₹10L",
  "₹10L+",
  "Not sure yet",
];

const TIMELINES = [
  "ASAP",
  "Within 2 weeks",
  "Within 1 month",
  "1–3 months",
  "Flexible",
];

function buildWhatsAppMessage(service: BookingService, form: BookingForm) {
  const lines = [
    service.whatsappTemplate,
    "",
    "— Booking details —",
    `Service: ${service.label}`,
    `Name: ${form.name}`,
    `Email: ${form.email}`,
    `Phone: ${form.phone}`,
  ];
  if (form.company) lines.push(`Company: ${form.company}`);
  if (form.projectType) lines.push(`Project type: ${form.projectType}`);
  if (form.budget) lines.push(`Budget: ${form.budget}`);
  if (form.timeline) lines.push(`Timeline: ${form.timeline}`);
  if (form.message) {
    lines.push("", "Notes:", form.message);
  }
  return lines.join("\n");
}

export function BookingDialog({
  service,
  serviceOptions,
  open,
  onOpenChange,
}: {
  service: BookingService | null;
  serviceOptions?: BookingService[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [form, setForm] = useState<BookingForm>({
    name: "",
    email: "",
    phone: "",
    company: "",
    projectType: "",
    budget: "",
    timeline: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof BookingForm, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [selectedKey, setSelectedKey] = useState<string>("");

  useEffect(() => {
    if (!open) {
      setErrors({});
      setSubmitting(false);
      setSelectedKey("");
    } else if (service) {
      setSelectedKey(service.key);
    }
  }, [open, service]);

  const showPicker = !service && !!serviceOptions?.length;
  const activeService: BookingService | null =
    service ?? serviceOptions?.find((s) => s.key === selectedKey) ?? null;

  if (!service && !serviceOptions?.length) return null;

  const setField = <K extends keyof BookingForm>(key: K, value: BookingForm[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (!activeService) {
      toast.error("Please choose a service.");
      return;
    }

    const parsed = bookingSchema.safeParse(form);
    if (!parsed.success) {
      const fieldErrors: Partial<Record<keyof BookingForm, string>> = {};
      for (const issue of parsed.error.issues) {
        const k = issue.path[0] as keyof BookingForm;
        if (!fieldErrors[k]) fieldErrors[k] = issue.message;
      }
      setErrors(fieldErrors);
      toast.error("Please fix the highlighted fields.");
      return;
    }

    const data = parsed.data;
    const whatsappMessage = buildWhatsAppMessage(activeService, data);
    const waUrl = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(
      whatsappMessage,
    )}`;

    // Open the WhatsApp tab SYNCHRONOUSLY from the user click so desktop
    // browsers don't block it as a popup. We navigate it after the insert.
    const waWindow =
      typeof window !== "undefined" ? window.open("about:blank", "_blank") : null;

    setSubmitting(true);

    const { error } = await supabase.from("bookings").insert({
      service: activeService.key,
      service_label: activeService.label,
      name: data.name,
      email: data.email,
      phone: data.phone,
      company: data.company || null,
      project_type: data.projectType || null,
      budget: data.budget || null,
      timeline: data.timeline || null,
      message: data.message || null,
      whatsapp_message: whatsappMessage,
      forwarded_to_whatsapp: true,
      source_page: typeof window !== "undefined" ? window.location.pathname : null,
      referrer: typeof document !== "undefined" ? document.referrer || null : null,
      user_agent: typeof navigator !== "undefined" ? navigator.userAgent : null,
    });

    setSubmitting(false);

    if (error) {
      console.error("[booking] insert failed", error);
      if (waWindow && !waWindow.closed) waWindow.close();
      toast.error("Couldn't save your booking. Please try again or WhatsApp us directly.");
      return;
    }

    toast.success("Booking received — opening WhatsApp…");

    if (waWindow && !waWindow.closed) {
      try {
        waWindow.location.href = waUrl;
      } catch {
        waWindow.location.replace(waUrl);
      }
    } else if (typeof window !== "undefined") {
      // Popup blocked — surface a manual link and fall back to same-tab nav.
      toast.message("WhatsApp didn't open automatically.", {
        description: "Tap to continue your enquiry.",
        action: {
          label: "Open WhatsApp",
          onClick: () => window.open(waUrl, "_blank", "noopener,noreferrer"),
        },
        duration: 15000,
      });
      setTimeout(() => {
        window.location.href = waUrl;
      }, 600);
    }

    setForm({
      name: "",
      email: "",
      phone: "",
      company: "",
      projectType: "",
      budget: "",
      timeline: "",
      message: "",
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">
            {service ? `Book: ${service.label}` : "Book a session"}
          </DialogTitle>
          <DialogDescription>
            Share a few details — we save your enquiry and open WhatsApp with the full message
            pre-filled, ready to send to our team.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-2 grid gap-4">
          {showPicker && (
            <div className="grid gap-2">
              <Label htmlFor="b-service">Which service? *</Label>
              <Select value={selectedKey} onValueChange={setSelectedKey}>
                <SelectTrigger id="b-service">
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent>
                  {serviceOptions!.map((s) => (
                    <SelectItem key={s.key} value={s.key}>
                      {s.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          <div className="grid gap-2">
            <Label htmlFor="b-name">Your name *</Label>
            <Input
              id="b-name"
              value={form.name}
              onChange={(e) => setField("name", e.target.value)}
              maxLength={120}
              autoComplete="name"
              required
            />
            {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="b-email">Email *</Label>
              <Input
                id="b-email"
                type="email"
                value={form.email}
                onChange={(e) => setField("email", e.target.value)}
                maxLength={255}
                autoComplete="email"
                required
              />
              {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="b-phone">Phone / WhatsApp *</Label>
              <Input
                id="b-phone"
                type="tel"
                value={form.phone}
                onChange={(e) => setField("phone", e.target.value)}
                maxLength={32}
                autoComplete="tel"
                placeholder="+91…"
                required
              />
              {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="b-company">Company / College</Label>
              <Input
                id="b-company"
                value={form.company}
                onChange={(e) => setField("company", e.target.value)}
                maxLength={120}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="b-project">Project type</Label>
              <Input
                id="b-project"
                value={form.projectType}
                onChange={(e) => setField("projectType", e.target.value)}
                maxLength={120}
                placeholder="e.g. SaaS, landing page, workshop"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="b-budget">Budget</Label>
              <Select value={form.budget} onValueChange={(v) => setField("budget", v)}>
                <SelectTrigger id="b-budget">
                  <SelectValue placeholder="Select budget" />
                </SelectTrigger>
                <SelectContent>
                  {BUDGETS.map((b) => (
                    <SelectItem key={b} value={b}>
                      {b}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="b-timeline">Timeline</Label>
              <Select value={form.timeline} onValueChange={(v) => setField("timeline", v)}>
                <SelectTrigger id="b-timeline">
                  <SelectValue placeholder="Select timeline" />
                </SelectTrigger>
                <SelectContent>
                  {TIMELINES.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="b-message">Tell us about your project</Label>
            <Textarea
              id="b-message"
              value={form.message}
              onChange={(e) => setField("message", e.target.value)}
              maxLength={2000}
              rows={4}
              placeholder="Goals, audience, references, anything that helps us prepare."
            />
            {errors.message && <p className="text-xs text-destructive">{errors.message}</p>}
          </div>

          <DialogFooter className="mt-2 gap-2 sm:gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={submitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={submitting}>
              {submitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving…
                </>
              ) : (
                <>
                  <MessageCircle className="mr-2 h-4 w-4" /> Save & open WhatsApp
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
