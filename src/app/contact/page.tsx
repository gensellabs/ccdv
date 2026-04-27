"use client";

import { useState } from "react";
import { MapPin, ExternalLink, Send } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("sent");
        setForm({ name: "", email: "", phone: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-[#2E8B2E] font-semibold uppercase text-sm tracking-widest mb-2">
            Get in Touch
          </p>
          <h1 className="text-4xl font-bold text-[#1A5C1A] mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Whether you&apos;re a landowner, investor, corporate buyer, or simply
            curious — we&apos;d love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact details */}
          <div>
            <h2 className="text-xl font-bold text-[#1A5C1A] mb-6">Our Details</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-[#EAF6EA] p-3 rounded-lg">
                  <MapPin size={20} className="text-[#2E8B2E]" />
                </div>
                <div>
                  <p className="font-semibold text-[#1A5C1A]">Address</p>
                  <address className="not-italic text-gray-600 text-sm mt-1">
                    145 General Marais Road<br />
                    Zwavelpoort, Pretoria<br />
                    Gauteng, South Africa
                  </address>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-[#EAF6EA] p-3 rounded-lg">
                  <ExternalLink size={20} className="text-[#2E8B2E]" />
                </div>
                <div>
                  <p className="font-semibold text-[#1A5C1A]">LinkedIn</p>
                  <a
                    href="https://www.linkedin.com/company/ccdv1/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#2E8B2E] text-sm hover:text-[#1A5C1A] mt-1 block"
                  >
                    linkedin.com/company/ccdv1
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-10 bg-[#EAF6EA] rounded-xl p-6 border border-[#C8E8C8]">
              <h3 className="font-semibold text-[#1A5C1A] mb-2">Who Should Contact Us?</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>🌿 <strong>Landowners</strong> with degraded Spekboom thicket interested in restoration partnerships</li>
                <li>📈 <strong>Investors</strong> exploring carbon credit and ecosystem restoration opportunities</li>
                <li>🏢 <strong>Corporates</strong> seeking high-integrity nature-based carbon credits</li>
                <li>🌱 <strong>Nursery operators</strong> and Spekboom propagation specialists</li>
                <li>🤝 <strong>Community partners</strong> interested in employment programmes</li>
              </ul>
            </div>
          </div>

          {/* Contact form */}
          <div>
            <h2 className="text-xl font-bold text-[#1A5C1A] mb-6">Send a Message</h2>

            {status === "sent" ? (
              <div className="bg-[#EAF6EA] border border-[#2E8B2E] rounded-xl p-8 text-center">
                <div className="text-4xl mb-3">✅</div>
                <h3 className="font-bold text-[#1A5C1A] text-lg mb-2">Message Received</h3>
                <p className="text-gray-600 text-sm">
                  Thank you for reaching out. We&apos;ll be in touch with you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2E8B2E] focus:border-transparent"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2E8B2E] focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone (optional)
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2E8B2E] focus:border-transparent"
                    placeholder="+27 ..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2E8B2E] focus:border-transparent resize-none"
                    placeholder="Tell us about yourself and how we can help..."
                  />
                </div>
                {status === "error" && (
                  <p className="text-red-600 text-sm">
                    Something went wrong. Please try again or reach out via LinkedIn.
                  </p>
                )}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full flex items-center justify-center gap-2 bg-[#1A5C1A] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#144A14] transition-colors disabled:opacity-60"
                >
                  <Send size={16} />
                  {status === "sending" ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
