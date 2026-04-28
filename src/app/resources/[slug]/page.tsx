import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Tag, Phone, ArrowRight, ChevronDown } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import AiAssistant from "@/components/AiAssistant";
import SeasonalPromos from "@/components/SeasonalPromos";
import { articles } from "@/data/articles";
import { business } from "@/data/business";
import { renderInline, stripInlineMarkdown } from "@/lib/markdown";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) return { title: "Article Not Found" };
  return {
    title: article.title,
    description: article.metaDescription,
    openGraph: {
      title: article.title,
      description: article.metaDescription,
      images: [{ url: article.heroImage }],
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.metaDescription,
    image: article.heroImage,
    author: {
      "@type": "Organization",
      name: "D&D Pro Painting",
    },
    publisher: {
      "@type": "Organization",
      name: "D&D Pro Painting",
    },
    datePublished: article.publishDate,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: article.faqs.map((faq) => ({
      "@type": "Question",
      name: stripInlineMarkdown(faq.question),
      acceptedAnswer: {
        "@type": "Answer",
        text: stripInlineMarkdown(faq.answer),
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Breadcrumbs
        items={[
          { label: "Resources", href: "/resources" },
          { label: article.title },
        ]}
      />

      {/* Hero */}
      <section className="relative">
        <div className="relative w-full min-h-[300px] sm:min-h-[350px] lg:min-h-[400px] overflow-hidden">
          <img
            src={article.heroImage}
            alt={article.heroImageAlt}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-white bg-accent px-2.5 py-1 rounded-full">
                <Tag className="w-3 h-3" />
                {article.category}
              </span>
              <span className="flex items-center gap-1 text-xs text-white/80">
                <Clock className="w-3 h-3" />
                {article.readTime}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight">
              {article.title}
            </h1>
          </div>
        </div>
      </section>

      <article className="py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12">
            {/* Content */}
            <div>
              {/* Key Takeaways */}
              <div className="bg-primary/5 border border-primary/10 rounded-xl p-6 mb-10">
                <h2 className="text-lg font-bold text-primary mb-3">
                  Key Takeaways
                </h2>
                <ul className="space-y-2">
                  {article.keyTakeaways.map((takeaway, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="w-5 h-5 bg-accent text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                        {index + 1}
                      </span>
                      <span>{renderInline(takeaway)}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Article Content */}
              <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-headings:font-bold prose-p:text-gray-600 prose-p:leading-relaxed prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-800 prose-li:text-gray-600">
                {article.content.split("\n\n").map((paragraph, index) => {
                  if (paragraph.startsWith("### ")) {
                    return (
                      <h3 key={index} className="text-xl font-bold text-gray-800 mt-8 mb-3">
                        {renderInline(paragraph.replace("### ", ""))}
                      </h3>
                    );
                  }
                  if (paragraph.startsWith("## ")) {
                    return (
                      <h2 key={index} className="text-2xl font-bold text-gray-900 mt-10 mb-4">
                        {paragraph.replace("## ", "")}
                      </h2>
                    );
                  }
                  if (paragraph.startsWith("**") && paragraph.endsWith("**") && !paragraph.slice(2, -2).includes("**")) {
                    return (
                      <h3 key={index} className="text-lg font-bold text-gray-800 mt-6 mb-2">
                        {paragraph.replace(/\*\*/g, "")}
                      </h3>
                    );
                  }
                  const lines = paragraph.split("\n");
                  const listLines = lines.filter((l) => l.startsWith("- "));
                  if (listLines.length > 0) {
                    const nonListLines = lines.filter((l) => !l.startsWith("- "));
                    return (
                      <div key={index} className="mb-4">
                        {nonListLines.length > 0 && (
                          <p className="text-gray-600 leading-relaxed mb-2">
                            {renderInline(nonListLines.join(" "))}
                          </p>
                        )}
                        <ul className="list-disc pl-6 space-y-1.5">
                          {listLines.map((item, li) => (
                            <li key={li} className="text-gray-600 leading-relaxed">
                              {renderInline(item.replace(/^- /, ""))}
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  }
                  return (
                    <p key={index} className="text-gray-600 leading-relaxed mb-4">
                      {renderInline(paragraph)}
                    </p>
                  );
                })}
              </div>

              {/* FAQs */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  {article.faqs.map((faq, index) => (
                    <details
                      key={index}
                      className="group bg-gray-50 rounded-xl border border-gray-100"
                    >
                      <summary className="flex items-center justify-between cursor-pointer p-5 text-gray-900 font-semibold text-sm hover:text-primary transition-colors list-none">
                        {faq.question}
                        <ChevronDown className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0 ml-4" />
                      </summary>
                      <div className="px-5 pb-5 text-sm text-gray-600 leading-relaxed">
                        {renderInline(faq.answer)}
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="hidden lg:block">
              <div className="sticky top-28 space-y-6">
                <div className="bg-primary rounded-xl p-6 text-white">
                  <h3 className="text-lg font-bold mb-2">Need Professional Help?</h3>
                  <p className="text-sm text-white/80 mb-4">
                    Let D&D Pro Painting handle your project with expert care.
                  </p>
                  <Link
                    href="/contact"
                    className="block text-center px-4 py-2.5 bg-accent text-white font-semibold rounded-lg hover:bg-accent-dark transition-colors text-sm mb-2"
                  >
                    Get a Free Estimate
                  </Link>
                  <a
                    href={`tel:${business.phoneFull}`}
                    className="flex items-center justify-center gap-2 text-sm text-white/80 hover:text-white transition-colors mt-2"
                  >
                    <Phone className="w-4 h-4" />
                    {business.phone}
                  </a>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                  <h3 className="font-bold text-gray-900 mb-3 text-sm">More Articles</h3>
                  <div className="space-y-3">
                    {[...articles]
                      .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
                      .filter((a) => a.slug !== slug)
                      .slice(0, 3)
                      .map((a) => (
                        <Link
                          key={a.slug}
                          href={`/resources/${a.slug}`}
                          className="block text-sm text-gray-700 hover:text-primary transition-colors leading-snug"
                        >
                          {a.title}
                        </Link>
                      ))}
                  </div>
                </div>
              </div>
            </aside>
          </div>

          {/* Back link */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <Link
              href="/resources"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:text-accent transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to All Resources
            </Link>
          </div>
        </div>
      </article>

      <AiAssistant />
      <SeasonalPromos />
    </>
  );
}
