// Shared types for long-form, SEO-optimized location/service content.
// Each LocationServiceContent entry powers a 2000-3500 word page that
// Google should recognize as genuinely unique, helpful, and local.

export interface ContentSection {
  /** Renders as an <h2> on the page */
  heading: string;
  /** Each array item renders as a <p>. Supports **bold** inline markers. */
  paragraphs: string[];
}

export interface NeighborhoodNote {
  /** Neighborhood, subdivision, or street corridor name */
  name: string;
  /** 1-2 sentences about what makes painting work in this specific area distinctive */
  note: string;
}

export interface LocationServiceContent {
  /**
   * 120-220 word opening paragraph shown immediately under the H1. Must
   * reference the city + county specifically and hook the reader.
   */
  heroIntro: string;

  /** 5-8 deep sections of unique local content - the core of the page. */
  sections: ContentSection[];

  /** 3-6 neighborhood callouts with service-specific detail. */
  neighborhoodFocus: NeighborhoodNote[];

  /** 150-250 word paragraph on climate, substrate, and architectural challenges. */
  localChallenges: string;

  /** 150-250 word paragraph on typical pricing, timing, or scope expectations. */
  pricingNote: string;

  /** 6-10 bullet takeaways shown in the key-takeaways card. */
  keyTakeaways: string[];

  /** 6-10 FAQ entries that target long-tail search queries. */
  faqs: { question: string; answer: string }[];

  /** Slugs of resource articles to feature in the Related Guides block. */
  relatedArticles: string[];
}

export type LocationServiceContentMap = Record<
  string,
  Record<string, LocationServiceContent>
>;
