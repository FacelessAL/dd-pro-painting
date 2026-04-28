import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Phone,
  Paintbrush,
  Home as HomeIcon,
  Droplets,
  Fence,
  Wrench,
  Layers,
  Sparkles,
  Building2,
  CheckCircle,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import AiAssistant from "@/components/AiAssistant";
import SeasonalPromos from "@/components/SeasonalPromos";
import { business, services } from "@/data/business";

export const metadata: Metadata = {
  title: "Our Services - Professional Painting & Home Services | D&D Pro Painting",
  description:
    "Explore all services offered by D&D Pro Painting - interior painting, exterior painting, deck staining, pressure washing, drywall repair, epoxy flooring, and more. Serving the western Chicago suburbs.",
};

const iconMap: Record<string, React.ReactNode> = {
  Paintbrush: <Paintbrush className="w-7 h-7" />,
  Home: <HomeIcon className="w-7 h-7" />,
  Droplets: <Droplets className="w-7 h-7" />,
  Fence: <Fence className="w-7 h-7" />,
  Wrench: <Wrench className="w-7 h-7" />,
  Layers: <Layers className="w-7 h-7" />,
  Sparkles: <Sparkles className="w-7 h-7" />,
  Building2: <Building2 className="w-7 h-7" />,
};

export default function ServicesPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Services" }]} />

      {/* Hero */}
      <section className="relative py-16 lg:py-20 bg-primary text-white overflow-hidden">
        <Image
          src="/hero-van.png"
          alt="D&D Pro Painting branded van"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-primary/70" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-accent-light font-bold text-sm tracking-widest uppercase mb-3 px-4 py-1.5 bg-accent/10 rounded-full drop-shadow-md">
            What We Do
          </span>
          <h1 className="font-heading text-4xl lg:text-5xl font-extrabold mt-2 mb-5 drop-shadow-lg">
            Our Professional Services
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed mb-8 drop-shadow-md">
            D&D Pro Painting offers a full range of painting, staining, and home
            improvement services throughout the western Chicago suburbs. Every
            project is backed by 15 years of experience and a commitment to
            exceptional quality.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-accent text-white font-semibold rounded-lg hover:bg-accent-dark transition-colors shadow-lg"
            >
              Get a Free Estimate
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href={`tel:${business.phoneFull}`}
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-colors border border-white/20"
            >
              <Phone className="w-5 h-5" />
              {business.phone}
            </a>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-10">
            {services.map((service, index) => (
              <div
                key={service.slug}
                className={`flex flex-col md:flex-row gap-6 md:gap-8 items-start p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
              >
                <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center text-primary flex-shrink-0">
                  {iconMap[service.icon]}
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">
                    {service.name}
                  </h2>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {service.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-3">
                    <Link
                      href={`/woodridge/${service.slug}`}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:text-accent-dark transition-colors"
                    >
                      Learn More <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-light transition-colors"
                    >
                      Get an Estimate <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 lg:py-20 bg-gray-50 border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Why Choose D&D Pro Painting?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {[
              "Fully insured and licensed",
              "15+ years of local experience",
              "Free, detailed estimates",
              "Premium materials only",
              "Warranty on every project",
              "Family owned & operated",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-2 text-gray-700 bg-white rounded-xl px-4 py-3 border border-gray-100"
              >
                <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                <span className="text-sm font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <AiAssistant />
      <SeasonalPromos />

      {/* CTA */}
      <section className="py-16 lg:py-20 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Contact D&D Pro Painting today for a free, no-obligation estimate on
            any of our services. {business.googleRating}-star rated on Google.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-white font-semibold rounded-lg hover:bg-accent-dark transition-colors shadow-lg text-lg"
            >
              Get Your Free Estimate
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href={`tel:${business.phoneFull}`}
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-colors border border-white/20 text-lg"
            >
              <Phone className="w-5 h-5" />
              {business.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
