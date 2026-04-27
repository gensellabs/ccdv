import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, ArrowRight, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "CCDV's Spekboom restoration and carbon credit development projects across South Africa's Eastern Cape.",
};

export default function ProjectsPage() {
  return (
    <div className="py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-[#2E8B2E] font-semibold uppercase text-sm tracking-widest mb-2">
            On the Ground
          </p>
          <h1 className="text-4xl font-bold text-[#1A5C1A] mb-4">Our Projects</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            CCDV is actively developing its first Spekboom restoration and carbon credit
            projects in South Africa's Eastern Cape. Full project listings will be
            published as they progress through the development pipeline.
          </p>
        </div>

        {/* Eastern Cape focus */}
        <div className="bg-[#EAF6EA] rounded-2xl p-8 mb-10 border border-[#C8E8C8]">
          <div className="flex items-start gap-4">
            <MapPin size={28} className="text-[#2E8B2E] flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-xl font-bold text-[#1A5C1A] mb-2">
                Eastern Cape — Initial Focus Area
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Our initial projects are located in South Africa's Eastern Cape province,
                home to the largest concentration of degraded Spekboom thicket. This
                region forms the heart of the national Thicket Restoration Movement and
                offers the highest density of willing landowner partners and established
                nursery capacity.
              </p>
            </div>
          </div>
        </div>

        {/* Project pipeline */}
        <h2 className="text-2xl font-bold text-[#1A5C1A] mb-6">Project Pipeline</h2>
        <div className="space-y-6 mb-14">
          {[
            {
              stage: "Active Development",
              colour: "bg-[#2E8B2E]",
              title: "Eastern Cape Thicket Restoration — Phase 1",
              description:
                "Initial land partnership assessments and Spekboom propagation planning underway. Engaging landowners across degraded thicket zones for long-term restoration agreements.",
              location: "Eastern Cape, South Africa",
              status: "In progress",
            },
            {
              stage: "Pipeline",
              colour: "bg-[#4DB84D]",
              title: "Nationwide Expansion Programme",
              description:
                "Following successful Eastern Cape establishment, CCDV plans to extend its land partnership model to additional degraded thicket regions across South Africa.",
              location: "Nationwide",
              status: "Planned",
            },
          ].map((project) => (
            <div
              key={project.title}
              className="bg-white rounded-xl border border-[#C8E8C8] overflow-hidden shadow-sm"
            >
              <div className={`${project.colour} px-6 py-2`}>
                <span className="text-white text-xs font-semibold uppercase tracking-wider">
                  {project.stage}
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-[#1A5C1A] mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <MapPin size={14} />
                    {project.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={14} />
                    {project.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Get involved */}
        <div className="bg-[#1A5C1A] text-white rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-3">Are You a Landowner?</h2>
          <p className="text-[#C8E8C8] leading-relaxed mb-6">
            CCDV is actively seeking landowners with degraded Spekboom thicket who
            are interested in long-term restoration partnerships. Our model is designed
            to deliver measurable environmental and financial outcomes for both parties.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-white text-[#1A5C1A] font-semibold px-6 py-3 rounded-lg hover:bg-[#EAF6EA] transition-colors"
          >
            Get in Touch <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
