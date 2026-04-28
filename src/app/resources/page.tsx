import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, Tag } from "lucide-react";
import AiAssistant from "@/components/AiAssistant";
import SeasonalPromos from "@/components/SeasonalPromos";
import Breadcrumbs from "@/components/Breadcrumbs";
import { articles } from "@/data/articles";

export const metadata: Metadata = {
  title: "Painting Resources & Tips - Expert Home Painting Guides",
  description:
    "Expert painting tips, guides, and resources from D&D Pro Painting. Learn about interior colors, exterior prep, deck staining, and more from professional painters in the Chicago suburbs.",
};

export default function ResourcesPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Resources" }]} />

      {/* Hero */}
      <section className="relative py-16 lg:py-20 bg-primary text-white overflow-hidden">
        <Image
          src="/hero-fleet.png"
          alt="D&D Pro Painting fleet"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-primary/70" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-accent-light font-semibold text-sm tracking-widest uppercase drop-shadow-md">
              Resources & Tips
            </span>
            <h1 className="text-4xl lg:text-5xl font-extrabold mt-2 mb-6 drop-shadow-lg">
              Expert Painting{" "}
              <span className="text-accent-light">Guides & Tips</span>
            </h1>
            <p className="text-xl text-white/90 leading-relaxed drop-shadow-md">
              Helpful articles from professional painters with 15 years of
              experience. Whether you are planning a project or looking for
              maintenance tips, our guides have you covered.
            </p>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[...articles].sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()).map((article) => (
              <Link
                key={article.slug}
                href={`/resources/${article.slug}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100 hover:shadow-xl transition-all duration-300"
              >
                <div className="aspect-[16/9] overflow-hidden">
                  <img
                    src={article.heroImage}
                    alt={article.heroImageAlt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-accent bg-accent/10 px-2.5 py-1 rounded-full">
                      <Tag className="w-3 h-3" />
                      {article.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-gray-400">
                      <Clock className="w-3 h-3" />
                      {article.readTime}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors leading-tight">
                    {article.title}
                  </h2>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {article.metaDescription}
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm text-accent font-semibold group-hover:gap-2 transition-all">
                    Read Full Article
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <AiAssistant />
      <SeasonalPromos />
    </>
  );
}
