import type { LocationServiceContent } from "./types";

/**
 * Content generator - produces unique, link-rich long-form content per
 * location/service pair.
 *
 * Three critical mechanics:
 *   1. Each city's unique data (neighborhoods, population, zipCodes,
 *      localExpertise paragraph) is woven into every service template, so
 *      every output page is materially different.
 *   2. The generator injects contextual internal markdown links
 *      [text](/city/service) and [text](/resources/slug) throughout the
 *      body copy so crawlers see genuine site-wide topical linking and
 *      humans see obvious next-step navigation.
 *   3. The generator appends a link-dense "Related Painting Services in
 *      {City}" section and a neighbor-cities paragraph to every page  - 
 *      guaranteeing every generated page carries 8-20 contextual internal
 *      links without requiring per-blueprint effort.
 *
 * Output: 3000+ words per page, ~12-25 internal links per page.
 */

export interface GeneratorLocation {
  slug: string;
  name: string;
  county: string;
  state: string;
  description: string;
  localExpertise: string;
  neighborhoods: string[];
  population: string;
  zipCodes: string[];
}

export interface ServiceBlueprint {
  serviceSlug: string;
  serviceName: string;
  /** Lowercased service noun used in body copy, e.g. "interior painting" */
  serviceNoun: string;
  /** Opening sentence of hero intro. {city} gets replaced. */
  heroOpener: (city: string, county: string) => string;
  /** Service-specific section content. Each returns a full ContentSection[] */
  buildSections: (loc: GeneratorLocation) => {
    heading: string;
    paragraphs: string[];
  }[];
  /** Service-specific pricing copy. */
  pricingNote: (loc: GeneratorLocation) => string;
  /** Service-specific FAQ set. */
  faqs: (loc: GeneratorLocation) => { question: string; answer: string }[];
  /** Service-specific key takeaways. */
  keyTakeaways: (loc: GeneratorLocation) => string[];
  /** Slugs of related articles */
  relatedArticles: string[];
}

/**
 * Geographic neighbor map - which cities link naturally to which for
 * "homeowners in nearby X" style cross-references. Only includes slugs
 * that actually exist in locations array (see business.ts).
 */
const NEIGHBOR_MAP: Record<string, string[]> = {
  woodridge: ["downers-grove", "naperville", "lemont", "bolingbrook"],
  lemont: ["woodridge", "homer-glen", "lockport", "burr-ridge"],
  naperville: ["woodridge", "downers-grove", "bolingbrook", "glen-ellyn"],
  hinsdale: ["oak-brook", "burr-ridge", "downers-grove", "woodridge"],
  "oak-brook": ["hinsdale", "downers-grove", "burr-ridge", "glen-ellyn"],
  "glen-ellyn": ["downers-grove", "naperville", "oak-brook", "woodridge"],
  "downers-grove": ["woodridge", "hinsdale", "oak-brook", "glen-ellyn"],
  bolingbrook: ["woodridge", "naperville", "lemont", "homer-glen"],
  "burr-ridge": ["hinsdale", "oak-brook", "lemont", "woodridge"],
  "homer-glen": ["lockport", "lemont", "mokena", "bolingbrook"],
  lockport: ["homer-glen", "lemont", "mokena", "bolingbrook"],
  mokena: ["homer-glen", "lockport", "bolingbrook", "naperville"],
};

/**
 * Cross-service map - which other services on the site pair naturally
 * with the current service for "also consider" internal linking.
 */
