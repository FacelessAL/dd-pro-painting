"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { business } from "@/data/business";

const navLinks = [
  { href: "/", label: "Home" },
  {
    href: "/services",
    label: "Services",
    children: [
      { href: "/woodridge/interior-painting", label: "Interior Painting" },
      { href: "/woodridge/exterior-painting", label: "Exterior Painting" },
      { href: "/woodridge/cabinet-painting", label: "Cabinet Painting" },
      { href: "/woodridge/kitchen-painting", label: "Kitchen Painting" },
      { href: "/woodridge/ceiling-painting", label: "Ceiling Painting" },
      { href: "/woodridge/popcorn-ceiling-removal", label: "Popcorn Ceiling Removal" },
      { href: "/woodridge/pressure-washing", label: "Pressure Washing" },
      { href: "/woodridge/deck-staining", label: "Deck Staining" },
      { href: "/woodridge/fence-staining", label: "Fence Staining" },
      { href: "/woodridge/drywall-repair", label: "Drywall Repairs" },
      { href: "/woodridge/epoxy-flooring", label: "Epoxy Flooring" },
      { href: "/woodridge/commercial-painting", label: "Commercial Painting" },
    ],
  },
  {
    href: "/locations",
    label: "Locations",
    children: [
      { href: "/woodridge", label: "Woodridge" },
      { href: "/naperville", label: "Naperville" },
      { href: "/downers-grove", label: "Downers Grove" },
      { href: "/hinsdale", label: "Hinsdale" },
      { href: "/oak-brook", label: "Oak Brook" },
      { href: "/bolingbrook", label: "Bolingbrook" },
      { href: "/lemont", label: "Lemont" },
      { href: "/burr-ridge", label: "Burr Ridge" },
      { href: "/glen-ellyn", label: "Glen Ellyn" },
      { href: "/homer-glen", label: "Homer Glen" },
      { href: "/lockport", label: "Lockport" },
      { href: "/mokena", label: "Mokena" },
    ],
  },
  { href: "/about", label: "About Us" },
  { href: "/reviews", label: "Reviews" },
  { href: "/resources", label: "Resources" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopDropdown, setDesktopDropdown] = useState<string | null>(null);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);

  const toggleMobileDropdown = (label: string) => {
    setMobileDropdown((prev) => (prev === label ? null : label));
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      {/* Top Bar */}
      <div className="bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between py-2 text-sm">
          <span className="hidden sm:block">
            Proudly Serving the Western Chicago Suburbs
          </span>
          <a
            href={`tel:${business.phoneFull}`}
            className="flex items-center gap-1.5 font-semibold hover:text-accent-light transition-colors"
          >
            <Phone className="w-4 h-4" />
            {business.phone}
          </a>
        </div>
      </div>

      {/* Main Nav */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo.jpeg"
              alt="D&D Pro Painting Logo"
              width={180}
              height={100}
              className="h-12 lg:h-14 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) =>
              link.children ? (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => setDesktopDropdown(link.label)}
                  onMouseLeave={() => setDesktopDropdown(null)}
                >
                  <Link
                    href={link.href}
                    className="flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary hover:bg-gray-50 transition-colors"
                  >
                    {link.label}
                    <ChevronDown className={`w-4 h-4 transition-transform ${desktopDropdown === link.label ? "rotate-180" : ""}`} />
                  </Link>
                  {desktopDropdown === link.label && (
                    <div className="absolute top-full left-0 w-56 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50">
                      <Link
                        href={link.href}
                        className="block px-4 py-2 text-sm text-primary font-semibold hover:bg-gray-50 border-b border-gray-100"
                      >
                        All {link.label}
                      </Link>
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary hover:bg-gray-50 transition-colors"
                >
                  {link.label}
                </Link>
              )
            )}
            <Link
              href="/contact"
              className="ml-3 px-5 py-2.5 bg-accent text-white text-sm font-semibold rounded-lg hover:bg-accent-dark transition-colors shadow-md"
            >
              Free Estimate
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => {
              setMobileOpen(!mobileOpen);
              setMobileDropdown(null);
            }}
            className="lg:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.href}>
                  <button
                    onClick={() => toggleMobileDropdown(link.label)}
                    className="flex items-center justify-between w-full px-3 py-2.5 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors"
                  >
                    {link.label}
                    <ChevronDown
                      className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                        mobileDropdown === link.label ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {mobileDropdown === link.label && (
                    <div className="pl-3 pb-1 space-y-0.5">
                      <Link
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className="block px-3 py-2 text-sm font-semibold text-primary hover:bg-gray-50 rounded-md"
                      >
                        All {link.label}
                      </Link>
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setMobileOpen(false)}
                          className="block px-3 py-2 text-sm text-gray-500 hover:text-primary hover:bg-gray-50 rounded-md"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2.5 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-primary"
                >
                  {link.label}
                </Link>
              )
            )}
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="block text-center mt-3 px-5 py-3 bg-accent text-white font-semibold rounded-lg hover:bg-accent-dark transition-colors"
            >
              Free Estimate
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
