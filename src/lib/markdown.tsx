import React from "react";
import Link from "next/link";

/**
 * Render a string that may contain inline markdown tokens:
 *   - **bold**
 *   - [text](url) - internal `/path` uses next/link, everything else is <a target="_blank">
 *
 * Returns an array of React nodes suitable for inlining inside <p>, <li>, etc.
 *
 * This is the single shared inline-markdown renderer used by:
 *   - src/app/resources/[slug]/page.tsx (article bodies)
 *   - src/app/[location]/[service]/page.tsx (city/service bodies)
 *
 * Adding more tokens (e.g. *italic*, `code`) should be done here so every page
 * stays consistent.
 */
export function renderInline(text: string): React.ReactNode[] {
  if (!text) return [];
  // Match bold wrappers (**...**) and [text](url) links. Bold content is
  // intentionally permissive so nested links inside bold still render - we
  // recursively call renderInline on the bold interior.
  const pattern = /(\*\*[^*]+(?:\[[^\]]+\]\([^)]+\)[^*]*)*\*\*|\[[^\]]+\]\([^)]+\))/g;
  const parts = text.split(pattern);
  return parts.map((part, i) => {
    if (!part) return null;
    if (part.startsWith("**") && part.endsWith("**")) {
      const inner = part.slice(2, -2);
      return (
        <strong key={i} className="text-gray-800 font-semibold">
          {renderInline(inner)}
        </strong>
      );
    }
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      const [, label, href] = linkMatch;
      const isInternal = href.startsWith("/");
      if (isInternal) {
        return (
          <Link
            key={i}
            href={href}
            className="text-accent font-semibold hover:underline"
          >
            {label}
          </Link>
        );
      }
      return (
        <a
          key={i}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent font-semibold hover:underline"
        >
          {label}
        </a>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

/**
 * Strip inline markdown tokens (**bold**, [text](url)) and return plain text.
 *
 * Used when a string must be serialized as plain text - e.g. JSON-LD
 * structured data (FAQPage.acceptedAnswer.text) where Google expects
 * unmarked text rather than markdown fragments.
 */
export function stripInlineMarkdown(text: string): string {
  if (!text) return "";
  return text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1");
}
