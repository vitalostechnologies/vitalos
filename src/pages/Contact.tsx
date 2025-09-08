import React, { useState } from "react";
import SectionHero from "../components/SectionHero";

const ContactPage: React.FC = () => {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setErrors({});
    setStatus("submitting");

    const fd = new FormData(e.currentTarget);
    const data = {
      name: String(fd.get("name") || "").trim(),
      email: String(fd.get("email") || "").trim(),
      message: String(fd.get("message") || "").trim(),
      consent: fd.get("consent") === "on",
    };

    const newErrors: Record<string, string> = {};
    if (!data.name) newErrors.name = "Please enter your name.";
    if (!data.email || !/^\S+@\S+\.\S+$/.test(data.email)) newErrors.email = "Enter a valid email.";
    if (!data.message) newErrors.message = "Please write a short message.";
    if (!data.consent) newErrors.consent = "Please accept the privacy notice.";
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      setStatus("idle");
      return;
    }

    try {
      // TODO: hook to your API/Email service
      console.log("Contact form submitted:", data);
      setStatus("success");
      e.currentTarget.reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <main className="pt-20">
      {/* Reusable hero: black → soft green → black */}
      <SectionHero
        title="Contact Form"
        subtitle="We’d love to hear from you"
        heightClass="h-40 md:h-48"
        greenOpacity={0.25}
      />

      {/* Contact form card */}
      <section className="container mx-auto px-6 py-10 md:py-12">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-2xl border border-[#50E3C2]/30 bg-black/80 backdrop-blur p-6 md:p-8 shadow-xl">
            <p className="text-gray-300 mb-6">
              Have a question about Vitalos, partnerships, or AI solutions in mental wellness and diagnostics?
              Send us a message — we’ll get back to you.
            </p>

            <form onSubmit={handleSubmit} noValidate>
              <Field label="Name" name="name" required error={errors.name}>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className={inputCls(errors.name)}
                  placeholder="Jane Doe"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                />
              </Field>

              <Field label="Email" name="email" required error={errors.email}>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className={inputCls(errors.email)}
                  placeholder="jane@company.com"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
              </Field>

              <Field label="Message" name="message" required error={errors.message}>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className={inputCls(errors.message) + " resize-y"}
                  placeholder="Tell us a bit about your needs or project..."
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "message-error" : undefined}
                />
              </Field>

              {/* Consent */}
              <div className="mt-5 flex items-start gap-3">
                <input
                  id="consent"
                  name="consent"
                  type="checkbox"
                  className="mt-1 h-4 w-4 rounded border-white/20 bg-transparent text-[#50E3C2] focus:ring-[#50E3C2]"
                  aria-invalid={!!errors.consent}
                  aria-describedby={errors.consent ? "consent-error" : undefined}
                />
                <label htmlFor="consent" className="text-sm text-gray-300">
                  I agree to the{" "}
                  <a href="/privacy" className="underline decoration-dotted hover:text-[#50E3C2]">
                    privacy notice
                  </a>{" "}
                  and consent to being contacted about my enquiry.
                </label>
              </div>
              {errors.consent && <p id="consent-error" className="mt-1 text-sm text-red-400">{errors.consent}</p>}

              {/* Actions */}
              <div className="mt-6 flex items-center gap-3">
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="inline-flex items-center justify-center rounded-full bg-[#50E3C2] px-6 h-11 font-semibold text-black transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-[#50E3C2]/40 disabled:opacity-70"
                >
                  {status === "submitting" ? "Sending…" : "Send Message"}
                </button>

                {status === "success" && (
                  <span className="text-sm text-[#50E3C2]">Thanks! Your message has been sent.</span>
                )}
                {status === "error" && (
                  <span className="text-sm text-red-400">Something went wrong. Please try again.</span>
                )}
              </div>
            </form>
          </div>

          {/* Alt contact */}
          <div className="mt-6 text-sm text-gray-400">
            Prefer email? Reach us at{" "}
            <a href="mailto:hello@vitalos.co.uk" className="text-gray-200 hover:text-[#50E3C2] underline decoration-dotted">
              hello@vitalos.co.uk
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactPage;

/* — Helpers — */
function Field({
  label,
  name,
  children,
  required,
  error,
}: {
  label: string;
  name: string;
  children: React.ReactNode;
  required?: boolean;
  error?: string;
}) {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-200 mb-1">
        {label} {required && <span className="text-[#50E3C2]">*</span>}
      </label>
      {children}
      {error && (
        <p id={`${name}-error`} className="mt-1 text-sm text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}

function inputCls(hasError?: string) {
  return [
    "w-full rounded-lg bg-black/40 text-gray-100 placeholder:text-gray-500",
    "border",
    hasError
      ? "border-red-400 focus:ring-red-400 focus:border-red-400"
      : "border-white/15 focus:border-[#50E3C2] focus:ring-[#50E3C2]",
    "focus:outline-none focus:ring-2",
    "px-4 h-11",
  ].join(" ");
}
