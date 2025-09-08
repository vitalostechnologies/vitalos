import React, { useState } from "react";
import SectionHero from "../components/SectionHero";

type Status = "idle" | "submitting" | "success" | "error";

const ContactPage: React.FC = () => {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    setErrors({});

    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") || "").trim(),
      email: String(fd.get("email") || "").trim(),
      message: String(fd.get("message") || "").trim(),
      website: String(fd.get("website") || "").trim(), // honeypot
    };

    // minimal client-side checks
    const nextErrors: Record<string, string> = {};
    if (!payload.name) nextErrors.name = "Name is required";
    if (!payload.email) nextErrors.email = "Email is required";
    if (!payload.message) nextErrors.message = "Message is required";
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      setStatus("idle");
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      (e.currentTarget as HTMLFormElement).reset();
    } catch {
      setStatus("error");
    } finally {
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <main className="pt-20 container mx-auto px-6 py-12">
      <SectionHero
        title="Contact"
        subtitle="Have a project in mind or a question? Send us a message."
        heightClass="h-40 md:h-48"
        greenOpacity={0.25}
      />

      <div className="mx-auto max-w-xl">
        {status === "success" && (
          <div className="mb-4 rounded-lg border border-green-700/40 bg-green-900/20 px-4 py-3 text-green-200">
            Message sent. We’ll get back to you shortly.
          </div>
        )}
        {status === "error" && (
          <div className="mb-4 rounded-lg border border-red-700/40 bg-red-900/20 px-4 py-3 text-red-200">
            Something went wrong. Please try again.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="mb-2 block text-sm text-gray-300">Name</label>
            <input
              name="name"
              type="text"
              className="w-full rounded-xl border border-gray-700 bg-black/30 px-4 py-3 text-gray-100 outline-none focus:border-gray-500"
              placeholder="Your name"
              aria-invalid={!!errors.name}
            />
            {errors.name && <p className="mt-1 text-sm text-red-300">{errors.name}</p>}
          </div>

          <div>
            <label className="mb-2 block text-sm text-gray-300">Email</label>
            <input
              name="email"
              type="email"
              className="w-full rounded-xl border border-gray-700 bg-black/30 px-4 py-3 text-gray-100 outline-none focus:border-gray-500"
              placeholder="you@vitalos.co.uk"
              aria-invalid={!!errors.email}
            />
            {errors.email && <p className="mt-1 text-sm text-red-300">{errors.email}</p>}
          </div>

          <div>
            <label className="mb-2 block text-sm text-gray-300">Message</label>
            <textarea
              name="message"
              rows={5}
              className="w-full rounded-xl border border-gray-700 bg-black/30 px-4 py-3 text-gray-100 outline-none focus:border-gray-500"
              placeholder="How can we help?"
              aria-invalid={!!errors.message}
            />
            {errors.message && <p className="mt-1 text-sm text-red-300">{errors.message}</p>}
          </div>

          {/* Honeypot (hidden field to catch bots) */}
          <input
            type="text"
            name="website"
            autoComplete="off"
            tabIndex={-1}
            className="hidden"
          />

          <button
            type="submit"
            disabled={status === "submitting"}
            className="rounded-2xl bg-white/10 px-5 py-3 text-sm font-medium text-white backdrop-blur transition hover:bg-white/20 disabled:opacity-50"
          >
            {status === "submitting" ? "Sending…" : "Send Message"}
          </button>
        </form>
      </div>
    </main>
  );
};

export default ContactPage;
