import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { MapPin, ArrowRight, Phone } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import AiAssistant from "@/components/AiAssistant";
import SeasonalPromos from "@/components/SeasonalPromos";
import { business, locations } from "@/data/business";

export const metadata: Metadata = {
  title: "Service Areas - Painting Services in DuPage & Will County, IL",
  description:
    "D&D Pro Painting serves 16+ communities across DuPage and Will Counties including Woodridge, Naperville, Downers Grove, Hinsdale, Wheaton, Bolingbrook and more. Find painting services near you.",
};

export default function LocationsPage() {
  const dupage = locations.filter(
    (l) => l.county.includes("DuPage") && !l.county.includes("Will")
  );
  const will = locations.filter((l) => l.county.includes("Will"));
  const multi = locations.filter(
    (l) => l.county.includes("Cook") || (l.county.includes("DuPage") && l.county.includes("Will"))
  );

  return (
    <>
      <Breadcrumbs items={[{ label: "Locations" }]} />

      {/* Hero */}
      <section className="relative py-16 lg:py-20 bg-primary text-white overflow-hidden">
        <Image
          src="/hero-truck.png"
          alt="D&D Pro Painting branded truck"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-primary/70" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-accent-light font-semibold text-sm tracking-widest uppercase drop-shadow-md">
              Service Areas
            </span>
            <h1 className="text-4xl lg:text-5xl font-extrabold mt-2 mb-6 drop-shadow-lg">
              Professional Painting Services{" "}
              <span className="text-accent-light">Near You</span>
            </h1>
            <p className="text-xl text-white/90 leading-relaxed drop-shadow-md">
              Based in Woodridge, IL, D&D Pro Painting proudly serves homeowners
              and businesses across 16+ communities in DuPage and Will Counties.
              Click on your city to learn more about our local painting services.
            </p>
          </div>
        </div>
      </section>

      {/* All Locations Grid */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              All Service Areas
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Select your city below to see the painting services available in
              your area, along with detailed information about our work in your
              community.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {locations.map((location) => (
              <Link
                key={location.slug}
                href={`/${location.slug}`}
                className="group bg-white rounded-xl p-5 shadow-md border border-gray-100 hover:shadow-xl hover:border-accent/30 transition-all duration-300"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary group-hover:bg-accent group-hover:text-white transition-colors flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 group-hover:text-primary transition-colors">
                      {location.name}, IL
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {location.county}
                    </p>
                    <p className="text-sm text-gray-600 mt-2 line-clamp-2 leading-relaxed">
                      {location.description.slice(0, 100)}...
                    </p>
                    <span className="inline-flex items-center gap-1 text-sm text-accent font-medium mt-2 group-hover:gap-2 transition-all">
                      View Services <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* County Breakdown */}
      <section className="py-16 lg:py-24 bg-gray-50 section-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-accent font-semibold text-sm tracking-widest uppercase">
              Coverage Area
            </span>
            <h2 className="text-3xl font-bold text-gray-900 mt-2 mb-4">
              Serving DuPage & Will Counties
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our central location in Woodridge allows us to efficiently serve
              communities across both DuPage and Will Counties.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
              <h3 className="text-xl font-bold text-primary mb-4">
                DuPage County
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {dupage.map((loc) => (
                  <Link
                    key={loc.slug}
                    href={`/${loc.slug}`}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-primary/5 hover:text-primary transition-colors"
                  >
                    <MapPin className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                    {loc.name}
                  </Link>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
              <h3 className="text-xl font-bold text-primary mb-4">
                Will County & Surrounding
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {[...will, ...multi].map((loc) => (
                  <Link
                    key={loc.slug}
                    href={`/${loc.slug}`}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-primary/5 hover:text-primary transition-colors"
                  >
                    <MapPin className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                    {loc.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <AiAssistant />
      <SeasonalPromos />

      {/* CTA */}
      <section className="py-16 lg:py-20 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Need Painting Services in Your Area?
          </h2>
          <p className="text-white/80 text-lg mb-8">
            Even if your community is not listed above, we may still serve your
            area. Contact us to find out.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-white font-semibold rounded-lg hover:bg-accent-dark transition-colors shadow-lg text-lg"
            >
              Get a Free Estimate
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
