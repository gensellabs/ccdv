import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { ArrowRight, Leaf, TrendingUp, Users, MapPin } from "lucide-react";

type PostRow = {
  id: string;
  title: string;
  summary: string;
  slug: string;
  publishedAt: Date | null;
};

export default async function HomePage() {
  const recentPosts = await prisma.newsPost
    .findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
      take: 3,
      select: { id: true, title: true, summary: true, slug: true, publishedAt: true },
    })
    .catch(() => []);

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#1A5C1A] via-[#2E8B2E] to-[#3A9E3A] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-6">
                Building Natural Assets.<br />
                <span className="text-[#A8D8A8]">Connecting Value.</span><br />
                Creating Impact.
              </h1>
              <p className="text-lg text-[#C8E8C8] max-w-xl mb-8 leading-relaxed">
                CCDV develops large-scale Spekboom restoration projects in South
                Africa's Eastern Cape, generating high-integrity nature-based
                carbon credits while rehabilitating degraded landscapes and
                empowering communities.
              </p>
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 bg-white text-[#1A5C1A] font-semibold px-6 py-3 rounded-lg hover:bg-[#EAF6EA] transition-colors"
                >
                  Our Projects <ArrowRight size={18} />
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 border-2 border-white text-white font-semibold px-6 py-3 rounded-lg hover:bg-white/10 transition-colors"
                >
                  About CCDV
                </Link>
              </div>
            </div>
            <div className="flex-shrink-0">
              <Image
                src="/logo.png"
                alt="CCDV"
                width={200}
                height={200}
                className="opacity-90"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission pillars */}
      <section className="bg-[#EAF6EA] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Leaf size={32} className="text-[#2E8B2E]" />,
                title: "Ecosystem Restoration",
                body: "Restoring degraded Spekboom thicket across South Africa's Eastern Cape through scientifically measured, large-scale planting programmes.",
              },
              {
                icon: <TrendingUp size={32} className="text-[#2E8B2E]" />,
                title: "Carbon Credit Development",
                body: "Generating high-integrity, verified carbon removal units for voluntary markets — offering landowners and investors long-term financial returns.",
              },
              {
                icon: <Users size={32} className="text-[#2E8B2E]" />,
                title: "Community Empowerment",
                body: "Creating sustainable employment through harvesting, planting, monitoring, and land management operations at a community level.",
              },
            ].map((pillar) => (
              <div
                key={pillar.title}
                className="bg-white rounded-xl p-6 shadow-sm border border-[#C8E8C8]"
              >
                <div className="mb-4">{pillar.icon}</div>
                <h3 className="text-lg font-semibold text-[#1A5C1A] mb-2">
                  {pillar.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">{pillar.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Spekboom teaser */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="flex-1">
              <p className="text-[#2E8B2E] font-semibold uppercase text-sm tracking-widest mb-2">
                The Miracle Plant
              </p>
              <h2 className="text-3xl font-bold text-[#1A5C1A] mb-4">
                Spekboom — Nature's Carbon Sponge
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                <em>Portulacaria afra</em>, known locally as Spekboom, is a remarkable
                native succulent capable of sequestering up to 10 tonnes of carbon per
                hectare per year — rivalling tropical rainforests. South Africa's
                thicket restoration movement, of which CCDV is a proud part, targets
                800,000 hectares of degraded Eastern Cape land.
              </p>
              <Link
                href="/the-plant"
                className="inline-flex items-center gap-2 text-[#2E8B2E] font-semibold hover:text-[#1A5C1A]"
              >
                Learn more about Spekboom <ArrowRight size={16} />
              </Link>
            </div>
            <div className="flex-1 bg-[#EAF6EA] rounded-2xl p-8 text-center">
              <div className="grid grid-cols-2 gap-6">
                {[
                  { value: "800,000", label: "Hectares targeted by 2030" },
                  { value: "60+", label: "Restoration initiatives" },
                  { value: "10t", label: "CO₂ per hectare per year" },
                  { value: "11,000+", label: "Jobs through restoration" },
                ].map((stat) => (
                  <div key={stat.label} className="bg-white rounded-xl p-4 shadow-sm">
                    <p className="text-2xl font-bold text-[#1A5C1A]">{stat.value}</p>
                    <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest news */}
      {recentPosts.length > 0 && (
        <section className="bg-[#EAF6EA] py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-[#1A5C1A]">Latest News</h2>
              <Link
                href="/news"
                className="text-[#2E8B2E] font-semibold hover:text-[#1A5C1A] flex items-center gap-1"
              >
                All news <ArrowRight size={16} />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recentPosts.map((post: PostRow) => (
                <Link
                  key={post.id}
                  href={`/news/${post.slug}`}
                  className="bg-white rounded-xl p-6 shadow-sm border border-[#C8E8C8] hover:border-[#2E8B2E] hover:shadow-md transition-all group"
                >
                  <p className="text-xs text-gray-400 mb-2">
                    {post.publishedAt
                      ? new Date(post.publishedAt).toLocaleDateString("en-ZA", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : ""}
                  </p>
                  <h3 className="font-semibold text-[#1A5C1A] group-hover:text-[#144A14] mb-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-3">{post.summary}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Location CTA */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <MapPin size={32} className="text-[#2E8B2E] mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-[#1A5C1A] mb-4">
            Based in Pretoria, Operating Nationally
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto mb-8">
            Our headquarters are in Zwavelpoort, Pretoria with active projects in the
            Eastern Cape and plans for nationwide expansion. Reach out to explore
            partnership opportunities.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#1A5C1A] text-white font-semibold px-8 py-3 rounded-lg hover:bg-[#144A14] transition-colors"
          >
            Get in Touch <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}
