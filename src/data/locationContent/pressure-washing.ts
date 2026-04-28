import type { LocationServiceContent } from "./types";
import { locations } from "../business";
import { buildLocationNameMap, generateContent, type ServiceBlueprint } from "./generator";

const locationNameMap = buildLocationNameMap(locations);

const pressureWashingBlueprint: ServiceBlueprint = {
  serviceSlug: "pressure-washing",
  serviceName: "Pressure Washing",
  serviceNoun: "pressure washing",
  heroOpener: (city) =>
    `Professional pressure washing in ${city}, IL removes decades of dirt, mildew, pollen, and oxidation from siding, concrete, brick, and wood - restoring curb appeal in a single day and extending the life of the surfaces below. D&D Pro Painting uses calibrated soft-wash systems for siding and higher-pressure surface cleaners for driveways, patios, and garage slabs so no substrate is damaged.`,
  buildSections: (loc) => [
    {
      heading: `House Washing, Soft Wash, and Siding Cleaning in ${loc.name}, IL`,
      paragraphs: [
        `Vinyl, aluminum, fiber cement, wood, and composite siding in ${loc.name} accumulate a visible film of atmospheric dirt, airborne pollen from the oak canopy across ${loc.county}, mildew colonies on shaded north elevations, and black algae streaks below gutter overflow points. The difference between a bright, crisp ${loc.name} home and a dingy-looking one is often one afternoon of professional soft washing - not a new exterior paint job.`,
        `D&D Pro Painting uses a soft-wash approach on siding: low pressure (under 500 PSI at the surface) combined with a biodegradable cleaning solution that kills mildew, algae, and bacteria at the root rather than just blasting the surface stain away. Mildew sprayed off with high pressure alone returns within weeks; mildew treated with the correct chemistry and rinsed gently stays gone for 2-3 years.`,
        `Soft washing is the correct prep before any exterior repaint. If you are planning [exterior painting in ${loc.name}](/${loc.slug}/exterior-painting), pressure washing (done right) is the first day of that project. Paint applied over dirt, chalked oxidation, or live mildew will fail within 12-18 months regardless of product quality.`,
      ],
    },
    {
      heading: `Driveway, Patio, Walkway, and Concrete Pressure Washing`,
      paragraphs: [
        `Concrete driveways, stamped patios, pavers, and garage slabs in ${loc.name} collect oil drips, tire rubber, leaf tannins, organic staining from the heavy ${loc.county} tree cover, and embedded dirt that a garden hose cannot touch. We use surface cleaner attachments (the spinning disc that fits over the concrete) to clean evenly without the striping, etching, or zebra marks you get from a wand used alone.`,
        `For concrete, we also carry degreasers for oil-stained garage slabs and a rust remover for irrigation-related staining. Pavers are cleaned gently and re-sanded with polymeric sand as an optional add-on. Stamped or colored concrete is cleaned at lower pressure to preserve the color.`,
        `Many ${loc.name} homeowners bundle driveway pressure washing with a garage floor refresh via our [epoxy flooring service in ${loc.name}](/${loc.slug}/epoxy-flooring) - a before-and-after transformation that takes a weekend.`,
      ],
    },
    {
      heading: `Deck and Fence Pressure Washing & Stain Prep`,
      paragraphs: [
        `Wood decks and cedar fences in ${loc.name} require specific pressure and technique. Too much pressure fuzzes the wood grain, raises fibers, and leaves permanent gouges; too little pressure fails to open the pores for stain penetration. We use calibrated pressure (typically 1,500-2,200 PSI on wood) combined with a wood-safe cleaner and brightener to restore the natural color before staining.`,
        `Pressure washing is the required first step before our [deck staining service in ${loc.name}](/${loc.slug}/deck-staining) or [fence staining in ${loc.name}](/${loc.slug}/fence-staining). Stain applied over dirty wood bonds poorly and fails early. Wood must be thoroughly washed, brightened, allowed to dry 2-3 days, and then stained while still receptive.`,
        `Composite decking (Trex, TimberTech, Fiberon) is pressure washed at low settings with composite-safe cleaner - never with bleach, which can discolor the material permanently. We know the correct protocol for every ${loc.name} deck we encounter.`,
      ],
    },
    {
      heading: `Gutter, Roof, and Specialty Surface Washing`,
      paragraphs: [
        `Gutter exterior faces accumulate vertical black streaks from oxidation and tiger striping that no garden hose removes. We use a specific gutter-cleaning detergent and soft brushes that restore the original white or bronze finish. Gutter interior cleaning (removing leaves and debris) is offered as a separate service bundled with exterior wash when requested.`,
        `Roof soft washing is offered for asphalt shingle roofs with visible black streaks from gloeocapsa magma algae. We never pressure wash a roof - shingles cannot handle it. We apply a roof-safe sodium hypochlorite solution that kills the algae at the root; rain rinses it. Most ${loc.name} homes with visible roof streaks see dramatic improvement within 2-4 weeks as the algae dies and sloughs off.`,
        `Brick, stone, stamped concrete, pool decks, and painted surfaces each get their own pressure and chemistry. We never use one-size-fits-all settings - that is how lesser contractors damage substrates.`,
      ],
    },
    {
      heading: `Why D&D Pro Painting for ${loc.name} Pressure Washing`,
      paragraphs: [
        `**Correct pressure for every substrate.** Soft washing for siding, medium pressure for wood, surface-cleaner discs for concrete, chemistry-only for roofs. We never damage what we clean.`,
        `**Pre-paint prep expertise.** Pressure washing is the single most important prep step before any [exterior painting](/${loc.slug}/exterior-painting) project. We wash the way it needs to be done for paint to bond and last 10-15 years.`,
        `**Biodegradable chemistry.** Our cleaning solutions are safe for plants, pets, and kids. We pre-wet landscaping before we start and rinse it thoroughly when finished.`,
        `**Fully insured and licensed.** Every ${loc.name} pressure washing project is covered by our commercial liability insurance. Many contractors working weekends with rented equipment are not.`,
        `**Bundled pricing for multiple surfaces.** Combining house, driveway, patio, and deck washing into a single visit saves 15-25% vs. scheduling them separately.`,
      ],
    },
  ],
  pricingNote: (loc) =>
    `Pressure washing in ${loc.name} is priced by surface type and square footage. A standard single-story home wash runs $250-$400. Two-story homes trend $400-$650. Driveway cleaning runs $150-$350 depending on size. Stamped patios are $200-$500. Decks and fences are priced by linear foot when combined with staining prep. Full exterior bundles (house + driveway + patio + deck prep) typically save 15-25% vs. individual services. Every pressure washing estimate is free, itemized, and valid for 60 days.`,
  faqs: (loc) => [
    {
      question: `How much does pressure washing cost in ${loc.name}, IL?`,
      answer: `Pressure washing in ${loc.name} typically runs $250-$400 for a single-story house wash and $400-$650 for a two-story home. Driveways are $150-$350 depending on size. Full exterior bundles (house + driveway + patio + walkways) range $500-$1,100 and save 15-25% vs. scheduling surfaces separately. D&D Pro Painting provides free, itemized estimates valid for 60 days.`,
    },
    {
      question: `Will pressure washing damage my siding or plants?`,
      answer: `Not when done correctly. We use soft-wash technique (under 500 PSI at the surface) on all siding - vinyl, aluminum, fiber cement, and wood. High pressure is only used on hard surfaces like concrete driveways with a surface-cleaner disc that distributes pressure evenly. Before starting, we pre-wet all landscaping and rinse thoroughly afterward to dilute any runoff. Our biodegradable cleaning solutions are plant-, pet-, and kid-safe.`,
    },
    {
      question: `Is pressure washing really needed before painting?`,
      answer: `Yes - and it is the single most important prep step. Exterior paint will not bond to dirt, chalked oxidation, pollen, or live mildew. Professional pressure washing removes all of those, kills mildew at the root so it cannot grow back under the new paint, and opens the substrate pores so primer and finish coats penetrate properly. If you are planning [exterior painting in ${loc.name}](/${loc.slug}/exterior-painting), pressure washing is included as day one of that project.`,
    },
    {
      question: `How often should I pressure wash my ${loc.name} home?`,
      answer: `Most ${loc.name} homes benefit from a house wash every 2-3 years to prevent mildew buildup and keep siding bright. Driveways and concrete patios benefit from annual or every-other-year cleaning, especially if you have trees dropping tannins on them. Wood decks and fences should be washed every 1-2 years as part of their staining maintenance cycle. Homes under heavy tree canopy in ${loc.county} may need more frequent washing than open-lot properties.`,
    },
    {
      question: `Can you soft wash my roof to remove black streaks?`,
      answer: `Yes. Those black streaks are gloeocapsa magma algae and they affect most asphalt-shingle roofs in ${loc.name} after 8-10 years. We apply a roof-safe sodium hypochlorite solution at low pressure - never high pressure, which would damage shingle granules. Rain rinses the treatment. Most roofs see dramatic improvement within 2-4 weeks as the algae dies and sloughs off. A typical ${loc.name} roof soft-wash runs $400-$750.`,
    },
    {
      question: `Do you pressure wash composite decks and Trex?`,
      answer: `Yes, but only at low pressure with composite-safe cleaner - never with bleach, which can permanently discolor composite decking. Composite materials including Trex, TimberTech, and Fiberon have specific manufacturer cleaning protocols and we follow them. Cleaning composite decks restores their color and removes mildew without damaging the material.`,
    },
  ],
  keyTakeaways: (loc) => [
    `Professional pressure washing in ${loc.name} uses soft-wash technique on siding (under 500 PSI) and surface cleaners on concrete - never one-size-fits-all pressure`,
    `Pressure washing is the required first step before exterior painting, deck staining, or fence staining - paint and stain will not bond over dirt or mildew`,
    `Typical ${loc.name} pricing: house wash $250-$650, driveway $150-$350, full exterior bundle $500-$1,100 (saves 15-25%)`,
    `Our biodegradable cleaning chemistry kills mildew at the root so it does not return within weeks - pressure alone is not enough`,
    `Roof soft washing at low pressure with sodium hypochlorite removes black algae streaks safely - high pressure damages shingles`,
    `Composite decks require composite-specific cleaners and low pressure - we know the correct protocol for every deck material`,
    `Most ${loc.name} homes benefit from a full exterior wash every 2-3 years to preserve curb appeal and extend surface life`,
  ],
  relatedArticles: ["exterior-painting-preparation-guide", "exterior-painting-cost-guide-chicago-suburbs-2026"],
};

export const pressureWashingContent: Record<string, LocationServiceContent> =
  locations.reduce<Record<string, LocationServiceContent>>((acc, loc) => {
    acc[loc.slug] = generateContent(loc, pressureWashingBlueprint, { locationNameMap });
    return acc;
  }, {});
