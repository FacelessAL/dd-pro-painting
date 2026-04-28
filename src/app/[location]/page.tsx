import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, ArrowRight, Phone, Star, CheckCircle } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import AiAssistant from "@/components/AiAssistant";
import SeasonalPromos from "@/components/SeasonalPromos";
import { business, locations, services } from "@/data/business";

interface Props {
  params: Promise<{ location: string }>;
}

export async function generateStaticParams() {
  return locations.map((loc) => ({ location: loc.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { location: slug } = await params;
  const location = locations.find((l) => l.slug === slug);
  if (!location) return { title: "Location Not Found" };
  return {
    title: `Painting Services in ${location.name}, IL - House Painter Near You`,
    description: `Professional painting services in ${location.name}, IL. D&D Pro Painting offers interior & exterior painting, deck staining, and more in ${location.name} and ${location.county}. Call (331) 241-6600 for a free estimate.`,
  };
}

export default async function LocationPage({ params }: Props) {
  const { location: slug } = await params;
  const location = locations.find((l) => l.slug === slug);
  if (!location) notFound();

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Painting Services",
    provider: {
      "@type": "LocalBusiness",
      name: "D&D Pro Painting",
      telephone: "+1-331-241-6600",
      email: "paint@ddpropainting.net",
      url: "https://ddpropainting.net",
      address: {
        "@type": "PostalAddress",
        streetAddress: "7723 Woodward Ave",
        addressLocality: "Woodridge",
        addressRegion: "IL",
        postalCode: "60517",
        addressCountry: "US",
      },
    },
    areaServed: {
      "@type": "City",
      name: location.name,
      containedInPlace: {
        "@type": "State",
        name: "Illinois",
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Breadcrumbs
        items={[
          { label: "Locations", href: "/locations" },
          { label: `${location.name}, IL` },
        ]}
      />

      {/* Hero */}
      <section className="py-16 lg:py-20 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="w-5 h-5 text-accent-light" />
              <span className="text-accent-light font-semibold text-sm tracking-widest uppercase">
                {location.county}, Illinois
              </span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-extrabold mt-2 mb-6">
              Professional Painting Services in{" "}
              <span className="text-accent-light">{location.name}, IL</span>
            </h1>
            <p className="text-xl text-white/85 leading-relaxed mb-6">
              {location.description}
            </p>
            <div className="flex items-center gap-3 mb-6">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-accent fill-accent" />
                ))}
              </div>
              <span className="text-white/80 text-sm">
                {business.googleRating} Stars · {business.googleReviewCount} Reviews
              </span>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-accent text-white font-semibold rounded-lg hover:bg-accent-dark transition-colors shadow-lg"
              >
                Get a Free Estimate in {location.name}
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href={`tel:${business.phoneFull}`}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-colors border border-white/20"
              >
                <Phone className="w-5 h-5" />
                {business.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services in this location */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-accent font-semibold text-sm tracking-widest uppercase">
              Our Services
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mt-2 mb-4">
              Painting Services Available in {location.name}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              D&D Pro Painting offers a full range of professional painting and
              home improvement services to homeowners and businesses in{" "}
              {location.name}, IL.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/${location.slug}/${service.slug}`}
                className="group bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-xl hover:border-accent/30 transition-all duration-300"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                  {service.name}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">
                  {service.shortDescription}
                </p>
                <span className="inline-flex items-center gap-1 text-sm text-accent font-semibold group-hover:gap-2 transition-all">
                  Learn More <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose us for this location */}
      <section className="py-16 lg:py-24 bg-gray-50 section-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-accent font-semibold text-sm tracking-widest uppercase">
                Local Experts
              </span>
              <h2 className="text-3xl font-bold text-gray-900 mt-2 mb-6">
                Why {location.name} Homeowners Choose D&D Pro Painting
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>{location.localExpertise}</p>
                <p>
                  With over 15 years of experience, a {business.googleRating}-star
                  Google rating from {business.googleReviewCount} reviews, and
                  hundreds of satisfied customers, D&D Pro Painting is the trusted
                  choice for residential and commercial painting in{" "}
                  {location.name}.
                </p>
              </div>
              <ul className="mt-6 space-y-3">
                {[
                  "Fully insured and licensed",
                  "15+ years of experience",
                  "Free, no-obligation estimates",
                  "Premium materials and techniques",
                  "Warranty on every project",
                  "Family owned and operated",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-gray-700">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                    <span className="text-sm font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {location.name} Area Details
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500">County</span>
                  <span className="font-medium text-gray-900">{location.county}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500">State</span>
                  <span className="font-medium text-gray-900">Illinois</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500">Population</span>
                  <span className="font-medium text-gray-900">{location.population}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500">ZIP Codes</span>
                  <span className="font-medium text-gray-900">
                    {location.zipCodes.join(", ")}
                  </span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-500">Services Available</span>
                  <span className="font-medium text-gray-900">{services.length}+</span>
                </div>
              </div>
              <Link
                href="/contact"
                className="block text-center mt-6 px-6 py-3 bg-accent text-white font-semibold rounded-lg hover:bg-accent-dark transition-colors shadow-md"
              >
                Get a Free Estimate
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Other locations */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900">
              We Also Serve Nearby Communities
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {locations
              .filter((l) => l.slug !== slug)
              .map((loc) => (
                <Link
                  key={loc.slug}
                  href={`/${loc.slug}`}
                  className="flex items-center gap-2 px-4 py-3 bg-gray-50 rounded-lg hover:bg-primary hover:text-white transition-colors group border border-gray-100 text-sm"
                >
                  <MapPin className="w-4 h-4 text-accent group-hover:text-accent-light flex-shrink-0" />
                  <span className="font-medium">{loc.name}, IL</span>
                </Link>
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
            Ready to Paint Your {location.name} Home?
          </h2>
          <p className="text-white/80 text-lg mb-8">
            Contact D&D Pro Painting today for a free estimate on your{" "}
            {location.name} painting project. We look forward to transforming
            your home.
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
