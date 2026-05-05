import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "About Spekboom",
  description:
    "Discover Spekboom (Portulacaria afra) — South Africa's miracle plant and one of the most powerful carbon-sequestering species on Earth.",
};

export default function ThePlantPage() {
  return (
    <div className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-[#2E8B2E] font-semibold uppercase text-sm tracking-widest mb-2">
            Portulacaria afra
          </p>
          <h1 className="text-4xl font-bold text-[#1A5C1A] mb-4">
            Spekboom — The Miracle Plant
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            A remarkable native succulent at the heart of South Africa's most
            significant ecosystem restoration effort.
          </p>
        </div>

        {/* Key stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
          {[
            { value: "10t", label: "CO₂ sequestered per hectare per year" },
            { value: "800k ha", label: "Degraded thicket targeted for restoration" },
            { value: "60+", label: "Active restoration initiatives" },
            { value: "2025", label: "Named UN Decade on Ecosystem Restoration flagship" },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-[#EAF6EA] rounded-xl p-4 text-center border border-[#C8E8C8]"
            >
              <p className="text-2xl font-bold text-[#1A5C1A]">{s.value}</p>
              <p className="text-xs text-gray-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Main content */}
        <div className="prose max-w-none">
          <h2>What is Spekboom?</h2>
          <p>
            <em>Portulacaria afra</em> — commonly known as Spekboom (Afrikaans for
            "bacon tree" or "porkbush") — is a hardy, long-lived succulent native to
            South Africa's Eastern Cape. It forms the dominant species in the{" "}
            <strong>Subtropical Thicket biome</strong>, a unique and globally rare
            ecosystem sometimes called the "green Karoo."
          </p>
          <p>
            Spekboom is extraordinary because it can photosynthesise using two separate
            pathways depending on conditions: the standard C3 pathway during cool, moist
            periods, and the water-efficient CAM (Crassulacean Acid Metabolism) pathway
            during hot, dry conditions. This dual capability makes it both
            drought-resistant and exceptionally productive at capturing carbon.
          </p>

          <h2>Why Does It Matter for Carbon?</h2>
          <p>
            Spekboom thicket stores carbon at rates comparable to tropical rainforests —
            up to <strong>10 tonnes of CO₂ per hectare per year</strong> — yet it grows
            in semi-arid conditions where most high-carbon ecosystems cannot survive.
            Restored thicket also stores significant carbon in the soil, making the
            long-term carbon balance even more compelling.
          </p>
          <p>
            When harvested and replanted as cuttings, Spekboom regenerates rapidly.
            This means large areas can be restored relatively quickly from locally
            sourced plant material, without importing seeds or competing with food
            production.
          </p>

          <h2>The Degradation Problem</h2>
          <p>
            Two centuries of intensive livestock farming stripped vast areas of Eastern
            Cape thicket of its Spekboom cover. Without the deep root systems and
            ground cover that Spekboom provides, soil erosion accelerates, water
            retention drops, and the land becomes largely unproductive. This degradation
            has affected an estimated <strong>800,000 hectares</strong> across the
            Eastern Cape.
          </p>
          <p>
            The good news: Spekboom is remarkably resilient. Given the right
            conditions — adequate spacing, protection from grazing, and follow-up
            monitoring — planted cuttings establish themselves and spread, gradually
            rebuilding the complex thicket ecosystem.
          </p>

          <h2>A Growing Movement</h2>
          <p>
            South Africa's <strong>Thicket Restoration Movement</strong> brings together
            more than 60 initiatives with the collective goal of restoring 800,000
            hectares of degraded thicket by 2030. In 2025, the movement was named a
            flagship initiative of the{" "}
            <a
              href="https://www.unep.org/news-and-stories/story/how-miracle-plant-spekboom-helping-revive-south-africas-eastern-cape"
              target="_blank"
              rel="noopener noreferrer"
            >
              UN Decade on Ecosystem Restoration
            </a>
            .
          </p>
          <p>
            In April 2026, the World Bank priced a landmark{" "}
            <a
              href="https://www.worldbank.org/en/news/press-release/2026/04/23/world-bank-prices-14-year-spekboom-restoration-outcome-bond-in-south-africa"
              target="_blank"
              rel="noopener noreferrer"
            >
              $120 million Spekboom Restoration Outcome Bond
            </a>
            , with Amazon secured as a long-term carbon credit buyer. The bond targets
            50,000 hectares and 11,000 local jobs — a signal of growing institutional
            confidence in Spekboom as a credible climate solution.
          </p>
          <p>
            CCDV is a proud participant in this movement, contributing structured,
            data-driven projects designed to maximise both carbon outcomes and community
            benefit.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-12 flex flex-wrap gap-4">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 bg-[#1A5C1A] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#144A14] transition-colors"
          >
            See Our Projects <ArrowRight size={16} />
          </Link>
          <Link
            href="/industry-news"
            className="inline-flex items-center gap-2 border-2 border-[#1A5C1A] text-[#1A5C1A] font-semibold px-6 py-3 rounded-lg hover:bg-[#EAF6EA] transition-colors"
          >
            Industry News
          </Link>
        </div>
      </div>
    </div>
  );
}
