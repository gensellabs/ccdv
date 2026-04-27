import type { Metadata } from "next";
import { MapPin, Target, Eye, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about CCDV — Carbon Credit Development Ventures, our mission, and our approach to Spekboom restoration and carbon credit development in South Africa.",
};

export default function AboutPage() {
  return (
    <div className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-[#2E8B2E] font-semibold uppercase text-sm tracking-widest mb-2">
            Who We Are
          </p>
          <h1 className="text-4xl font-bold text-[#1A5C1A] mb-4">About CCDV</h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Carbon Credit Development Ventures (CCDV) is a South African environmental
            services company dedicated to restoring degraded land and connecting the
            value of healthy ecosystems to the global carbon market.
          </p>
        </div>

        {/* Mission / Vision / Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {[
            {
              icon: <Target size={28} className="text-[#2E8B2E]" />,
              title: "Mission",
              body: "To develop large-scale nature-based carbon projects that restore South Africa's unique Spekboom thicket, generate measurable environmental outcomes, and create lasting economic value for landowners and communities.",
            },
            {
              icon: <Eye size={28} className="text-[#2E8B2E]" />,
              title: "Vision",
              body: "A South Africa where degraded landscapes are restored at scale, where landowners are rewarded for environmental stewardship, and where high-integrity carbon credits connect local ecosystems to global climate action.",
            },
            {
              icon: <Users size={28} className="text-[#2E8B2E]" />,
              title: "Values",
              body: "Scientific rigour, transparency, community impact, and long-term thinking. We combine data-driven monitoring with genuine on-the-ground partnerships to deliver outcomes that stand up to scrutiny.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-[#EAF6EA] rounded-xl p-6 border border-[#C8E8C8]"
            >
              <div className="mb-3">{item.icon}</div>
              <h3 className="font-semibold text-[#1A5C1A] text-lg mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>

        {/* Story */}
        <div className="prose max-w-none mb-14">
          <h2>Our Story</h2>
          <p>
            CCDV was founded in 2026 with a clear conviction: South Africa's Spekboom
            thicket represents one of the most compelling nature-based carbon
            opportunities in the world, and it remains largely untapped. Two centuries
            of overgrazing have degraded an estimated 800,000 hectares of Eastern Cape
            thicket — land that, when restored, sequesters carbon at rates comparable
            to tropical rainforests.
          </p>
          <p>
            We set out to bridge the gap between willing landowners, structured
            restoration science, and the voluntary carbon market. By combining scalable
            land partnerships with rigorous data-driven monitoring and verification, we
            develop carbon credit projects that deliver both measurable environmental
            outcomes and reliable financial returns.
          </p>
          <p>
            CCDV is part of South Africa's broader{" "}
            <strong>Thicket Restoration Movement</strong> — a coalition of more than 60
            initiatives aligned under what the United Nations has recognised as a
            flagship of the{" "}
            <a
              href="https://www.decadeonrestoration.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              UN Decade on Ecosystem Restoration
            </a>
            . We are actively engaging with landowners, nursery operators, and carbon
            market participants to establish initial projects in the Eastern Cape, with
            plans for nationwide expansion.
          </p>

          <h2>What We Do</h2>
          <p>Our integrated approach covers the full project lifecycle:</p>
          <ul>
            <li>
              <strong>Land Partnerships</strong> — We work with property owners across
              degraded thicket regions to structure long-term land agreements that
              benefit all parties.
            </li>
            <li>
              <strong>Spekboom Propagation &amp; Planting</strong> — Measured,
              large-scale planting operations using nursery-grown cuttings and
              established protocols for maximum carbon impact.
            </li>
            <li>
              <strong>Monitoring &amp; Verification</strong> — Data-driven systems track
              plant survival, growth, and carbon sequestration over time, meeting
              international verification standards.
            </li>
            <li>
              <strong>Carbon Credit Development</strong> — We develop and register
              carbon credits on recognised voluntary market standards for sale to
              corporate buyers seeking high-integrity offsets.
            </li>
            <li>
              <strong>Community Employment</strong> — Our projects create jobs at every
              stage — from harvesting and propagation to planting and long-term land
              management.
            </li>
          </ul>
        </div>

        {/* Location */}
        <div className="bg-[#1A5C1A] text-white rounded-2xl p-8 flex flex-col sm:flex-row items-start gap-6">
          <MapPin size={32} className="flex-shrink-0 text-[#A8D8A8] mt-1" />
          <div>
            <h3 className="text-xl font-bold mb-2">Headquarters</h3>
            <p className="text-[#C8E8C8] leading-relaxed">
              145 General Marais Road, Zwavelpoort<br />
              Pretoria, Gauteng<br />
              South Africa
            </p>
            <p className="text-[#C8E8C8] mt-3 text-sm">
              Active projects in the Eastern Cape · Nationwide expansion planned
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
