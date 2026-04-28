import type { LocationServiceContent } from "./types";
import { locations } from "../business";
import { buildLocationNameMap, generateContent, type ServiceBlueprint } from "./generator";

const locationNameMap = buildLocationNameMap(locations);

const drywallRepairBlueprint: ServiceBlueprint = {
  serviceSlug: "drywall-repair",
  serviceName: "Drywall Repair",
  serviceNoun: "drywall repair",
  heroOpener: (city) =>
    `Professional drywall repair in ${city}, IL makes cracks, holes, water damage, and settling imperfections disappear - with matched texture, flush joints, and primer-ready surfaces that accept paint invisibly. D&D Pro Painting handles everything from nail-pop touch-ups to full wall section replacements, always preparing the surface so the paint that follows looks like the rest of the wall rather than an obvious patch.`,
  buildSections: (loc) => [
    {
      heading: `Nail Pops, Cracks, Holes, and Settling Damage in ${loc.name} Homes`,
      paragraphs: [
        `Every ${loc.name} home moves. Foundations settle over the first 5-10 years; seasonal humidity swings between 20% in winter and 70%+ in summer expand and contract wood framing; minor impacts and hung artwork create holes; and plumbing leaks, roof leaks, and humidity issues produce water-stained drywall that needs cutting out and replacing. Drywall repair is the most common single service request on the interior side of our business.`,
        `The typical ${loc.name} drywall service call addresses multiple issues at once: nail pops reseated and re-spackled; hairline cracks opened up and taped over with fiberglass mesh; small to medium holes patched with mesh-backed patches or California-patch drywall plugs; larger holes framed and drywalled fresh; water-damaged areas cut out, dried thoroughly, and replaced.`,
        `Every repair is followed by texture matching - the critical step most homeowners underestimate. A patched wall that reads flat against the surrounding textured surface is an obvious patch. Texture matching requires knowing the exact texture type (smooth, knockdown, orange peel, splatter, skip-trowel) and replicating it with the correct tools and technique.`,
      ],
    },
    {
      heading: `Popcorn Ceiling Repair and Texture Matching`,
      paragraphs: [
        `Popcorn ceilings (also called acoustic or cottage-cheese ceilings) are common in ${loc.name} homes built before 2000. Damage to popcorn ceilings - from water leaks, moving fixtures, or physical impacts - requires either matching the existing popcorn texture (difficult and increasingly rare due to declining texture material availability) or removing the popcorn entirely and going smooth.`,
        `If you have damaged popcorn in multiple spots, we often recommend full [popcorn ceiling removal in ${loc.name}](/${loc.slug}/popcorn-ceiling-removal) rather than trying to patch individual spots - because matched patches never look perfect and modern buyers strongly prefer smooth ceilings. Our popcorn removal service includes asbestos testing (required for pre-1980 homes), wet scrape, skim coat, and fresh [ceiling painting in ${loc.name}](/${loc.slug}/ceiling-painting).`,
        `For single small repairs, we can match popcorn texture using matching aerosol texture or sprayed texture applied with pressure pots. It's never invisible up close, but it's an option when full removal isn't in the budget.`,
      ],
    },
    {
      heading: `Water Damage, Settling Cracks, and Larger Repairs`,
      paragraphs: [
        `**Water damage.** Staining from roof leaks, plumbing leaks, or ice dams often indicates hidden mold or rot behind the drywall. Our process is: identify and confirm the water source is fixed; cut out the damaged drywall at least 6" beyond the visible stain; allow the cavity to dry (often with fans); inspect and treat framing if mold is present; install new drywall; tape, mud, texture match, and prime. Only primed stained drywall prevents tannin bleed-through after painting.`,
        `**Settling cracks along door and window frames.** These are chronic - they reopen seasonally even after a correct repair. We use paintable elastomeric crack sealant that flexes with seasonal movement rather than rigid joint compound that just cracks again.`,
        `**Tape seam failures.** Yellowing, curling, or bubbling tape seams indicate old installations where joint compound bond failed. We cut back the failed tape, re-mud, re-tape with fiberglass mesh, and refinish. Proper re-taping prevents the same failure from recurring.`,
        `**Large hole replacement.** Fist-sized and larger holes get proper framing support (new 1x2 backing strips attached to studs), new drywall cut to size, screwed in, and finished in 3 coats of progressively feathered joint compound to hide the seam completely.`,
      ],
    },
    {
      heading: `Ceiling and Wall Cracks After ${loc.name} Roof or Basement Work`,
      paragraphs: [
        `Homeowners in ${loc.name} often need drywall repair after unrelated work - a new roof creates attic movement that cracks ceilings; a basement finishing project creates drywall seams that telegraph through; a bathroom tile job leaves haze and small damage. We handle all of these as follow-on service and can coordinate directly with other contractors when needed.`,
        `After repair, we prime the affected area with a stain-blocking primer and apply one to two coats of ceiling or wall paint. For the best color match, we recommend repainting the entire wall or ceiling rather than just the patch - the cost difference is small and the visual result is dramatic. This is the biggest reason drywall repair pairs naturally with [interior painting in ${loc.name}](/${loc.slug}/interior-painting) - repair plus repaint looks factory-fresh.`,
        `For ceilings specifically, we often recommend bundling drywall repair with [ceiling painting in ${loc.name}](/${loc.slug}/ceiling-painting) as a single project so the patch and surrounding ceiling read as a single uniform surface.`,
      ],
    },
    {
      heading: `Why D&D Pro Painting for ${loc.name} Drywall Repair`,
      paragraphs: [
        `**Texture matching discipline.** Every repair is finished to match surrounding texture - smooth, knockdown, orange peel, skip-trowel, or sprayed popcorn. A patch that reads flat is a failed patch.`,
        `**Three-coat joint compound.** We apply three coats of progressively feathered joint compound on every seam, sanding smooth between coats. Quick one-coat patches look fine for a week, then show telegraphed seams forever.`,
        `**Integrated with painting.** Every drywall repair in ${loc.name} is followed by correct priming and available paint touch-up or full-wall/ceiling repaint. We are primarily a painting company - drywall repair exists to prepare for paint.`,
        `**Water damage expertise.** We know how to cut out stained drywall, assess underlying framing, treat for mold when present, and replace properly. Skipping steps means hidden problems return later.`,
        `**Honest scope.** We tell you when a patch is the right solution vs. when full section replacement is smarter. We also tell you when a ceiling is better fully replaced than patched. Honest scope saves money long-term.`,
      ],
    },
  ],
  pricingNote: (loc) =>
    `Drywall repair in ${loc.name} is priced by repair scope rather than flat rate. Small service calls (3-5 nail pops, 1-2 small holes, hairline crack touch-ups) run $175-$350 minimum service. Medium repairs (multiple holes up to 6", a settling crack, plus texture match) trend $350-$800. Water damage repair requiring cut-out and replacement of a 2' x 2' section runs $450-$900. Large sections (full wall or ceiling replacement) are quoted individually based on square footage, typically $2.50-$5/sq ft installed and finished. Priming is included; finish painting is quoted separately or bundled. Every drywall repair estimate is free, itemized, and valid for 60 days.`,
  faqs: (loc) => [
    {
      question: `How much does drywall repair cost in ${loc.name}, IL?`,
      answer: `Drywall repair in ${loc.name} typically starts at a $175-$350 minimum service call for small jobs (few nail pops, one or two small holes, hairline cracks). Medium repairs with multiple holes and texture matching run $350-$800. Water damage cut-and-replace work runs $450-$900 for a 2'x2' section. Large section replacement is quoted at $2.50-$5/sq ft installed and finished. Priming is always included. D&D Pro Painting provides free, itemized estimates valid for 60 days.`,
    },
    {
      question: `Can you match my existing wall texture?`,
      answer: `Yes - texture matching is the most important part of a professional repair. We match smooth walls (which require the most careful sanding and feathering), knockdown texture (applied with a knockdown knife after initial stipple), orange peel (sprayed with adjustable spray pattern), and skip-trowel (hand-troweled with a specific technique). Popcorn ceiling texture can be matched but rarely perfectly - for major popcorn ceiling damage, full removal is often a better option than patching.`,
    },
    {
      question: `How long will drywall repair take?`,
      answer: `Depends on scope. Small service calls (3-5 repairs, texture match, prime) are often completed in a single day. Medium repairs with multi-coat joint compound and sanding take 2-3 days because each coat must fully dry before the next. Water damage repairs with drying time for the cavity typically run 3-5 days. Large section or full wall/ceiling replacement takes 3-7 days. We schedule repairs around your availability and clean up thoroughly each day.`,
    },
    {
      question: `Will my repair be visible after paint?`,
      answer: `Not when done correctly. Three coats of feathered joint compound with proper sanding, correct texture match, and stain-blocking primer under matched paint color makes a repair invisible. The #1 reason repairs are visible is cheap one-coat patches or skipped texture matching. For best results, we recommend painting the full wall or ceiling rather than spot-touching; the cost difference is small and the result is dramatic. Pair drywall repair with [interior painting in ${loc.name}](/${loc.slug}/interior-painting) or [ceiling painting in ${loc.name}](/${loc.slug}/ceiling-painting) for factory-fresh results.`,
    },
    {
      question: `Do you handle water damage repairs?`,
      answer: `Yes, but with an important caveat: the water source must be fixed first. We cannot repair drywall over an active leak. Once the source is confirmed fixed (roof, plumbing, ice dam, etc.), we cut out the damaged drywall at least 6" beyond the visible stain, allow the cavity to dry thoroughly (often with fans), inspect framing for mold or rot, install new drywall, and finish through primer. If mold is present, remediation coordination is needed before we proceed.`,
    },
    {
      question: `Can you repair popcorn ceiling damage in ${loc.name}?`,
      answer: `For single small spots, yes - we can match popcorn texture with aerosol or sprayed texture. For multiple damaged areas, we strongly recommend full [popcorn ceiling removal in ${loc.name}](/${loc.slug}/popcorn-ceiling-removal) instead. Popcorn patches never look perfect up close, and modern buyers strongly prefer smooth ceilings. Removal for pre-1980 homes requires asbestos testing first. Full removal plus skim coat plus repaint typically runs $800-$2,500 per average room.`,
    },
  ],
  keyTakeaways: (loc) => [
    `Professional drywall repair in ${loc.name} includes three-coat feathered joint compound, correct texture match, and stain-blocking primer - not quick one-coat patches`,
    `Typical ${loc.name} pricing: $175-$350 minimum for small jobs, $350-$800 medium repairs, $2.50-$5/sq ft for large section replacement`,
    `Texture matching is the make-or-break step - smooth, knockdown, orange peel, skip-trowel, and popcorn each require different tools and technique`,
    `Water damage repair requires cut-and-replace (6" beyond visible stain) plus cavity drying plus mold check - not just surface covering`,
    `Drywall repair pairs naturally with full-wall or full-ceiling repainting for factory-fresh results; spot touch-ups often show subtly`,
    `Damaged popcorn ceilings are often better fully removed than patched - we offer complete popcorn removal with skim coat and fresh ceiling paint`,
    `Settling cracks around door/window frames need paintable elastomeric sealant (flexes seasonally) rather than rigid joint compound that will re-crack`,
  ],
  relatedArticles: ["interior-painting-cost-guide-chicago-suburbs", "whole-home-interior-painting-timeline"],
};

export const drywallRepairContent: Record<string, LocationServiceContent> =
  locations.reduce<Record<string, LocationServiceContent>>((acc, loc) => {
    acc[loc.slug] = generateContent(loc, drywallRepairBlueprint, { locationNameMap });
    return acc;
  }, {});
