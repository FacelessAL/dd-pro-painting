import Link from "next/link";
import { Phone, Mail, MapPin, Facebook, Star } from "lucide-react";
import { business, services, locations } from "@/data/business";

export default function Footer() {
  const topLocations = locations.slice(0, 8);
  const topServices = services.slice(0, 6);

  return (
    <footer className="bg-primary-dark text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h4 className="text-lg font-bold mb-4">{business.name}</h4>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              Family owned and operated with 15 years of experience.
              Professional, affordable painting services across the western
              Chicago suburbs.
            </p>
            <div className="space-y-2">
              <a
                href={`tel:${business.phoneFull}`}
                className="flex items-center gap-2 text-gray-300 hover:text-accent-light transition-colors text-sm"
              >
                <Phone className="w-4 h-4 text-accent" />
                {business.phone}
              </a>
              <a
                href={`mailto:${business.email}`}
                className="flex items-center gap-2 text-gray-300 hover:text-accent-light transition-colors text-sm"
              >
                <Mail className="w-4 h-4 text-accent" />
                {business.email}
              </a>
              <div className="flex items-center gap-2 text-gray-300 text-sm">
                <MapPin className="w-4 h-4 text-accent" />
                {business.address}
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-bold mb-4">Our Services</h4>
            <ul className="space-y-2">
              {topServices.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/woodridge/${service.slug}`}
                    className="text-gray-300 hover:text-accent-light transition-colors text-sm"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h4 className="text-lg font-bold mb-4">Service Areas</h4>
            <ul className="space-y-2">
              {topLocations.map((loc) => (
                <li key={loc.slug}>
                  <Link
                    href={`/${loc.slug}`}
                    className="text-gray-300 hover:text-accent-light transition-colors text-sm"
                  >
                    {loc.name}, IL
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/locations"
                  className="text-accent-light hover:text-accent transition-colors text-sm font-medium"
                >
                  View All Locations →
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links & Social */}
          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 mb-6">
              <li>
                <Link
                  href="/about"
                  className="text-gray-300 hover:text-accent-light transition-colors text-sm"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/reviews"
                  className="text-gray-300 hover:text-accent-light transition-colors text-sm"
                >
                  Reviews
                </Link>
              </li>
              <li>
                <Link
                  href="/resources"
                  className="text-gray-300 hover:text-accent-light transition-colors text-sm"
                >
                  Resources & Tips
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-300 hover:text-accent-light transition-colors text-sm"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
            <div className="flex items-center gap-3">
              <a
                href="https://www.facebook.com/ddpropaintingg"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://www.google.com/search?hl=en&gl=us&q=D%26D+Pro+Painting+Reviews#lrd="
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors"
                aria-label="Google Reviews"
              >
                <Star className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-gray-400">
          <p>
            © {new Date().getFullYear()} {business.name}. All rights reserved.
          </p>
          <p>
            Proudly created by{" "}
            <a
              href="https://faceless.media"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-light hover:text-accent transition-colors font-medium"
            >
              faceless.media
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
