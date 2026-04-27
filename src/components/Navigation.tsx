"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/about", label: "About" },
  { href: "/the-plant", label: "The Plant" },
  { href: "/projects", label: "Projects" },
  { href: "/news", label: "News" },
  { href: "/industry-news", label: "Industry News" },
  { href: "/feedback", label: "Community" },
  { href: "/contact", label: "Contact" },
];

export default function Navigation() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm border-b border-[#EAF6EA] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3 flex-shrink-0">
            <Image
              src="/logo.png"
              alt="CCDV Logo"
              width={48}
              height={48}
              className="object-contain"
            />
            <span className="hidden sm:block text-[#1A5C1A] font-bold text-sm leading-tight">
              CARBON CREDIT<br />
              <span className="font-normal text-[#2E8B2E]">Development Ventures</span>
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-[#1A5C1A] hover:bg-[#EAF6EA] hover:text-[#144A14] rounded-md transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 rounded-md text-[#1A5C1A] hover:bg-[#EAF6EA]"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-white border-t border-[#EAF6EA] px-4 pb-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block py-2 text-[#1A5C1A] font-medium hover:text-[#144A14]"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
