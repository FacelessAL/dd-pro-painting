import type { LocationServiceContent } from "./types";
import { locations } from "../business";
import { buildLocationNameMap, generateContent, type ServiceBlueprint } from "./generator";

const locationNameMap = buildLocationNameMap(locations);

const fenceStainingBlueprint: ServiceBlueprint = {
  serviceSlug: "fence-staining",
  serviceName: "Fence Staining & Painting",
  serviceNoun: "fence staining",
  heroOpener: (city) =>
    `Professional fence staining in ${city}, IL protects wood from UV damage, moisture absorption, insect attack, and the freeze-thaw cycle that opens grain and splits boards. D&D Pro Painting preps every fence with proper washing and brightening, then applies two coats of species-appropriate stain that dramatically extends fence life and restores the warm tone wood loses within months of installation.`,
  buildSections: (loc) => [
    {
      heading: `Cedar, Pressure-Treated Pine, and Composite Fence Staining in ${loc.name}`,
      paragraphs: [
        `Fences in ${loc.name} face the same Illinois weather extremes as decks but have one advantage: they are mostly vertical, which sheds water faster and reduces UV hours compared to horizontal deck boards. An unstained cedar fence in ${loc.name} will silver within 6-12 months, cup and split within 3-5 years, and begin visibly deteriorating within 7-10 years. A properly stained cedar fence can push that failure point past 15-20 years.`,
        `Cedar is the most popular premium fence material in ${loc.name} - naturally rot-resistant, accepts stain beautifully, ages well when maintained. Pressure-treated pine fences (the most common "economy" fence) require 6-12 months of weathering before first staining to let treatment chemicals leach out and the wood dry sufficiently. Composite fences (like Trex Seclusions and similar) are not stained; they are cleaned periodically and come with integrated long-term color warranties.`,
        `D&D Pro Painting specifies the correct stain based on your fence's age, species, and prior finish. Semi-transparent stains (most popular for cedar) show grain and require recoat every 3-4 years. Semi-solid stains cover some imperfections and last 4-5 years. Solid stains hide grain entirely and last 5-7 years. Each has a role - we help you choose.`,
      ],
    },
    {
      heading: `Our ${loc.name} Fence Staining Process`,
      paragraphs: [
        `**Phase 1 - Fence inspection.** We walk the full fence line in ${loc.name}, noting loose boards, leaning posts, broken pickets, rot at ground contact points, popped nails, and gate-hardware issues. Carpentry repairs are itemized separately so you know exactly what is being fixed during the project.`,
        `**Phase 2 - Pressure washing and brightening.** We [pressure wash in ${loc.name}](/${loc.slug}/pressure-washing) each fence panel at wood-appropriate pressure with deck-and-fence cleaner, followed by wood brightener to neutralize and restore natural color. This step alone dramatically changes how a gray, weathered fence looks - before any stain is applied.`,
        `**Phase 3 - Drying and sanding.** Wood must reach below 15% moisture content (verified with a moisture meter) before staining. Raised or fuzzed grain is lightly sanded smooth. Protruding fasteners are reseated.`,
        `**Phase 4 - Stain application.** Two coats applied with a combination of airless spray for speed and brush-back technique for even penetration. Spray-only application leaves lap marks and puddles; brush-only is impractical for long fence runs. Professionals use both tools at the right moments.`,
        `**Phase 5 - Gates, posts, and hardware.** Gate hinges, latches, and post caps get individual attention - including re-tensioning of sagging gates and replacement of rusted hardware when requested. A fence that swings properly is a fence that gets used.`,
      ],
    },
    {
      heading: `Fence Stain Colors and Finishes`,
      paragraphs: [
        `**Natural cedar tones.** The most popular choice for cedar fences in ${loc.name} - honey-amber semi-transparent stains that warm up after application and weather slowly to rich browns.`,
        `**Warm browns and chestnut.** Pair beautifully with brick homes and warm-toned landscape materials. These semi-solid stains cover some of the green tint in pressure-treated pine and add visual warmth.`,
        `**Black and espresso.** Increasingly popular for modern and contemporary ${loc.name} homes. Solid-stain black fences make landscaping pop and create a sophisticated backdrop. Long-wearing: 5-7 years before recoat.`,
        `**Gray and weathered tones.** For homeowners who want an intentional "weathered" look without the damage of unfinished weathering. Driftwood and pebble-gray semi-transparents provide protection while delivering the aesthetic.`,
        `**White solid stain.** Classic picket-fence look for traditional ${loc.name} homes. Requires more frequent recoating than darker colors (4-5 years) but offers unmatched curb appeal in the right setting.`,
      ],
    },
    {
      heading: `Privacy Fences, Picket Fences, and Specialty Fence Types`,
      paragraphs: [
        `**Privacy fences (6-foot cedar or treated pine).** The most common ${loc.name} fence type and the largest surface area to stain. Pricing is linear-foot based; typical 100-foot runs trend $800-$1,800 fully prepped and stained both sides. Staining only the "front" (neighbor-facing) side to save cost is not recommended - unstained back sides fail faster and pull moisture through boards.`,
        `**Picket fences (3-4 foot).** Lower linear-foot cost but higher per-foot-of-wood cost because all the pickets, caps, and rails are individual elements needing careful coverage. Popular white solid stain looks classic; semi-transparent honey shows cedar grain beautifully.`,
        `**Split-rail and ranch fences.** Often stained with semi-transparent rustic tones to highlight the rough-hewn character. Popular in larger properties on ${loc.county}'s western edge.`,
        `**Chain-link and metal fences.** We do not stain these, but we paint them when requested - using rust-inhibiting metal primer and exterior enamel in black or bronze to transform utilitarian chain-link into a more polished look. This is a different service category.`,
      ],
    },
    {
      heading: `Why D&D Pro Painting for ${loc.name} Fence Staining`,
      paragraphs: [
        `**Bundle pricing with deck staining.** Pairing [deck staining in ${loc.name}](/${loc.slug}/deck-staining) with fence staining saves 10-15% vs. separate projects and lets us coordinate colors across both surfaces.`,
        `**Correct prep.** Pressure washing and brightening are mandatory before we stain. A stained fence over dirty wood fails in months; a stained fence over properly prepped wood lasts 4-7 years.`,
        `**Spray + brush technique.** Airless spray for speed, brush-back for penetration and even coverage. Neither tool alone does the job professionally.`,
        `**Carpentry integration.** We fix loose boards, leaning posts, and gate issues during the project rather than staining around damage.`,
        `**Full-fence or selective.** Need only a section of a long fence stained? We can coordinate color and finish so repairs blend with the rest. A complete full-fence restain is typically cheaper per foot, but we will work with any scope.`,
      ],
    },
  ],
  pricingNote: (loc) =>
    `Fence staining in ${loc.name} is priced per linear foot with adjustments for fence height, stain type, and prior finish. Standard 6-foot privacy fences (both sides, fully prepped) run $8-$18 per linear foot - so a 100-foot fence trends $800-$1,800 and a 200-foot fence $1,600-$3,600. Picket fences run $6-$12 per linear foot depending on complexity. Stripping previously painted fences adds $3-$6 per foot. Pressure washing is always included. Bundled deck-and-fence projects save 10-15%. Every fence staining estimate is free, itemized, and valid for 60 days.`,
  faqs: (loc) => [
    {
      question: `How much does fence staining cost in ${loc.name}, IL?`,
      answer: `Fence staining in ${loc.name} typically runs $8-$18 per linear foot for a standard 6-foot privacy fence stained both sides with full prep. A 100-foot fence trends $800-$1,800; 200-foot fence $1,600-$3,600. Picket fences run $6-$12/foot. Stripping previously painted fences adds $3-$6/foot. Pressure washing prep is always included. Bundled deck-and-fence projects save 10-15%. Free itemized estimates valid 60 days.`,
    },
    {
      question: `How long does fence staining take in ${loc.name}?`,
      answer: `Most ${loc.name} fences are completed in 2-5 working days depending on length and condition: pressure washing (day 1), 48-72 hours drying (days 2-3), and stain application (days 3-5). 100-foot fences often finish in 3 days total; 300+ foot fences take 5-7 days. Carpentry repairs can extend the timeline by 1-2 days. Weather windows must allow 24 hours of dry conditions after staining.`,
    },
    {
      question: `Should I stain both sides of my fence?`,
      answer: `Yes, for best protection and longevity. Staining only the "front" side means the back side weathers rapidly, absorbs moisture, and pulls that moisture through the boards - eventually failing the stained side prematurely. Both-side staining roughly doubles the cost but extends fence life by 2-3x. If budget forces one-side-only, we recommend the side that gets more sun exposure.`,
    },
    {
      question: `What's the best fence stain color for my ${loc.name} home?`,
      answer: `Depends on your home's exterior palette, landscape, and personal preference. Natural cedar semi-transparent is the most popular for cedar fences - shows grain, ages gracefully. Black and espresso solid stains are trending for modern ${loc.name} homes with white siding or dark trim. Chestnut and warm brown semi-solid complement brick homes. We bring color samples on-site so you can see options in natural light against your specific home and landscape.`,
    },
    {
      question: `How often does a stained fence need recoating?`,
      answer: `Depends on stain type and exposure. Semi-transparent stains last 3-4 years on ${loc.name} fences in full sun. Semi-solid stains last 4-5 years. Solid stains last 5-7 years. Shaded or partially protected fences extend each timeline by 1-2 years. We provide a written care sheet with your project predicting your specific fence's recoat window - so you can budget ahead.`,
    },
    {
      question: `Do you also stain decks at the same time?`,
      answer: `Yes - combining [deck staining in ${loc.name}](/${loc.slug}/deck-staining) with fence staining is one of our most popular bundles. We coordinate stain colors across both surfaces for a unified outdoor look, and bundled pricing typically saves 10-15% vs. separate projects. Combining is especially smart if both surfaces need work - we mobilize once, wash both surfaces together, and schedule staining in sequence.`,
    },
  ],
  keyTakeaways: (loc) => [
    `Professional fence staining in ${loc.name} extends fence life 2-3x vs. unstained wood - from 7-10 years to 15-20+ years`,
    `Proper prep (pressure washing and brightening) is mandatory - stain over dirty wood fails within months`,
    `Typical ${loc.name} pricing: $8-$18 per linear foot for 6-foot privacy fences both sides fully prepped`,
    `Semi-transparent stains show grain and last 3-4 years; semi-solid 4-5 years; solid 5-7 years - we help you choose`,
    `Staining both sides protects against moisture absorption that would prematurely fail a one-side-only project`,
    `Bundling fence staining with deck staining saves 10-15% and coordinates color across your outdoor spaces`,
    `Carpentry repairs (loose boards, leaning posts, gate issues) are integrated into the project rather than stained around`,
  ],
  relatedArticles: ["exterior-painting-preparation-guide", "exterior-painting-cost-guide-chicago-suburbs-2026"],
};

export const fenceStainingContent: Record<string, LocationServiceContent> =
  locations.reduce<Record<string, LocationServiceContent>>((acc, loc) => {
    acc[loc.slug] = generateContent(loc, fenceStainingBlueprint, { locationNameMap });
    return acc;
  }, {});