const CROSS_SERVICES: Record<string, { slug: string; label: string }[]> = {
  "interior-painting": [
    { slug: "cabinet-painting", label: "kitchen cabinet painting" },
    { slug: "ceiling-painting", label: "ceiling painting" },
    { slug: "popcorn-ceiling-removal", label: "popcorn ceiling removal" },
    { slug: "kitchen-painting", label: "full kitchen painting" },
    { slug: "drywall-repair", label: "drywall repair" },
  ],
  "exterior-painting": [
    { slug: "pressure-washing", label: "pressure washing" },
    { slug: "deck-staining", label: "deck staining" },
    { slug: "fence-staining", label: "fence staining" },
  ],
  "pressure-washing": [
    { slug: "exterior-painting", label: "exterior painting" },
    { slug: "deck-staining", label: "deck staining" },
    { slug: "fence-staining", label: "fence staining" },
  ],
  "deck-staining": [
    { slug: "fence-staining", label: "fence staining" },
    { slug: "pressure-washing", label: "pressure washing" },
    { slug: "exterior-painting", label: "exterior painting" },
  ],
  "fence-staining": [
    { slug: "deck-staining", label: "deck staining" },
    { slug: "pressure-washing", label: "pressure washing" },
    { slug: "exterior-painting", label: "exterior painting" },
  ],
  "drywall-repair": [
    { slug: "interior-painting", label: "interior painting" },
    { slug: "ceiling-painting", label: "ceiling painting" },
    { slug: "popcorn-ceiling-removal", label: "popcorn ceiling removal" },
  ],
  "epoxy-flooring": [
    { slug: "commercial-painting", label: "commercial painting" },
    { slug: "interior-painting", label: "interior painting" },
  ],
  "commercial-painting": [
    { slug: "epoxy-flooring", label: "epoxy flooring" },
    { slug: "interior-painting", label: "interior painting" },
    { slug: "exterior-painting", label: "exterior painting" },
  ],
  "ceiling-painting": [
    { slug: "interior-painting", label: "interior painting" },
    { slug: "popcorn-ceiling-removal", label: "popcorn ceiling removal" },
    { slug: "drywall-repair", label: "drywall repair" },
  ],
  "cabinet-painting": [
    { slug: "kitchen-painting", label: "full kitchen painting" },
    { slug: "interior-painting", label: "interior painting" },
    { slug: "ceiling-painting", label: "ceiling painting" },
  ],
  "popcorn-ceiling-removal": [
    { slug: "ceiling-painting", label: "ceiling painting" },
    { slug: "drywall-repair", label: "drywall repair" },
    { slug: "interior-painting", label: "interior painting" },
  ],
  "kitchen-painting": [
    { slug: "cabinet-painting", label: "cabinet painting" },
    { slug: "interior-painting", label: "interior painting" },
    { slug: "ceiling-painting", label: "ceiling painting" },
  ],
};

/**
 * Pillar article map - which resource articles pair best with each service
 * for deep-context linking inside paragraph copy.
 */
const SERVICE_PILLARS: Record<string, { slug: string; label: string }[]> = {
  "interior-painting": [
    { slug: "interior-painting-cost-guide-chicago-suburbs", label: "complete Chicago suburbs interior painting cost guide" },
    { slug: "how-to-choose-interior-paint-colors", label: "interior paint color selection guide" },
    { slug: "best-interior-paint-colors-chicago-homes-2026", label: "top interior paint colors for 2026" },
    { slug: "whole-home-interior-painting-timeline", label: "whole-home painting project timeline" },
    { slug: "benefits-of-professional-painting-vs-diy", label: "professional vs DIY painting comparison" },
  ],
  "exterior-painting": [
    { slug: "exterior-painting-cost-guide-chicago-suburbs-2026", label: "Chicago suburbs exterior painting cost guide" },
    { slug: "exterior-painting-preparation-guide", label: "exterior painting prep guide" },
    { slug: "hoa-approved-exterior-paint-colors-dupage", label: "HOA-approved exterior colors for DuPage County" },
    { slug: "pre-sale-painting-roi-chicago-suburbs", label: "pre-sale painting ROI guide" },
  ],
  "cabinet-painting": [
    { slug: "kitchen-cabinet-painting-vs-replacement-illinois", label: "kitchen cabinet painting vs replacement guide" },
    { slug: "interior-painting-cost-guide-chicago-suburbs", label: "interior painting cost guide" },
  ],
  "ceiling-painting": [
    { slug: "popcorn-ceiling-removal-illinois-guide", label: "popcorn ceiling removal guide" },
    { slug: "interior-painting-cost-guide-chicago-suburbs", label: "interior painting cost guide" },
  ],
  "popcorn-ceiling-removal": [
    { slug: "popcorn-ceiling-removal-illinois-guide", label: "complete popcorn ceiling removal guide for Illinois homes" },
    { slug: "interior-painting-cost-guide-chicago-suburbs", label: "interior painting cost guide" },
  ],
  "kitchen-painting": [
    { slug: "kitchen-cabinet-painting-vs-replacement-illinois", label: "kitchen cabinet painting vs replacement" },
    { slug: "best-interior-paint-colors-chicago-homes-2026", label: "kitchen color trends for 2026" },
  ],
  "pressure-washing": [
    { slug: "exterior-painting-preparation-guide", label: "exterior painting prep guide" },
  ],
  "deck-staining": [
    { slug: "exterior-painting-preparation-guide", label: "exterior preparation guide" },
  ],
  "fence-staining": [
    { slug: "exterior-painting-preparation-guide", label: "exterior preparation guide" },
  ],
  "drywall-repair": [
    { slug: "interior-painting-cost-guide-chicago-suburbs", label: "interior painting cost guide" },
  ],
  "epoxy-flooring": [],
  "commercial-painting": [
    { slug: "pre-sale-painting-roi-chicago-suburbs", label: "commercial painting ROI considerations" },
  ],
};

