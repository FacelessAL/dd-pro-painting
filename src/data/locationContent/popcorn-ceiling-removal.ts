import type { LocationServiceContent } from "./types";
import { locations } from "../business";
import { buildLocationNameMap, generateContent, type ServiceBlueprint } from "./generator";

const locationNameMap = buildLocationNameMap(locations);

const popcornBlueprint: ServiceBlueprint = {
  serviceSlug: "popcorn-ceiling-removal",
  serviceName: "Popcorn Ceiling Removal",
  serviceNoun: "popcorn ceiling removal",
  heroOpener: (city) =>
    `Professional popcorn ceiling removal in ${city}, IL modernizes any home instantly - eliminating dated texture that collects decades of dust, smoke, and allergens while making every room feel taller, brighter, and more valuable. D&D Pro Painting offers full-service popcorn removal: asbestos testing for pre-1980 homes, dust-controlled wet-scrape removal, skim-coat smoothing, priming, and two coats of premium flat ceiling paint.`,
  buildSections: (loc) => [
    {
      heading: `Popcorn Ceiling Removal & Smoothing in ${loc.name}, IL`,
      paragraphs: [
        `Popcorn ceilings - also called acoustic texture or cottage cheese ceilings - were installed in millions of American homes from the 1950s through the 1990s. In ${loc.name}, thousands of ranch, split-level, and colonial homes still have original popcorn texture that dates interiors dramatically and collects decades of dust, smoke, cooking grease, and allergens that no amount of cleaning can remove.`,
        `The solution is full popcorn ceiling removal followed by smooth refinishing - a specialty service D&D Pro Painting performs regularly for ${loc.name} homeowners. A single popcorn ceiling removed and refinished transforms a room as much as new flooring or new cabinets, at considerably less cost.`,
        `Our process is dust-controlled, code-compliant, and produces a finished smooth ceiling ready for paint that looks factory-installed. For pre-1980 ${loc.name} homes we perform asbestos testing before any disturbance - a critical safety step that low-bid scraping services skip.`,
      ],
    },
    {
      heading: `Our ${loc.name} Popcorn Ceiling Removal Process`,
      paragraphs: [
        `**Step 1 - Asbestos Testing (Pre-1980 Homes).** ${loc.name} homes built before 1980 may contain asbestos in original popcorn texture. Before any disturbance we collect a small sample and send it to a certified lab. Results typically come back within 3-5 business days. If asbestos is detected, we coordinate with a licensed abatement contractor for safe removal; if not, we proceed with our standard removal process. This testing is affordable insurance against a real health and liability hazard.`,
        `**Step 2 - Room Preparation.** We remove all furniture from the room or cover and relocate it to the room center. Flooring is covered with heavy-duty plastic sheeting (not just drop cloths - popcorn removal is messy). Walls are masked with plastic to protect paint and trim. HVAC vents are covered to prevent dust migration throughout your ${loc.name} home.`,
        `**Step 3 - Wet-Scrape Removal.** We mist the popcorn texture lightly with water, allow it to absorb for 10-15 minutes, then scrape it off with wide putty knives. Wet-scraping dramatically reduces airborne dust compared to dry scraping. The popcorn material is bagged and disposed of per local regulations.`,
        `**Step 4 - Skim Coating and Smoothing.** Once popcorn is removed, the underlying ceiling drywall often shows seams, nail pops, and minor imperfections. We skim coat the entire ceiling with joint compound to produce a flat, uniform smooth surface. Depending on ceiling condition this may require 2-3 skim coats with drying time between each.`,
        `**Step 5 - Sanding and Priming.** The smoothed ceiling is sanded flat with pole sanders and then primed with a stain-blocking primer to seal the compound and provide a uniform base for paint.`,
        `**Step 6 - Two Coats of Premium Flat Ceiling Paint.** Two coats of specialty ceiling paint deliver the final smooth finish. We use premium products engineered for ceiling application - extended wet-edge time, ultra-flat sheen, and no-spatter formulation.`,
        `**Step 7 - Cleanup and Walkthrough.** We clean up every bit of dust and debris, vacuum floors with HEPA equipment, remove masking, restore the room, and walk through the finished result with you.`,
      ],
    },
    {
      heading: `Why ${loc.name} Homeowners Remove Popcorn Ceilings`,
      paragraphs: [
        `**Modernization.** Popcorn texture is the single most dating interior element in most ${loc.name} homes. Removing it visually advances your home 20-30 years. Smooth ceilings are the contemporary standard in every new-construction ${loc.name} subdivision.`,
        `**Resale Value.** Real estate agents consistently report that homes with popcorn ceilings sell for less and slower than comparable homes with smooth ceilings. In the competitive ${loc.name} real estate market, popcorn removal is a high-ROI pre-sale investment.`,
        `**Indoor Air Quality.** Popcorn texture is porous and retains decades of dust, smoke, cooking grease, pet dander, and allergens that no cleaning can extract. Removing it improves indoor air quality dramatically - often noticed within 1-2 weeks by allergy sufferers.`,
        `**Brighter Rooms.** Smooth painted ceilings reflect significantly more light than textured ceilings. Rooms feel noticeably brighter after popcorn removal - particularly with modern LED lighting.`,
        `**Better Paint Results.** Smooth ceilings take paint uniformly with no texture-induced sheen variation or lap marks. Painted popcorn ceilings never look as clean as smooth ones.`,
        `**Pre-Renovation Prep.** Before any major ${loc.name} home renovation involving ceiling work (new lighting, HVAC changes, room opening), removing popcorn creates a clean slate for new finishes.`,
      ],
    },
    {
      heading: `What Popcorn Ceiling Removal Costs in ${loc.name}`,
      paragraphs: [
        `Popcorn ceiling removal in ${loc.name} typically runs $2.50-$5 per square foot, depending on ceiling height, asbestos-testing requirements, substrate condition, and accessibility. A standard 12x14 ${loc.name} bedroom (168 sq ft of ceiling) typically runs $500-$800 for complete removal, skim-coat, prime, and two coats of paint. Whole-first-floor popcorn removal (living, dining, kitchen, hallway in an average 1,200 sq ft layout) runs $3,000-$5,500.`,
        `Variables that increase cost include asbestos abatement (if testing is positive; quoted separately with licensed abatement contractor), vaulted or tall ceilings requiring scaffolding, heavily stained popcorn requiring extra priming, and severely damaged underlying drywall requiring extensive repair or replacement. Variables that reduce cost include removing popcorn as part of a larger interior painting project (economies of setup), single-room projects that contain the mess, and ceilings that are already in relatively sound condition underneath the texture.`,
        `Popcorn removal typically pays for itself within 1-3 years when the home sells. We provide free in-home assessments that include a visual inspection, rough square footage calculation, and transparent pricing. Every estimate is itemized and valid for 60 days.`,
      ],
    },
    {
      heading: `Why D&D Pro Painting for ${loc.name} Popcorn Removal`,
      paragraphs: [
        `**Asbestos-aware.** We test pre-1980 ${loc.name} homes before any disturbance. Low-bid scrape-and-paint services frequently skip this step - exposing homeowners and crews to serious health risk. We do it right every time.`,
        `**Dust-controlled wet-scrape method.** Our wet-scrape removal process dramatically reduces airborne dust compared to dry scraping. Your ${loc.name} home stays cleaner throughout the project.`,
        `**Proper skim-coating.** We do not just scrape and paint. We skim-coat, sand flat, and prime before finish coats - delivering a factory-smooth ceiling rather than a scraped-and-painted surface with visible imperfections.`,
        `**Full cleanup.** We clean every bit of dust from every surface in the affected room and adjacent areas using HEPA vacuums. Your ${loc.name} home is returned to you cleaner than before the project started.`,
        `**Warranty-backed.** Every ${loc.name} popcorn ceiling removal project includes a written workmanship warranty on the smooth finish.`,
      ],
    },
  ],
  pricingNote: (loc) =>
    `Popcorn ceiling removal in ${loc.name} typically runs $2.50-$5 per square foot for complete removal, skim-coat, prime, and two coats of paint. A standard bedroom ceiling costs $500-$800. Whole-first-floor popcorn removal in an average ${loc.name} home runs $3,000-$5,500. Variables include asbestos testing (required for pre-1980 homes and always recommended), ceiling height (vaulted or tall ceilings require scaffolding), substrate condition (severely damaged underlying drywall adds repair cost), and how much furniture moving is needed. Popcorn removal is often bundled with whole-room or whole-home interior painting for efficiency. Every estimate is free, itemized, and valid for 60 days.`,
  faqs: (loc) => [
    {
      question: `How much does popcorn ceiling removal cost in ${loc.name}, IL?`,
      answer: `Popcorn ceiling removal in ${loc.name} runs $2.50-$5 per square foot for complete removal, skim-coat, prime, and two coats of premium flat ceiling paint. A single bedroom ceiling costs $500-$800, and whole-first-floor removal in an average ${loc.name} home runs $3,000-$5,500. Asbestos testing (recommended for pre-1980 homes) is a separate $75-$150 test. Positive asbestos results require licensed abatement, quoted separately.`,
    },
    {
      question: `Does my ${loc.name} popcorn ceiling contain asbestos?`,
      answer: `If your home was built before 1980, possibly - popcorn texture installed between 1950 and 1980 commonly contained asbestos for its fire-resistant and acoustic properties. Homes built 1980-1990 have lower probability but should still be tested. Homes built after 1990 have very low probability. We always recommend testing before any disturbance. Testing costs $75-$150 and takes 3-5 business days for results. This is affordable insurance against a serious health hazard.`,
    },
    {
      question: `How long does popcorn ceiling removal take?`,
      answer: `A single ${loc.name} bedroom ceiling runs 2-3 working days including wet-scrape removal, skim-coating (multiple coats with drying between), sanding, priming, and two coats of paint. Whole-first-floor removal runs 5-8 working days. Asbestos-positive ceilings require abatement before our work can begin, adding 1-2 weeks depending on abatement contractor availability.`,
    },
    {
      question: `Is popcorn ceiling removal messy?`,
      answer: `Yes - popcorn removal is inherently messy. That is why we use comprehensive dust-control protocols: heavy plastic floor sheeting, wall masking, HVAC vent covering, and wet-scrape methods that dramatically reduce airborne dust versus dry scraping. We HEPA-vacuum all surfaces at project completion. Your ${loc.name} home will be cleaner at the end than it was at the start. Just plan to stay out of the affected room during active work days.`,
    },
    {
      question: `Can I just paint over my popcorn ceiling instead of removing it?`,
      answer: `You can, but we rarely recommend it. Painted popcorn ceilings still look textured and dated - and the texture continues to collect dust and allergens. Once painted with thick paint, popcorn texture becomes harder and more expensive to remove later because the paint seals the texture and wet-scraping no longer works. If you plan to remove popcorn someday, it is less expensive to do it before painting than after.`,
    },
    {
      question: `Do you offer asbestos abatement in ${loc.name}?`,
      answer: `We do not perform asbestos abatement in-house - it requires specific state licensing and specialized equipment. If your popcorn tests positive for asbestos, we coordinate with a licensed abatement contractor in ${loc.name} for the removal phase, then return to complete the skim-coating, priming, and painting. We handle all project management so you have a single point of contact throughout.`,
    },
  ],
  keyTakeaways: (loc) => [
    `Popcorn ceiling removal in ${loc.name} modernizes your home instantly - eliminating dust-trapping texture and making rooms feel taller, brighter, and more valuable`,
    `We perform asbestos testing on pre-1980 ${loc.name} homes before any disturbance - a critical safety step low-bid services frequently skip`,
    `Our wet-scrape method minimizes airborne dust; skim-coating produces a factory-smooth ceiling rather than a scraped-and-painted surface`,
    `Cost typically runs $2.50-$5 per square foot; standard bedroom $500-$800; whole first floor $3,000-$5,500`,
    `Timeline runs 2-3 days per bedroom; 5-8 working days for whole first floor; asbestos-positive ceilings add 1-2 weeks for abatement`,
    `Popcorn removal is a high-ROI pre-sale investment in the competitive ${loc.name} real estate market - smooth ceilings sell faster for more`,
    `Every ${loc.name} project includes HEPA cleanup and written workmanship warranty`,
  ],
  relatedArticles: ["how-to-choose-interior-paint-colors", "benefits-of-professional-painting-vs-diy"],
};

export const popcornCeilingRemovalContent: Record<string, LocationServiceContent> =
  locations.reduce<Record<string, LocationServiceContent>>((acc, loc) => {
    acc[loc.slug] = generateContent(loc, popcornBlueprint, { locationNameMap });
    return acc;
  }, {});
