import type { LocationServiceContent } from "./types";
import { locations } from "../business";
import { buildLocationNameMap, generateContent, type ServiceBlueprint } from "./generator";

const locationNameMap = buildLocationNameMap(locations);

const cabinetBlueprint: ServiceBlueprint = {
  serviceSlug: "cabinet-painting",
  serviceName: "Cabinet Painting",
  serviceNoun: "cabinet painting",
  heroOpener: (city) =>
    `Professional cabinet painting in ${city}, IL transforms dated kitchens and bathrooms at 30-50 percent of replacement cost - and when done correctly, delivers a factory-grade finish that lasts 10-15 years. D&D Pro Painting specializes in cabinet refinishing with a full spray process: degreasing, sanding, bonding primer, and two coats of cabinet-grade urethane or acrylic enamel in the color of your choice.`,
  buildSections: (loc) => [
    {
      heading: `Kitchen & Bath Cabinet Painting in ${loc.name}, IL`,
      paragraphs: [
        `Cabinet painting is the single highest-ROI interior project available to ${loc.name} homeowners. A typical ${loc.name} kitchen with 20-30 linear feet of cabinetry costs $15,000-$50,000 to replace with new units - versus $3,500-$8,500 to professionally repaint and refresh with new hardware. The visual transformation is nearly identical; the savings are substantial; and the turnaround time is measured in days rather than weeks.`,
        `D&D Pro Painting performs cabinet painting for ${loc.name} homeowners in a full-service process that begins with doors and drawer fronts removed, labeled, and transported to our controlled-environment spray shop. Boxes are masked, scuff-sanded in place, bonding-primed, and sprayed with cabinet-grade enamel - all while your kitchen remains 95% functional during the project.`,
        `We paint solid wood cabinets (oak, maple, cherry, pine), MDF cabinet boxes and doors, thermofoil cabinets (with careful prep and specialty products), and laminate cabinets (specialty bonding primer required). Each substrate has a different system - we use the correct one for your specific cabinets.`,
      ],
    },
    {
      heading: `Our ${loc.name} Cabinet Painting Process`,
      paragraphs: [
        `**Day 1 - Remove, Label, Transport.** We remove every cabinet door and drawer front, label each with its original location, remove hardware, and transport doors and drawer fronts to our controlled-environment spray shop. Cabinet boxes remain in place in your ${loc.name} kitchen.`,
        `**Days 2-3 - Box Prep and Painting In-Home.** Back in your kitchen, we mask adjacent walls, counters, appliances, and flooring. Cabinet boxes are degreased with TSP, scuff-sanded to de-gloss the existing finish, tacked clean, and bonding-primed. Two finish coats of cabinet-grade enamel are sprayed or brushed on boxes. We use low-VOC products and ventilate thoroughly so your ${loc.name} family can stay in the home.`,
        `**Days 2-5 - Shop Painting of Doors and Drawer Fronts.** In our controlled shop environment, doors and drawer fronts are cleaned, sanded, bonding-primed, and sprayed with two coats of cabinet-grade enamel using HVLP spray equipment. Shop conditions eliminate dust, insects, and humidity variables that cause finish defects.`,
        `**Day 6-7 - Cure, Reinstall, and Hardware.** Sprayed surfaces cure 3-5 days minimum before reinstallation. We return, reinstall all doors and drawer fronts in their original positions, install new or cleaned hardware (knobs, pulls, hinges), and walk through the finished project with you.`,
        `Total timeline: typically 5-7 working days for a standard ${loc.name} kitchen, with your kitchen fully usable for most daily activities throughout.`,
      ],
    },
    {
      heading: `Cabinet Paint Colors That Work in ${loc.name}`,
      paragraphs: [
        `**Classic Whites.** Sherwin-Williams Alabaster, Benjamin Moore White Dove, and similar warm-whites continue to dominate ${loc.name} cabinet painting requests. White cabinets brighten kitchens, pair beautifully with almost any countertop, and maximize resale appeal. Our preferred white cabinet finish is Benjamin Moore Advance in semi-gloss or satin.`,
        `**Deep Navy and Forest Green.** Dark cabinets - especially on lower cabinets or islands with white uppers - have surged in ${loc.name} since 2020. Hale Navy, Naval, and Black Forest Green all perform beautifully in proper cabinet enamels. Dark cabinets hide daily wear and finger smudges better than whites.`,
        `**Soft Sages and Muted Greens.** Trending strongly for transitional kitchens. Sherwin-Williams Evergreen Fog was 2022 Color of the Year for a reason - it works beautifully on cabinets in ${loc.name} homes with warm-wood flooring.`,
        `**Warm Greiges.** For homeowners who want something between white and dark, warm greiges (Revere Pewter, Accessible Beige) deliver sophisticated cabinet looks without committing to bold color.`,
        `**Two-Tone Combinations.** Upper cabinets in one color (often white) and lowers or island in another (navy, sage, or black) continue to trend in ${loc.name} kitchens. We coordinate two-tone selections so they feel intentional rather than disconnected.`,
      ],
    },
    {
      heading: `What ${loc.name} Cabinet Painting Costs`,
      paragraphs: [
        `Cabinet painting in ${loc.name} is priced per door/drawer-front count with adjustments for cabinet box square footage, door style, and substrate. Small ${loc.name} kitchens (15-20 doors + drawer fronts) typically run $2,800-$4,500. Average ${loc.name} kitchens (25-35 doors + drawer fronts) range $4,500-$7,500. Large ${loc.name} kitchens with elaborate cabinetry (40+ doors, glass-front features, crown molding) trend $7,500-$12,000.`,
        `Variables that increase cost include intricate door styles (raised-panel, inset, glass-front), full-overlay cabinet construction requiring careful masking of box edges, painting cabinet interiors (often requested but significantly more labor), and high-end finish upgrades like tinted glazes or distressed effects.`,
        `Variables that reduce cost include flat-panel door styles, partial-overlay construction, painting only doors and drawer fronts (leaving boxes stained), and bundling cabinet painting with kitchen wall painting as a single project.`,
        `A repainted ${loc.name} kitchen typically adds $8,000-$20,000 to home resale value - making cabinet painting one of the highest-ROI projects available short of full kitchen remodeling.`,
      ],
    },
    {
      heading: `Why D&D Pro Painting for ${loc.name} Cabinet Work`,
      paragraphs: [
        `**Full removal and shop spraying.** We remove doors and drawer fronts to a controlled shop for HVLP spraying. This delivers a factory-grade finish impossible to achieve with in-place brushing or in-kitchen spraying.`,
        `**Cabinet-grade products.** Benjamin Moore Advance, Sherwin-Williams Emerald Urethane, and similar cabinet-specialty enamels deliver the hardness, smoothness, and durability cabinets require. Standard wall paint on cabinets fails within months.`,
        `**Careful labeling and reinstall.** Every door and drawer front is labeled and returned to its exact original position. Hardware is cleaned or replaced per your preference.`,
        `**In-home crew discipline.** While working on your ${loc.name} cabinet boxes, our crew maintains a clean, organized kitchen. You can still cook and use the space throughout most of the project.`,
        `**Warranty-backed.** Every ${loc.name} cabinet painting project includes a written workmanship warranty. Proper products plus proper prep plus proper process equals a finish that lasts 10-15 years.`,
      ],
    },
  ],
  pricingNote: (loc) =>
    `Cabinet painting in ${loc.name} typically runs $2,800-$7,500 for average kitchens and $7,500-$12,000 for larger custom cabinetry. Small kitchens with 15-20 doors and drawer fronts start around $2,800-$4,500. Average ${loc.name} kitchens (25-35 doors) range $4,500-$7,500. Large kitchens with elaborate cabinetry (40+ doors, glass-fronts, crown) trend $7,500-$12,000. Variables include door style complexity, whether cabinet interiors are painted, finish upgrades (tinted glazes, distressing), and hardware replacement. Cabinet painting is one of the highest-ROI home improvement projects available - typically adding $8,000-$20,000 in resale value. Every estimate is free, itemized, and valid for 60 days.`,
  faqs: (loc) => [
    {
      question: `How much does it cost to paint cabinets in ${loc.name}, IL?`,
      answer: `Cabinet painting in ${loc.name} typically runs $2,800-$7,500 for average kitchens depending on door count, substrate, and door style complexity. Large custom kitchens range $7,500-$12,000. Bathroom vanity painting runs $400-$1,200 depending on size. Compared to cabinet replacement ($15,000-$50,000 for a typical kitchen), cabinet painting delivers 80%+ of the visual transformation at 20-30% of the cost. D&D Pro Painting provides free, itemized estimates valid for 60 days.`,
    },
    {
      question: `How long does cabinet painting take in a ${loc.name} home?`,
      answer: `A standard ${loc.name} kitchen cabinet painting project runs 5-7 working days total. Doors and drawer fronts are removed and transported to our spray shop (day 1), boxes are painted in-home (days 2-3), doors and drawer fronts are shop-sprayed (days 2-5), and everything is reinstalled after curing (day 6-7). Your kitchen remains 95% functional throughout - you can cook, wash dishes, and use most of the space during the project.`,
    },
    {
      question: `Will painted cabinets chip or peel?`,
      answer: `Not when done with cabinet-grade products and proper prep. Cabinet-specialty enamels like Benjamin Moore Advance and Sherwin-Williams Emerald Urethane deliver hard, smooth, chip-resistant finishes designed specifically for cabinets. Proper degreasing (TSP), sanding, and bonding primer ensure the finish bonds permanently. Cheap paint on cabinets using wall-paint products fails quickly - which is why we never use wall paint on cabinets.`,
    },
    {
      question: `Can you paint my oak cabinets white without grain showing through?`,
      answer: `Yes - but it requires an extra step. Oak has pronounced open grain that telegraphs through paint without proper prep. We apply a grain filler or multiple coats of sanding primer, sanding flat between coats, to eliminate the grain texture before finish coats. This adds 1-2 days to the project and modest cost, but the result is a smooth factory-style white finish. Homes with oak cabinets are some of our most-requested ${loc.name} cabinet painting projects.`,
    },
    {
      question: `Do I need to empty my cabinets before painting?`,
      answer: `Yes. Please remove everything from upper and lower cabinet interiors before our arrival. We move large items to another room during the prep and painting phase, but emptied cabinets are essential so we can properly mask, clean, and paint boxes without damaging your belongings. Drawer contents must also be emptied. This is typically a half-day project for the homeowner.`,
    },
    {
      question: `Can you paint bathroom vanities too?`,
      answer: `Absolutely. Bathroom vanity painting is a smaller, simpler cousin of kitchen cabinet painting. A standard single-sink vanity runs $400-$800 fully completed with door removal, shop spraying, and reinstall. Double-sink and custom vanities run $800-$1,500. We frequently combine bathroom vanity painting with bathroom wall painting as a single project.`,
    },
  ],
  keyTakeaways: (loc) => [
    `Cabinet painting in ${loc.name} transforms kitchens at 20-30% of replacement cost with a factory-grade finish that lasts 10-15 years`,
    `We remove doors and drawer fronts to a controlled shop for HVLP spray application - delivering a finish impossible with in-place brushing`,
    `Cabinet-grade enamels (Benjamin Moore Advance, Sherwin-Williams Emerald Urethane) are engineered for hardness, smoothness, and chip resistance`,
    `Average ${loc.name} kitchens run $4,500-$7,500; small kitchens $2,800-$4,500; large custom kitchens $7,500-$12,000`,
    `Your kitchen stays 95% functional throughout the 5-7 day project - cook and use the space through most of the work`,
    `We paint wood, MDF, thermofoil, and laminate cabinets with the correct system for each substrate`,
    `Every ${loc.name} cabinet painting project includes hardware reinstall (or new hardware install) and a written workmanship warranty`,
  ],
  relatedArticles: ["how-to-choose-interior-paint-colors", "benefits-of-professional-painting-vs-diy"],
};

export const cabinetPaintingContent: Record<string, LocationServiceContent> =
  locations.reduce<Record<string, LocationServiceContent>>((acc, loc) => {
    acc[loc.slug] = generateContent(loc, cabinetBlueprint, { locationNameMap });
    return acc;
  }, {});