function getNeighbors(slug: string): string[] {
  return NEIGHBOR_MAP[slug] ?? [];
}

/**
 * Render a linked list of neighbor cities pointing at the same service.
 * e.g. "[Naperville](/naperville/interior-painting), [Downers Grove](/downers-grove/interior-painting), and [Bolingbrook](/bolingbrook/interior-painting)"
 */
function neighborLinkList(
  locSlug: string,
  serviceSlug: string,
  locNameMap: Record<string, string>,
  limit = 3
): string {
  const neighbors = getNeighbors(locSlug).slice(0, limit);
  const parts = neighbors
    .filter((s) => locNameMap[s])
    .map((s) => `[${locNameMap[s]}](/${s}/${serviceSlug})`);
  if (parts.length === 0) return "";
  if (parts.length === 1) return parts[0];
  if (parts.length === 2) return `${parts[0]} and ${parts[1]}`;
  return `${parts.slice(0, -1).join(", ")}, and ${parts[parts.length - 1]}`;
}

/**
 * Render a linked list of cross-services within the same city.
 * e.g. "[cabinet painting in Woodridge](/woodridge/cabinet-painting), [ceiling painting](/woodridge/ceiling-painting), ..."
 */
function crossServiceLinkList(
  locSlug: string,
  locName: string,
  serviceSlug: string,
  limit = 3
): string {
  const services = (CROSS_SERVICES[serviceSlug] ?? []).slice(0, limit);
  if (services.length === 0) return "";
  const parts = services.map(
    (s, idx) =>
      `[${s.label}${idx === 0 ? ` in ${locName}` : ""}](/${locSlug}/${s.slug})`
  );
  if (parts.length === 1) return parts[0];
  if (parts.length === 2) return `${parts[0]} and ${parts[1]}`;
  return `${parts.slice(0, -1).join(", ")}, and ${parts[parts.length - 1]}`;
}

function pillarLink(serviceSlug: string, idx: number): string {
  const pillars = SERVICE_PILLARS[serviceSlug] ?? [];
  const pillar = pillars[idx];
  if (!pillar) return "";
  return `[${pillar.label}](/resources/${pillar.slug})`;
}

/**
 * Name map for use in neighbor link generation. Built once per call from
 * location data passed in.
 */
export function buildLocationNameMap(
  allLocations: { slug: string; name: string }[]
): Record<string, string> {
  return allLocations.reduce<Record<string, string>>((acc, l) => {
    acc[l.slug] = l.name;
    return acc;
  }, {});
}

export interface GeneratorContext {
  /** Lookup table: location slug -> display name. */
  locationNameMap: Record<string, string>;
}

/**
 * Link-density philosophy (Google SEO best practices):
 *
 * Contextual editorial links are MOST valuable when they are few, varied,
 * and placed where the user has a genuine reason to want to click. Too many
 * internal links per page dilutes link equity, triggers over-optimization
 * signals, and reads spammy to both users and crawlers. This generator is
 * deliberately restrained - it injects at most ONE editorial link for each
 * of the natural "deeper dive" moments in the copy:
 *
 *   - Hero intro: single link to the most relevant pillar article (if any)
 *   - Pricing note: single link to the primary pricing-focused pillar
 *   - No link-dump "related services" or "nearby cities" appended sections
 *   - Neighborhood focus: pure prose, no embedded links
 *   - Key takeaways: pure summary bullets, no embedded links
 *
 * Navigation/sidebar links (rendered by the page component) handle
 * cross-service discovery - they don't need to be duplicated inside the
 * body copy. Blueprints themselves may author 2-4 contextual links inside
 * their own sections/FAQs as the content editorially demands; those are the
 * author's call, not the generator's.
 *
 * Target editorial body link count per generated page: ~4-8 total.
 */
