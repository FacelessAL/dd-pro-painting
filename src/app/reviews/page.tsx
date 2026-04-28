import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Star, ArrowRight, Phone } from "lucide-react";
import AiAssistant from "@/components/AiAssistant";
import SeasonalPromos from "@/components/SeasonalPromos";
import Breadcrumbs from "@/components/Breadcrumbs";
import { business, reviews } from "@/data/business";

export const metadata: Metadata = {
  title: "Customer Reviews - 4.9 Star Rated Painting Company",
  description:
    "Read real customer reviews of D&D Pro Painting. Rated 4.9 stars on Google with 69 reviews. See why homeowners across the western Chicago suburbs trust us with their painting projects.",
};

export default function ReviewsPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Reviews" }]} />

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
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-accent-light font-semibold text-sm tracking-widest uppercase drop-shadow-md">
              Customer Reviews
            </span>
            <h1 className="text-4xl lg:text-5xl font-extrabold mt-2 mb-6 drop-shadow-lg">
              What Our Customers{" "}
              <span className="text-accent-light">Say About Us</span>
            </h1>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-7 h-7 text-accent fill-accent" />
                ))}
              </div>
              <span className="text-2xl font-bold drop-shadow-md">{business.googleRating}</span>
            </div>
            <p className="text-white/90 text-lg drop-shadow-md">
              Based on {business.googleReviewCount} verified Google Reviews.
              We are proud to maintain one of the highest ratings among painting
              companies in the western Chicago suburbs.
            </p>
          </div>
        </div>
      </section>

      {/* Rating Summary */}
      <section className="py-8 bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-8 text-center">
            <div>
              <div className="text-4xl font-extrabold text-primary">{business.googleRating}</div>
              <div className="text-sm text-gray-500">Average Rating</div>
            </div>
            <div className="w-px h-12 bg-gray-300 hidden sm:block" />
            <div>
              <div className="text-4xl font-extrabold text-primary">{business.googleReviewCount}</div>
              <div className="text-sm text-gray-500">Total Reviews</div>
            </div>
            <div className="w-px h-12 bg-gray-300 hidden sm:block" />
            <div>
              <div className="text-4xl font-extrabold text-primary">100%</div>
              <div className="text-sm text-gray-500">Would Recommend</div>
            </div>
            <div className="w-px h-12 bg-gray-300 hidden sm:block" />
            <div>
              <div className="flex items-center gap-3">
                <a
                  href={business.googleReadReviewsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white font-semibold rounded-lg hover:bg-primary-light transition-colors text-sm"
                >
                  View on Google
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href={business.googleWriteReviewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-white font-semibold rounded-lg hover:bg-accent-dark transition-colors text-sm"
                >
                  <Star className="w-4 h-4" />
                  Write a Review
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All Reviews */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-accent fill-accent" />
                  ))}
                  {[...Array(5 - review.rating)].map((_, i) => (
                    <Star key={`empty-${i}`} className="w-4 h-4 text-gray-200" />
                  ))}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-4">
                  &ldquo;{review.text}&rdquo;
                </p>
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary text-sm font-bold">
                      {review.name.charAt(0)}
                    </div>
                    <span className="font-semibold text-gray-900 text-sm">
                      {review.name}
                    </span>
                  </div>
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <Star className="w-3 h-3 text-accent fill-accent" />
                    {review.source}
                  </span>
                </div>
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
            Join Our Happy Customers
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Experience the quality and service that has earned us a {business.googleRating}-star
            rating. Get your free estimate today.
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
              href={business.googleWriteReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-colors border border-white/20 text-lg"
            >
              <Star className="w-5 h-5" />
              Write a Review
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
