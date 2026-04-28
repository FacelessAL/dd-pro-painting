import type { LocationServiceContent } from "./types";
import { locations } from "../business";
import { buildLocationNameMap, generateContent, type ServiceBlueprint } from "./generator";

const locationNameMap = buildLocationNameMap(locations);

const deckStainingBlueprint: ServiceBlueprint = {
  serviceSlug: "deck-staining",
  serviceName: "Deck Staining & Painting",
  serviceNoun: "deck staining",
  heroOpener: (city) =>
    `Professional deck staining in ${city}, IL protects wood from Illinois freeze-thaw cycles, UV damage, and moisture intrusion while restoring the warm natural tone that cedar, pressure-treated pine, and hardwoods deliver when properly finished. D&D Pro Painting preps every deck with correct pressure washing, brightener, sanding where needed, and two coats of professional-grade stain matched to your wood species and exposure.`,
  buildSections: (loc) => [
    {
      heading: `Deck Staining for Cedar, Pressure-Treated Pine, and Hardwoods in ${loc.name}`,
      paragraphs: [
        `Decks in ${loc.name} take a brutal beating. Summer sun reaches 95°F+ and UV breaks down wood lignin. Winter cold drops below zero and water freezing in open grain splits the wood. Fall leaves drop tannins that stain. Spring rain soaks unprotected boards. Without a correct stain system, a new cedar deck in ${loc.name} starts graying within 12 months and shows surface splits within 3-4 years.`,
        `The correct stain system depends on species. Cedar and redwood take semi-transparent oil-based penetrating stains beautifully - showing off grain while protecting the surface. Pressure-treated pine (the most common ${loc.name} deck material) needs 6 months of weathering before staining and then takes solid-color or semi-solid stains well. Ipe, mahogany, and other tropical hardwoods require specialty penetrating oils; film-forming stains peel off these dense species within one season.`,
        `D&D Pro Painting specifies the correct stain - semi-transparent, semi-solid, or solid - based on your deck's age, species, and prior finish. We explain the trade-offs: semi-transparent shows grain but needs recoating every 2-3 years; solid stain lasts 4-6 years but hides grain completely. Your deck, your call, with our guidance.`,
      ],
    },
    {
      heading: `Our ${loc.name} Deck Staining Process`,
      paragraphs: [
        `**Phase 1 - Inspection and preparation plan.** We inspect your ${loc.name} deck for loose boards, popped fasteners, splinters, rot, and failing prior finish. We quote any carpentry repairs separately (board replacement, joist repair, railing tightening). We identify existing stain type - important because film-forming stains must be stripped before re-staining, while oil penetrating stains can be washed and reapplied.`,
        `**Phase 2 - Pressure washing and brightening.** We [pressure wash in ${loc.name}](/${loc.slug}/pressure-washing) the deck at calibrated pressure (1,500-2,200 PSI on wood) with a deck-specific cleaner that removes mill glaze, mildew, and embedded dirt. A wood brightener (oxalic acid) is applied to neutralize the cleaner, restore the wood's natural color, and open the grain for stain penetration.`,
        `**Phase 3 - Drying and sanding.** Wood must dry 48-72 hours before staining. Moisture meters confirm sub-15% moisture content before we stain. Any raised or fuzzed grain from washing is lightly sanded smooth. Protruding fasteners are driven flush or replaced.`,
        `**Phase 4 - Stain application.** Two coats of stain applied with pad applicators, brushes, and HVLP spray as appropriate for each area. We never flood-coat a deck and walk away - stain is applied to saturation but worked in to eliminate lap marks and puddling that cause peeling.`,
        `**Phase 5 - Final walkthrough and care sheet.** You receive written care instructions for your new ${loc.name} deck finish - how to clean, when to recoat, what not to do (e.g., never use rubber-backed mats on cedar, they trap moisture and cause rot).`,
      ],
    },
    {
      heading: `Stain Colors and Finishes Popular in ${loc.name}`,
      paragraphs: [
        `**Natural cedar tones.** Honey-colored semi-transparent stains that let cedar grain show through - the classic Midwest deck look. Brands like Cabot Australian Timber Oil and Olympic Elite deliver 3+ years of protection on new cedar.`,
        `**Warm browns and reds.** Mahogany, chestnut, and redwood tones popular for pressure-treated pine upgrades that want to look more custom. Semi-solid stains hide some of the pine's greenish treatment tint while showing enough grain to look natural.`,
        `**Gray weathered looks.** A deliberate gray finish popular for modern and coastal-inspired ${loc.name} homes. Driftwood and pebble gray semi-transparents deliver a deliberate aged look without the unprotected silver of unfinished weathering.`,
        `**Solid colors.** Deep charcoal, barn red, forest green, and crisp white solid stains for decks that function like extensions of painted exterior color schemes. Solid stain lasts 4-6 years - longer than any semi-transparent - at the cost of hiding grain.`,
      ],
    },
    {
      heading: `Composite Decks, PVC Decks, and Painted Decks`,
      paragraphs: [
        `Trex, TimberTech, Fiberon, and Azek composite decks are not stained - they are cleaned. Composite decks in ${loc.name} get mold, mildew, and embedded dirt that respond to composite-specific cleaners and soft washing. We clean composite decks on request; we do not stain or paint them.`,
        `Previously painted decks require either stripping (aggressive, labor-intensive) or re-painting (committing to continued paint maintenance). We inspect painted decks and give you an honest recommendation - usually stripping to bare wood for staining is more expensive short-term but cheaper long-term than repeating paint cycles every 3-4 years.`,
        `Ipe, mahogany, and other dense tropical hardwoods get penetrating oils like Penofin, Ipe Oil, or Cabot Australian Timber Oil. Film-forming stains peel off dense woods within one season. We know the correct product for every species you bring us in ${loc.name}.`,
      ],
    },
    {
      heading: `Why D&D Pro Painting for ${loc.name} Deck Staining`,
      paragraphs: [
        `**Correct pressure during prep.** Too much pressure fuzzes wood; too little leaves dirt behind. Our calibrated approach delivers wood ready to accept stain. We also offer standalone [pressure washing in ${loc.name}](/${loc.slug}/pressure-washing) for homeowners handling their own staining.`,
        `**Species-appropriate products.** Cedar gets semi-transparent; pressure-treated pine gets semi-solid or solid; tropical hardwoods get penetrating oils. We never use one product for every deck.`,
        `**Fence staining bundling.** Many ${loc.name} homeowners pair deck staining with [fence staining in ${loc.name}](/${loc.slug}/fence-staining) for coordinated outdoor color. We offer bundled pricing.`,
        `**Carpentry repair integration.** Loose boards, popped nails, small rot pockets - we fix these during the project rather than staining around them. A stained deck that falls apart next spring is not saved money.`,
        `**Honest recoat timeline.** We tell you when to expect the next recoat - 2-3 years for semi-transparent in full sun, 4-6 years for solid stain. No unrealistic warranty promises.`,
      ],
    },
  ],
  pricingNote: (loc) =>
    `Deck staining in ${loc.name} is priced per square foot with adjustments for railings, stairs, benches, and prior finish. Standard decks (200-400 sq ft) typically run $1.50-$3.50/sq ft fully prepped and stained - totaling $400-$1,400. Larger decks (500-800 sq ft) range $1,200-$2,800. Decks with elaborate railings, built-in benches, or multi-level designs trend higher. Stripping a previously painted deck to bare wood adds $1.50-$3/sq ft of labor. Pressure washing is included in all staining projects. Every deck staining estimate is free, itemized, and valid for 60 days.`,
  faqs: (loc) => [
    {
      question: `How much does deck staining cost in ${loc.name}, IL?`,
      answer: `Deck staining in ${loc.name} typically runs $1.50-$3.50/sq ft - totaling $400-$1,400 for a standard 200-400 sq ft deck or $1,200-$2,800 for larger 500-800 sq ft decks. Elaborate railings, benches, and multi-level designs add cost. Stripping a previously painted deck adds $1.50-$3/sq ft. Pressure washing prep is always included. Free itemized estimates valid 60 days.`,
    },
    {
      question: `How long does deck staining take in ${loc.name}?`,
      answer: `Most ${loc.name} decks are completed in 2-4 working days: pressure washing (day 1), 48-72 hours of drying (days 2-3), and stain application (day 3-4). Larger decks or decks requiring stripping take 4-7 days. We schedule around weather - stain cannot be applied if rain is forecast within 24 hours or if temperatures drop below 50°F for oil-based products.`,
    },
    {
      question: `What is the best time of year to stain a deck in ${loc.name}?`,
      answer: `Late spring through early fall in ${loc.name} - roughly May through early October. Wood must be dry (under 15% moisture content), surface temperature between 50°F and 90°F, no rain forecast for 24 hours after application, and not in direct hot sun during application. Fall (September-October) is often ideal: cooler temperatures mean slower drying and better penetration. We schedule ${loc.name} projects with weather windows built in.`,
    },
    {
      question: `Should I stain or paint my deck?`,
      answer: `For most ${loc.name} homeowners, we recommend stain over paint. Stain penetrates wood and wears gradually - requiring recoat but never peeling. Paint forms a film on wood and eventually peels, requiring aggressive stripping before the next paint job. Paint is appropriate only for decks that are already painted (continuing the cycle) or for specific design reasons. If your deck is currently unfinished or stained, stick with stain.`,
    },
    {
      question: `How often do I need to re-stain my deck?`,
      answer: `Depends on product type and exposure. Semi-transparent stains on horizontal deck boards in full ${loc.name} sun last 2-3 years before needing recoat. Semi-solid stains last 3-4 years. Solid stains last 4-6 years. Shaded or covered decks extend each timeline by 1-2 years. Railings and vertical surfaces typically last longer than horizontal boards. We provide a written care sheet predicting your specific deck's recoat window.`,
    },
    {
      question: `Do you also stain fences at the same time?`,
      answer: `Yes - pairing deck staining with [fence staining in ${loc.name}](/${loc.slug}/fence-staining) is one of our most popular bundles. Matching the stain color across deck and fence creates a coordinated outdoor look. We typically offer bundled pricing when both services are done together, saving 10-15% vs. separate projects.`,
    },
    {
      question: `Can you repair boards and fix popped nails during staining?`,
      answer: `Yes. We inspect every ${loc.name} deck before staining and itemize any needed carpentry repairs in the estimate - board replacement, popped fastener reseating or replacement, joist or ledger repair, railing tightening, stair tread replacement. Minor repairs are often done the same day; larger repairs add 1-2 days. Fixing issues before staining is always cheaper than staining around damage that fails next season.`,
    },
  ],
  keyTakeaways: (loc) => [
    `Professional deck staining in ${loc.name} includes calibrated pressure washing, wood brightening, drying, sanding, and two coats of species-appropriate stain`,
    `Semi-transparent stains show grain and last 2-3 years; solid stains hide grain and last 4-6 years - we explain the tradeoffs for your specific deck`,
    `Typical ${loc.name} pricing: $400-$1,400 for standard 200-400 sq ft decks, $1,200-$2,800 for 500-800 sq ft, more for elaborate railings`,
    `We match the correct stain system to species: cedar and redwood get semi-transparent; pressure-treated pine gets semi-solid or solid; tropical hardwoods get penetrating oils`,
    `Late spring through early fall (May-October) is optimal staining season in ${loc.name} - we schedule around weather windows`,
    `Composite decks (Trex, TimberTech) are cleaned, not stained - we use composite-specific protocols without damaging the material`,
    `Carpentry repairs are integrated into the project - board replacement, fastener issues, rot pockets addressed before staining`,
  ],
  relatedArticles: ["exterior-painting-preparation-guide", "exterior-painting-cost-guide-chicago-suburbs-2026"],
};

export const deckStainingContent: Record<string, LocationServiceContent> =
  locations.reduce<Record<string, LocationServiceContent>>((acc, loc) => {
    acc[loc.slug] = generateContent(loc, deckStainingBlueprint, { locationNameMap });
    return acc;
  }, {});