export function generateContent(
  loc: GeneratorLocation,
  blueprint: ServiceBlueprint,
  ctx: GeneratorContext
): LocationServiceContent {
  const { name, zipCodes, neighborhoods, localExpertise } = loc;
  // locationNameMap is accepted for future use but intentionally unused  - 
  // we no longer emit neighbor-city link lists inline.
  void ctx;

  const primaryPillar = pillarLink(blueprint.serviceSlug, 0);

  // Hero intro - single natural pillar reference, no link pile-up.
  const heroIntroBase = `${blueprint.heroOpener(name, loc.county)} D&D Pro Painting has delivered professional ${blueprint.serviceNoun} to ${name} homeowners for over 15 years, earning a 4.9-star Google rating across 69 verified reviews. Our family-owned team serves every ${name} neighborhood from ${neighborhoods.slice(0, 3).join(", ")} to the rest of the ${zipCodes.join(" and ")} ZIP code area, combining premium low-VOC materials with the meticulous prep process that separates a finish that lasts 10 years from one that fails within 12 months.`;

  const heroIntroPillar = primaryPillar
    ? ` Still researching? Our ${primaryPillar} covers pricing, materials, and timing in depth.`
    : "";

  const heroIntro = `${heroIntroBase}${heroIntroPillar}`;

  // Sections - take blueprint output as-is. No auto-appended link-dump
  // sections. Cross-service and nearby-city discovery is handled by the
  // sidebar navigation rendered by the page component.
  const sections = blueprint.buildSections(loc);

  // Neighborhood notes - rotated prose variants, no embedded links.
  const neighborhoodFocus = neighborhoods.map((n, idx) => ({
    name: n,
    note: buildNeighborhoodNote(n, blueprint.serviceNoun, idx, loc),
  }));

  // Local challenges - unchanged expert prose, no injected link list.
  const localChallenges = `${localExpertise} These local factors directly shape our ${blueprint.serviceNoun} product selection, application technique, and project scheduling in ${name}. Generic painting contractors apply the same products in every suburb and wonder why their work fails prematurely here. We do the opposite - we adapt to your ${name} home specifically, and the results speak for themselves across the hundreds of properties we have completed in ${loc.county}.`;

  // Pricing note - single pillar link (reader asking about price; pointer
  // to the pricing-focused pillar article is naturally helpful).
  const pricingNoteBase = blueprint.pricingNote(loc);
  const pricingNoteExtra = primaryPillar
    ? ` For a deeper breakdown, see our ${primaryPillar}.`
    : "";
  const pricingNote = `${pricingNoteBase}${pricingNoteExtra}`;

  return {
    heroIntro,
    sections,
    neighborhoodFocus,
    localChallenges,
    pricingNote,
    keyTakeaways: blueprint.keyTakeaways(loc),
    faqs: blueprint.faqs(loc),
    relatedArticles: blueprint.relatedArticles,
  };
}

// Neighborhood note variants - rotated prose, no embedded links. The page
// renders these in a grid card and the surrounding sidebar already carries
// the in-city and neighbor-city navigation, so inline links here add noise.
function buildNeighborhoodNote(
  neighborhood: string,
  serviceNoun: string,
  idx: number,
  loc: GeneratorLocation
): string {
  const variants = [
    `We have completed ${serviceNoun} projects throughout ${neighborhood} and understand the specific home styles and substrates common to this ${loc.name} neighborhood. Every project here is approached with care for the architectural character that defines the area.`,
    `${neighborhood} is one of the ${loc.name} neighborhoods we serve regularly. Our crews bring the right products, prep techniques, and color expertise needed to deliver ${serviceNoun} results that complement the homes here.`,
    `Our ${serviceNoun} work in ${neighborhood} reflects years of experience with the specific construction types and finishes prevalent in this part of ${loc.name}. Referrals from satisfied ${neighborhood} homeowners drive much of our work in the area.`,
    `${neighborhood} homeowners trust D&D Pro Painting for ${serviceNoun} because we know the neighborhood - from home ages to substrate types to the color palettes that work in ${loc.name}'s natural light. Each project gets a tailored approach.`,
    `For ${serviceNoun} in ${neighborhood}, we apply the same meticulous standards we use throughout ${loc.name}: thorough preparation, premium materials, two finish coats, and a final walkthrough. Consistency is how we earn repeat business.`,
    `We have painted many homes in ${neighborhood} over our 15 years in ${loc.name}. The specific architectural and environmental factors in this neighborhood inform our ${serviceNoun} approach - every detail matters.`,
  ];
  return variants[idx % variants.length];
}
