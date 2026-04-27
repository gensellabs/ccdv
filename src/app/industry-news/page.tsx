import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Industry News",
  description:
    "Key developments in Spekboom restoration, carbon markets, and ecosystem finance relevant to CCDV and the South African carbon credit sector.",
};

type Article = {
  date: string;
  title: string;
  summary: string;
  source: string;
  url: string;
  tag: "Spekboom" | "Carbon Market" | "Policy" | "Finance";
};

const articles: Article[] = [
  {
    date: "23 April 2026",
    title: "World Bank Prices $120 Million Spekboom Restoration Outcome Bond",
    summary:
      "The World Bank priced a landmark 14-year $120 million Spekboom Restoration Outcome Bond, mobilising $25 million of private capital to support a 50,000-hectare scale-up of Spekboom restoration in South Africa's Eastern Cape. Amazon is secured as a long-term carbon credit buyer. The project, developed by Imperative, targets 11,000 local jobs across harvesting, planting, monitoring, and land management.",
    source: "World Bank",
    url: "https://www.worldbank.org/en/news/press-release/2026/04/23/world-bank-prices-14-year-spekboom-restoration-outcome-bond-in-south-africa",
    tag: "Finance",
  },
  {
    date: "24 April 2026",
    title: "R2bn Spekboom Bond: World Bank and Amazon Team Up to Restore Eastern Cape",
    summary:
      "News24 covers the landmark World Bank Spekboom bond, focusing on the implications for South Africa's Eastern Cape communities and the growing role of corporate carbon buyers like Amazon in funding ecosystem restoration at scale.",
    source: "News24",
    url: "https://www.news24.com/business/climate-future/solutions/r2bn-spekboom-bond-world-bank-and-amazon-team-up-to-restore-overgrazed-eastern-cape-20260424-0397",
    tag: "Finance",
  },
  {
    date: "February 2026",
    title: "UN Recognition is Latest Boost to Restoring Spekboom Across South Africa's Karoo",
    summary:
      "Mongabay reports on the growing international recognition of South Africa's Spekboom thicket restoration effort, driven by UN endorsement and increasing voluntary carbon market demand. More than 60 operators are now active across 800,000 hectares of degraded Eastern Cape land.",
    source: "Mongabay",
    url: "https://news.mongabay.com/2026/02/un-recognition-is-latest-boost-to-restoring-spekboom-across-south-africas-semidesert-karoo/",
    tag: "Spekboom",
  },
  {
    date: "2025",
    title: "How 'Miracle Plant' Spekboom is Helping Revive South Africa's Eastern Cape",
    summary:
      "UNEP profiles the Spekboom restoration movement, highlighting its designation as a flagship of the UN Decade on Ecosystem Restoration. The piece covers the ecological and economic case for restoring degraded Subtropical Thicket biome.",
    source: "UNEP",
    url: "https://www.unep.org/news-and-stories/story/how-miracle-plant-spekboom-helping-revive-south-africas-eastern-cape",
    tag: "Spekboom",
  },
  {
    date: "2025",
    title: "Thicket Restoration Movement: Revitalising Biodiversity, Sequestering Carbon",
    summary:
      "An in-depth review of South Africa's Thicket Restoration Movement covering biodiversity recovery, carbon sequestration methodology, and the nuanced debate around greenwashing concerns in voluntary carbon markets.",
    source: "Planet Keeper",
    url: "https://planetkeeper.info/thicket-restoration-movement-in-south-africa-revitalizing-biodiversity-sequestering-carbon-and-confronting-greenwashing-concerns-in-2025/",
    tag: "Carbon Market",
  },
  {
    date: "2024",
    title: "JSE Ventures Facilitates First Carbon Credit Trades in South Africa",
    summary:
      "The Johannesburg Stock Exchange's JSE Ventures platform facilitated South Africa's first voluntary carbon credit trades, marking a watershed moment for the domestic carbon market. The platform connects buyers and sellers of verified carbon credits in a regulated environment.",
    source: "Carbon Herald",
    url: "https://carbonherald.com/jse-ventures-facilitates-first-carbon-credit-trades-in-south-africa/",
    tag: "Carbon Market",
  },
  {
    date: "2024",
    title: "The Launch of the Voluntary Carbon Market in South Africa",
    summary:
      "ENSAfrica provides a legal and regulatory overview of the launch of South Africa's voluntary carbon market, explaining the framework under which carbon credits can now be developed, verified, and traded domestically.",
    source: "ENS Africa",
    url: "https://www.ensafrica.com/news/detail/7808/the-launch-of-the-voluntary-carbon-market-in-",
    tag: "Policy",
  },
  {
    date: "2024",
    title: "Spekboom Reforestation in South Africa — A ClimatePartner Project Visit",
    summary:
      "ClimatePartner shares a detailed field visit report from an active Spekboom reforestation project, covering methodology, community engagement, and verification processes used to generate carbon credits on international voluntary standards.",
    source: "ClimatePartner",
    url: "https://www.climatepartner.com/en/spekboom-reforestation-in-south-africa-a-climatepartner-project-visit",
    tag: "Spekboom",
  },
];

const tagColours: Record<Article["tag"], string> = {
  Spekboom: "bg-[#EAF6EA] text-[#1A5C1A] border-[#C8E8C8]",
  "Carbon Market": "bg-blue-50 text-blue-700 border-blue-200",
  Policy: "bg-amber-50 text-amber-700 border-amber-200",
  Finance: "bg-purple-50 text-purple-700 border-purple-200",
};

export default function IndustryNewsPage() {
  return (
    <div className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-[#2E8B2E] font-semibold uppercase text-sm tracking-widest mb-2">
            What's Happening
          </p>
          <h1 className="text-4xl font-bold text-[#1A5C1A] mb-4">Industry News</h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Key developments in Spekboom restoration, voluntary carbon markets, and
            ecosystem finance that shape the landscape in which CCDV operates.
          </p>
        </div>

        {/* Filter legend */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {(Object.keys(tagColours) as Article["tag"][]).map((tag) => (
            <span
              key={tag}
              className={`text-xs font-semibold px-3 py-1 rounded-full border ${tagColours[tag]}`}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="space-y-6">
          {articles.map((article) => (
            <article
              key={article.url}
              className="bg-white rounded-xl border border-[#C8E8C8] p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-center gap-3 flex-wrap">
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full border ${tagColours[article.tag]}`}
                  >
                    {article.tag}
                  </span>
                  <span className="text-xs text-gray-400">{article.date}</span>
                  <span className="text-xs text-gray-400">— {article.source}</span>
                </div>
              </div>
              <h2 className="text-lg font-bold text-[#1A5C1A] mb-2">{article.title}</h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                {article.summary}
              </p>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-[#2E8B2E] font-semibold hover:text-[#1A5C1A]"
              >
                Read full article <ExternalLink size={14} />
              </a>
            </article>
          ))}
        </div>

        <p className="text-xs text-gray-400 mt-10 text-center">
          Links lead to third-party sources. CCDV is not responsible for external content.
          We validate all links at time of publication.
        </p>
      </div>
    </div>
  );
}
