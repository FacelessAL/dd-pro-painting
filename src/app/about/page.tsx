import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Heart, Shield, Award, Target, Users, Clock, ArrowRight, Phone } from "lucide-react";
import AiAssistant from "@/components/AiAssistant";
import SeasonalPromos from "@/components/SeasonalPromos";
import Breadcrumbs from "@/components/Breadcrumbs";
import { business } from "@/data/business";

export const metadata: Metadata = {
  title: "About Us - Family Owned Painting Company in Woodridge, IL",
  description:
    "Learn about D&D Pro Painting, a family owned and operated painting company with 15 years of experience serving the western Chicago suburbs. Fully insured, licensed, and dedicated to quality.",
};

const values = [
  {
    icon: <Heart className="w-6 h-6" />,
    title: "Family Values",
    description:
      "As a family owned and operated business, we treat every home as if it were our own. Personal care and dedication go into every project.",
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Integrity",
    description:
      "Honest pricing, transparent communication, and doing what we say we will do. No hidden fees, no surprises - just reliable, trustworthy service.",
  },
  {
    icon: <Award className="w-6 h-6" />,
    title: "Excellence",
    description:
      "We never settle for 'good enough.' Our team strives for perfection on every wall, trim, and surface. Your satisfaction is our measure of success.",
  },
  {
    icon: <Target className="w-6 h-6" />,
    title: "Precision",
    description:
      "Meticulous attention to detail sets us apart. From careful surface preparation to flawless finish coats, every step is executed with precision.",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Community",
    description:
      "We are proud to serve the communities of DuPage and Will Counties. Many of our clients are our neighbors, and we take that responsibility seriously.",
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: "Reliability",
    description:
      "We show up on time, communicate clearly throughout your project, and deliver on our promises. Your time is valuable and we respect that.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "About Us" }]} />

      {/* Hero */}
      <section className="relative py-20 lg:py-28 bg-primary text-white overflow-hidden">
        <Image
          src="/hero-van.png"
          alt="D&D Pro Painting branded van"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-primary/70" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-accent-light font-semibold text-sm tracking-widest uppercase drop-shadow-md">
              About Us
            </span>
            <h1 className="text-4xl lg:text-5xl font-extrabold mt-2 mb-6 drop-shadow-lg">
              A Family Business Built on{" "}
              <span className="text-accent-light">Trust & Quality</span>
            </h1>
            <p className="text-xl text-white/90 leading-relaxed drop-shadow-md">
              D&D Pro Painting is a family owned and operated business with over
              15 years of experience serving homeowners and businesses across the
              western Chicago suburbs. Customer satisfaction comes first in
              everything we do.
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-accent font-semibold text-sm tracking-widest uppercase">
                Our Story
              </span>
              <h2 className="text-3xl font-bold text-gray-900 mt-2 mb-6">
                15 Years of Painting Excellence
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Founded in Woodridge, Illinois, D&D Pro Painting started with a
                  simple mission: provide professional, affordable painting
                  services with the kind of personal attention that only a family
                  business can deliver.
                </p>
                <p>
                  Over the past 15 years, we have grown from a small local
                  operation to one of the most trusted painting companies in the
                  western Chicago suburbs. Our team of skilled professionals has
                  completed thousands of projects - from single-room refreshes to
                  complete home transformations - across communities like
                  Woodridge, Naperville, Downers Grove, Hinsdale, and beyond.
                </p>
                <p>
                  What has not changed is our commitment to quality. Every project
                  receives the same meticulous attention to detail, premium
                  materials, and personal service that built our reputation. We
                  are fully insured, licensed, and stand behind every job with a
                  warranty.
                </p>
                <p>
                  Today, with a 4.9-star rating on Google from 69 reviews, our
                  customers continue to trust us with their most valuable
                  investment - their homes. We are proud to be a part of this
                  community and look forward to serving you.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gray-100 rounded-2xl overflow-hidden aspect-[4/3] relative">
                <Image
                  src="/about-us-photo.png"
                  alt="D&D Pro Painting owner with fleet"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-accent text-white p-6 rounded-xl shadow-xl hidden lg:block">
                <div className="text-3xl font-extrabold">15+</div>
                <div className="text-sm font-medium">Years of Experience</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 lg:py-24 bg-gray-50 section-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-accent font-semibold text-sm tracking-widest uppercase">
              Our Values
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mt-2 mb-4">
              What Drives Us Every Day
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These core values guide every decision we make and every brush
              stroke we apply.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value) => (
              <div
                key={value.title}
                className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
                  {value.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 lg:py-20 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { number: "15+", label: "Years of Experience" },
              { number: "1000+", label: "Projects Completed" },
              { number: "4.9★", label: "Google Rating" },
              { number: "16+", label: "Communities Served" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl lg:text-4xl font-extrabold text-accent-light mb-1">
                  {stat.number}
                </div>
                <div className="text-sm text-white/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <AiAssistant />
      <SeasonalPromos />

      {/* CTA */}
      <section className="py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Let Us Transform Your Home
          </h2>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            Experience the D&D Pro Painting difference. Contact us today for a
            free estimate and see why homeowners across the western Chicago
            suburbs trust us with their homes.
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
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-semibold rounded-lg hover:bg-primary-light transition-colors text-lg"
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
