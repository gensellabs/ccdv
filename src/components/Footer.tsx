import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#1A5C1A] text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/logo.png"
                alt="CCDV Logo"
                width={48}
                height={48}
                className="object-contain bg-white rounded-full p-1"
              />
              <div>
                <p className="font-bold text-white text-sm">CARBON CREDIT</p>
                <p className="text-[#A8D8A8] text-sm">Development Ventures</p>
              </div>
            </div>
            <p className="text-[#C8E8C8] text-sm leading-relaxed">
              Building Natural Assets.<br />
              Connecting Value.<br />
              Creating Impact.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {[
                { href: "/about", label: "About CCDV" },
                { href: "/the-plant", label: "About Spekboom" },
                { href: "/projects", label: "Our Projects" },
                { href: "/news", label: "News & Updates" },
                { href: "/industry-news", label: "Industry News" },
                { href: "/feedback", label: "Community Feedback" },
                { href: "/contact", label: "Contact Us" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[#C8E8C8] hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-white mb-4">Contact</h3>
            <address className="not-italic text-sm text-[#C8E8C8] space-y-2">
              <p>145 General Marais Road</p>
              <p>Zwavelpoort, Pretoria</p>
              <p>Gauteng, South Africa</p>
              <p className="pt-2">
                <a
                  href="https://www.linkedin.com/company/ccdv1/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  LinkedIn: CCDV
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="border-t border-[#2E8B2E] mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-[#A8D8A8]">
          <p>© {new Date().getFullYear()} Carbon Credit Development Ventures (Pty) Ltd. All rights reserved.</p>
          <p>Pretoria, South Africa</p>
        </div>
      </div>
    </footer>
  );
}
