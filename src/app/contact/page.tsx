import type { Metadata } from "next";
import Image from "next/image";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import EstimateForm from "@/components/EstimateForm";
import { business } from "@/data/business";

export const metadata: Metadata = {
  title: "Contact Us - Get a Free Painting Estimate in Woodridge, IL",
  description:
    "Contact D&D Pro Painting for a free painting estimate. Serving Woodridge, Naperville, Downers Grove & the western Chicago suburbs. Call (331) 241-6600 or fill out our online form.",
};

export default function ContactPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Contact Us" }]} />

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
              Contact Us
            </span>
            <h1 className="text-4xl lg:text-5xl font-extrabold mt-2 mb-4 drop-shadow-lg">
              Get Your{" "}
              <span className="text-accent-light">Free Estimate</span>
            </h1>
            <p className="text-xl text-white/90 leading-relaxed drop-shadow-md">
              Ready to transform your home? Fill out the form below or give us a
              call. We typically respond within 24 hours.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Request a Free Estimate
                </h2>
                <p className="text-gray-600 mb-6">
                  Tell us about your project and we will provide a detailed,
                  no-obligation quote.
                </p>
                <EstimateForm />
              </div>
            </div>

            {/* Contact Info Sidebar */}
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Contact Information
                </h3>
                <div className="space-y-4">
                  <a
                    href={`tel:${business.phoneFull}`}
                    className="flex items-start gap-3 text-gray-700 hover:text-primary transition-colors"
                  >
                    <Phone className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-semibold">{business.phone}</div>
                      <div className="text-sm text-gray-500">Call or text anytime</div>
                    </div>
                  </a>
                  <a
                    href={`mailto:${business.email}`}
                    className="flex items-start gap-3 text-gray-700 hover:text-primary transition-colors"
                  >
                    <Mail className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-semibold">{business.email}</div>
                      <div className="text-sm text-gray-500">Email us anytime</div>
                    </div>
                  </a>
                  <div className="flex items-start gap-3 text-gray-700">
                    <MapPin className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-semibold">{business.address}</div>
                      <div className="text-sm text-gray-500">
                        Serving the western Chicago suburbs
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Business Hours
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <div className="space-y-1">
                      <div className="flex justify-between gap-4">
                        <span className="text-gray-600">Monday - Friday</span>
                        <span className="font-medium text-gray-900">7:00 AM - 6:00 PM</span>
                      </div>
                      <div className="flex justify-between gap-4">
                        <span className="text-gray-600">Saturday</span>
                        <span className="font-medium text-gray-900">8:00 AM - 4:00 PM</span>
                      </div>
                      <div className="flex justify-between gap-4">
                        <span className="text-gray-600">Sunday</span>
                        <span className="font-medium text-gray-900">Closed</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-primary rounded-xl p-6 text-white">
                <h3 className="text-lg font-bold mb-2">Why Choose D&D Pro Painting?</h3>
                <ul className="space-y-2 text-sm text-white/85">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0" />
                    Free, no-obligation estimates
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0" />
                    Fully insured and licensed
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0" />
                    15+ years of experience
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0" />
                    Family owned and operated
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0" />
                    Warranty on every project
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0" />
                    4.9★ rating on Google
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  );
}
