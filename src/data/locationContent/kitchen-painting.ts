import type { LocationServiceContent } from "./types";
import { locations } from "../business";
import { buildLocationNameMap, generateContent, type ServiceBlueprint } from "./generator";

const locationNameMap = buildLocationNameMap(locations);

const kitchenBlueprint: ServiceBlueprint = {
  serviceSlug: "kitchen-painting",
  serviceName: "Kitchen Painting",
  serviceNoun: "kitchen painting",
  heroOpener: (city) =>
    `Professional kitchen painting in ${city}, IL requires more than wall paint and a roller. The kitchen is the hardest-working room in any home - walls face cooking grease and steam, ceilings collect cooking vapor, trim endures constant cleaning, and cabinets see daily wear that destroys standard finishes within months. D&D Pro Painting delivers complete kitchen makeovers with grease-resistant washable paints and a project timeline engineered to keep your kitchen functional.`,
  buildSections: (loc) => [
    {
      heading: `Complete Kitchen Painting Services in ${loc.name}, IL`,
      paragraphs: [
        `D&D Pro Painting provides the full range of kitchen painting services across ${loc.name}: kitchen walls, kitchen ceilings, trim and crown molding, doors, pantry interiors, and optionally cabinets and islands. Whatever your ${loc.name} kitchen painting goal - a quick refresh with better paint, a color transformation, a pre-sale update, or a complete kitchen makeover short of remodeling - we have the product systems and experience to deliver it.`,
        `Kitchens demand specialty paint systems. Standard flat wall paint fails in kitchens - it stains permanently from cooking splatter, grows mildew from steam, and wipes off when you try to clean it. We use kitchen-and-bath-grade paints (Sherwin-Williams Emerald, Benjamin Moore Aura Bath & Spa, Pittsburgh Paints Breakthrough!) in washable eggshell or satin sheens engineered for moisture resistance, scrubbability, and mildew resistance.`,
        `Every ${loc.name} kitchen painting project begins with comprehensive degreasing. Years of cooking produce invisible grease films that prevent paint adhesion - which is why so many DIY kitchen paint jobs peel within months. We TSP-clean every surface before priming, removing grease residues that defeat even the best paint.`,
      ],
    },
    {
      heading: `Our ${loc.name} Kitchen Painting Process`,
      paragraphs: [
        `**Step 1 - Protection and Appliance Masking.** We cover countertops, backsplash, range, refrigerator, dishwasher, and flooring with professional plastic sheeting and masking. Nothing in your kitchen gets splattered, dripped on, or dusted.`,
        `**Step 2 - Surface Degreasing.** Every wall, ceiling, cabinet, and trim surface is cleaned with TSP (trisodium phosphate) or specialty degreaser. This is the most skipped step by low-bid painters - and the reason their work peels within months. We never skip it.`,
        `**Step 3 - Drywall and Caulk Repair.** ${loc.name} kitchen walls often have nail holes from former shelving, chips from appliance moves, and cracked caulk around countertops, sinks, and backsplash. We patch, sand, and re-caulk everything that needs attention.`,
        `**Step 4 - Primer Application.** Stain-blocking primer goes over repairs, water stains, and any surface with heavy grease history. For kitchens transitioning from dark to light colors we apply tinted primer to ensure full hide with two finish coats.`,
        `**Step 5 - Premium Paint Application.** Two coats of kitchen-and-bath-grade paint on walls in eggshell or satin. Two coats of specialty flat ceiling paint on kitchen ceilings (or eggshell if exposed to heavy cooking steam). Semi-gloss or satin enamel on trim, doors, and window frames for maximum durability and scrubbability.`,
        `**Step 6 - Cabinet Refinishing (Optional).** If cabinet painting is part of the project, we follow our full cabinet painting process in parallel with wall and ceiling work to minimize total project duration.`,
        `**Step 7 - Final Walkthrough and Cleanup.** We remove all masking, clean the space thoroughly, and walk through every surface with you to confirm a perfect finish.`,
      ],
    },
    {
      heading: `Kitchen Paint Colors That Perform in ${loc.name} Homes`,
      paragraphs: [
        `**Warm Whites for Walls.** Sherwin-Williams Alabaster, Benjamin Moore White Dove, and similar warm-white shades remain the most popular ${loc.name} kitchen wall color because they brighten the space, pair with any cabinet color, and maximize resale appeal. In a washable eggshell sheen they clean up beautifully from everyday splatter.`,
        `**Soft Greiges and Earthy Neutrals.** For homeowners who want warmth beyond pure white, greiges like Revere Pewter and Accessible Beige perform beautifully on kitchen walls - adding depth without darkening the space.`,
        `**Bold Accent Walls.** A single accent wall in deep navy, forest green, or warm terracotta adds character to ${loc.name} kitchens with plenty of natural light. We use the same washable kitchen-and-bath-grade paint in these bolder colors.`,
        `**Ceilings - Always Bright, Usually White.** Kitchen ceilings benefit from ultra-bright whites that reflect overhead lighting and keep the space feeling tall. Specialty flat ceiling paint in pure bright white is our default recommendation.`,
        `**Trim Colors That Frame.** Semi-gloss trim in bright white provides visual contrast that frames wall and cabinet colors. For contemporary kitchens we also paint trim in matte black for dramatic effect.`,
        `**Coordinating with Existing Finishes.** Kitchen color selection must coordinate with countertops, cabinets, backsplash, and flooring. Our included color consultation brings oversized samples to your kitchen to evaluate against every fixed finish under actual kitchen lighting.`,
      ],
    },
    {
      heading: `What Kitchen Painting Costs in ${loc.name}, IL`,
      paragraphs: [
        `Kitchen painting pricing in ${loc.name} depends on scope. A **kitchen walls-and-ceiling refresh** (walls, ceiling, trim, but not cabinets) typically runs $1,200-$2,500 for an average-sized ${loc.name} kitchen. Adding **cabinet painting** to walls-and-ceiling pushes total into the $5,500-$10,000 range for a complete kitchen makeover. A **comprehensive kitchen transformation** including walls, ceiling, trim, cabinets, and a bold color change runs $6,500-$13,000.`,
        `Variables that increase cost include extensive drywall repair (common in older ${loc.name} homes with decades of wear), cabinet painting (itself $2,800-$7,500), tall ceilings or open-concept layouts with continuous surfaces extending into adjacent rooms, dramatic color changes requiring tinted primer, and heavy grease removal on ceilings and walls from decades of cooking.`,
        `Variables that reduce cost include single-color refreshes (same color as current), walls-only scope (leaving ceiling and cabinets), and bundling kitchen painting with adjacent rooms for efficiency. Most ${loc.name} kitchens benefit from the combined walls-ceiling-trim scope because setup cost for kitchen protection is similar regardless of scope.`,
        `Every ${loc.name} kitchen painting estimate is free, itemized, and valid for 60 days. Kitchen projects typically complete in 2-5 working days for walls-and-ceiling scope, or 5-10 days including cabinet painting.`,
      ],
    },
    {
      heading: `Why Choose D&D Pro Painting for Your ${loc.name} Kitchen`,
      paragraphs: [
        `**Kitchen-Grade Products Every Time.** We never use standard wall paint in kitchens. Kitchen-and-bath-grade paint costs 20-30% more per gallon but delivers dramatically better grease resistance, mildew resistance, and cleanability - making it far cheaper per year of service.`,
        `**Comprehensive Degreasing.** We TSP-clean every surface before painting. This one step is why our ${loc.name} kitchen paint work lasts years longer than low-bid competitors who skip it.`,
        `**Appliance and Fixture Protection.** We mask and protect every appliance, counter, and backsplash. Your kitchen will not have paint drips on the range or speckles on the backsplash.`,
        `**Minimal Downtime.** For walls-and-ceiling kitchen projects, your kitchen is usable most evenings during the 2-5 day project. For whole kitchen makeovers including cabinet painting, we coordinate schedule to keep your kitchen functional for most meal preparation throughout.`,
        `**Color Expertise.** Color consultation is included. We have coordinated hundreds of ${loc.name} kitchen color schemes against flooring, cabinets, and backsplash combinations - and we know exactly which palettes work.`,
        `**Warranty-Backed.** Every ${loc.name} kitchen painting project includes a written workmanship warranty.`,
      ],
    },
  ],
  pricingNote: (loc) =>
    `${loc.name} kitchen painting pricing depends on scope. Walls-and-ceiling refresh (walls, ceiling, trim, no cabinets) typically runs $1,200-$2,500. Adding cabinet painting to walls-and-ceiling pushes the total to $5,500-$10,000 for a complete kitchen makeover. Comprehensive kitchen transformation including cabinets and dramatic color change runs $6,500-$13,000. Variables include drywall repair, cabinet painting (adds $2,800-$7,500), tall ceilings, color change severity, and grease removal. Kitchen projects typically complete in 2-5 working days for walls-and-ceiling, or 5-10 days including cabinets. Every estimate is free, itemized, and valid for 60 days.`,
  faqs: (loc) => [
    {
      question: `How much does kitchen painting cost in ${loc.name}, IL?`,
      answer: `Kitchen painting in ${loc.name} ranges from $1,200 for a walls-and-ceiling refresh up to $13,000 for a complete kitchen transformation including cabinet painting and color changes. A typical walls-and-ceiling kitchen refresh runs $1,200-$2,500. Adding cabinet painting pushes it to $5,500-$10,000 total. Every estimate is itemized and valid for 60 days.`,
    },
    {
      question: `What paint do you use on kitchen walls?`,
      answer: `We use kitchen-and-bath-grade paints from Sherwin-Williams (Emerald), Benjamin Moore (Aura Bath & Spa), or Pittsburgh Paints (Breakthrough!) - specialty products engineered for moisture resistance, mildew resistance, and scrubbability. Standard wall paint fails in kitchens because it stains from cooking splatter, grows mildew from steam, and wipes off during cleaning. Kitchen-grade paint costs 20-30% more per gallon but delivers dramatically better long-term value.`,
    },
    {
      question: `Can I keep using my kitchen during painting?`,
      answer: `Yes, mostly. For walls-and-ceiling painting your kitchen is usable every evening after we finish for the day. Active work hours have the kitchen out of service for 6-8 hours. For projects including cabinet painting, cabinet boxes are worked on in-home while doors and drawer fronts are shop-sprayed - so you lose the ability to open cabinet doors for 5-7 days but can still cook and use appliances throughout.`,
    },
    {
      question: `Do I need to empty my kitchen before painting?`,
      answer: `For walls-and-ceiling painting, we only need counters cleared and any art or wall-hung items removed. For cabinet painting, cabinet interiors must be completely emptied - this is a half-day project for the homeowner and must be done before our arrival.`,
    },
    {
      question: `How do you handle kitchen ceiling grease and cooking stains?`,
      answer: `We TSP-clean kitchen ceilings thoroughly, then apply stain-blocking primer to seal grease and nicotine residues, then two coats of premium ceiling paint. For heavily stained ceilings we may apply primer twice to ensure permanent block. This is standard practice - kitchen ceilings cannot be refreshed reliably without addressing the grease layer first.`,
    },
    {
      question: `Should I paint cabinets at the same time as walls?`,
      answer: `For the best results and the most efficient project, yes. Cabinet painting and wall painting share the same setup (kitchen protection, masking, appliance covering), so doing them together saves labor cost. Color coordination is also much easier when cabinets and walls are painted in the same project - you see them together as you plan rather than after the fact. Most comprehensive ${loc.name} kitchen makeovers we complete include both.`,
    },
  ],
  keyTakeaways: (loc) => [
    `Kitchen painting in ${loc.name} requires specialty kitchen-and-bath-grade paints - standard wall paint fails in kitchens within months`,
    `We TSP-degrease every surface before painting; this one step prevents the adhesion failures that plague DIY kitchen paint jobs`,
    `Walls-and-ceiling kitchen refresh runs $1,200-$2,500; with cabinet painting $5,500-$10,000; comprehensive makeover $6,500-$13,000`,
    `Your kitchen stays usable every evening during the 2-5 day walls-and-ceiling project, or most of the 5-10 day project including cabinets`,
    `Color consultation is included - we coordinate wall and cabinet colors against your existing flooring, countertops, and backsplash`,
    `We use kitchen-and-bath-grade paints from Sherwin-Williams Emerald, Benjamin Moore Aura Bath & Spa, or Pittsburgh Paints Breakthrough!`,
    `Every ${loc.name} kitchen project includes appliance and fixture protection, drywall repair, primer, two coats of premium paint, and written warranty`,
  ],
  relatedArticles: ["how-to-choose-interior-paint-colors", "benefits-of-professional-painting-vs-diy"],
};

export const kitchenPaintingContent: Record<string, LocationServiceContent> =
  locations.reduce<Record<string, LocationServiceContent>>((acc, loc) => {
    acc[loc.slug] = generateContent(loc, kitchenBlueprint, { locationNameMap });
    return acc;
  }, {});
