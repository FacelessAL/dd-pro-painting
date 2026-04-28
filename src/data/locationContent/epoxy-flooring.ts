import type { LocationServiceContent } from "./types";
import { locations } from "../business";
import { buildLocationNameMap, generateContent, type ServiceBlueprint } from "./generator";

const locationNameMap = buildLocationNameMap(locations);

const epoxyFlooringBlueprint: ServiceBlueprint = {
  serviceSlug: "epoxy-flooring",
  serviceName: "Epoxy Flooring",
  serviceNoun: "epoxy flooring",
  heroOpener: (city) =>
    `Professional epoxy flooring in ${city}, IL transforms dusty, stained concrete into a showroom-quality surface that resists hot tires, oil drips, road salt, and the daily abuse a Midwest garage delivers. D&D Pro Painting installs diamond-ground, full-resin epoxy systems with decorative chip or metallic finishes that hold up for 15-20 years - not the peel-within-a-year roll-on kits sold at home centers.`,
  buildSections: (loc) => [
    {
      heading: `Garage Floor Epoxy: The Single Highest-Impact Garage Upgrade in ${loc.name}`,
      paragraphs: [
        `Most garage concrete in ${loc.name} is bare, stained with tire marks, oil drips, road salt residue, and white efflorescence blooms from moisture moving through the slab. An epoxy floor erases all of that in 2-3 days and creates a surface that's easier to clean than kitchen tile. Every resale listing showing an epoxy garage floor signals "this home has been maintained" to buyers - often translating to stronger offers.`,
        `The key difference between professional epoxy flooring and the $150 roll-on garage kits at the home center is the prep. Home-center kits use a mild acid etch that barely opens the concrete pores. Our system uses diamond grinding - a dust-contained process that removes the top 1/16" of concrete, exposes fresh aggregate, and creates a mechanical bond so strong that the epoxy cannot peel. This is why professionally installed epoxy floors last 15-20 years while roll-on kits peel within 12-18 months.`,
        `${loc.name} homeowners often pair garage floor epoxy with a [pressure washing service in ${loc.name}](/${loc.slug}/pressure-washing) for the driveway and a fresh coat of garage wall paint via our [interior painting service in ${loc.name}](/${loc.slug}/interior-painting). Three coordinated upgrades deliver a complete garage transformation in under a week.`,
      ],
    },
    {
      heading: `Our ${loc.name} Epoxy Flooring Process`,
      paragraphs: [
        `**Day 1 - Diamond grinding and crack repair.** We move everything out of your ${loc.name} garage, diamond-grind the full slab with dust-collection equipment, chase all cracks and joints with epoxy crack repair compound, and treat any oil-stained areas with specialty degreasers and primers. The slab is left clean, dry, and profiled for maximum bond.`,
        `**Day 2 - Primer coat and base coat.** A penetrating epoxy primer is rolled on to seal the concrete. Once tacky, the full pigmented base coat is applied - typically gray, tan, or custom color matched to your preference. Decorative vinyl chips (the colored flakes that define garage floor epoxy) are broadcast into the wet base coat to full rejection, covering every square inch.`,
        `**Day 3 - Scrape, vacuum, and topcoat.** Loose chips are scraped and vacuumed, revealing the embedded pattern. Two coats of clear polyurethane or polyaspartic topcoat go down - delivering the final gloss, hardness, and UV stability that resists yellowing. Polyaspartic topcoats cure fast enough to walk on the same evening.`,
        `**Cure time.** Light foot traffic after 24 hours. Vehicles back on the floor after 72 hours. Full chemical cure at 7 days. You will have a showroom-quality garage floor ready to use within a week of project start.`,
      ],
    },
    {
      heading: `Epoxy Colors, Chip Styles, and Metallic Finishes`,
      paragraphs: [
        `**Standard decorative chip systems.** The most popular ${loc.name} garage floor style - gray or tan base with multicolored vinyl chips broadcast to full coverage. Chip blends include earth tones (tans, browns, creams), cool tones (grays, blacks, blues), and warm tones (reds, oranges, yellows). Chips hide imperfections, improve slip resistance, and create visual depth.`,
        `**Solid color systems.** Solid gray, beige, tan, or custom color with a clear topcoat - no chips. Cleaner modern look. Slightly more likely to show dirt and tire marks than chip systems. Popular for workshop garages where you want visibility of dropped tools and small parts.`,
        `**Metallic epoxy systems.** High-end finish using pigmented metallic epoxy that swirls and flows during installation to create a marbled, three-dimensional look. Dramatic visual impact - popular for finished basements, showroom garages, and commercial spaces. Premium pricing reflects the skill required for installation.`,
        `**Commercial and industrial systems.** Higher-solids epoxy, quartz broadcast for extreme chemical resistance, slip-resistant aggregates for wet or oily environments, and chip line striping for OSHA compliance. We handle [commercial painting in ${loc.name}](/${loc.slug}/commercial-painting) projects that include integrated epoxy flooring for showrooms, warehouses, and light manufacturing.`,
      ],
    },
    {
      heading: `Basements, Workshops, and Specialty Applications`,
      paragraphs: [
        `**Finished basement floors.** Epoxy is increasingly popular for finished basement living spaces in ${loc.name} - easier to maintain than carpet, more moisture-resistant than LVP, and available in decorative chip, solid color, or dramatic metallic finishes. We handle basement moisture testing before quoting; ${loc.name} basements with high vapor transmission require moisture-tolerant primer systems to prevent bubbling.`,
        `**Workshop and hobby spaces.** Workshops benefit from chemical-resistant topcoats and slip-resistant aggregates. We scale the system to match how you will actually use the space - a woodworking shop has different needs than a mechanic's garage.`,
        `**Laundry, mud, and utility rooms.** Small-footprint epoxy installations for high-wear rooms. Often completed in 1-2 days. Creates a seamless, easy-to-clean surface that looks dramatically better than the previous vinyl or concrete.`,
        `**Commercial bays, warehouses, and showrooms.** Our commercial epoxy division handles larger-scale projects through our [commercial painting team in ${loc.name}](/${loc.slug}/commercial-painting), including after-hours installation scheduling to minimize business disruption.`,
      ],
    },
    {
      heading: `Why D&D Pro Painting for ${loc.name} Epoxy Flooring`,
      paragraphs: [
        `**Diamond grinding, not acid etching.** We never use the acid-etch shortcut. Diamond grinding with dust containment is the correct prep for a floor that lasts 15-20 years rather than 12-18 months.`,
        `**Full-resin systems.** We use 100% solids epoxy primers and base coats and polyaspartic or urethane topcoats. No water-based hobby products. No garage-store shortcut kits.`,
        `**Dust-controlled.** Our grinders run with HEPA-filtered vacuums attached. Your ${loc.name} home does not fill with concrete dust during our work.`,
        `**Crack and joint repair.** All existing cracks and control joints are properly prepped before the system goes down. Epoxy installed over unprepped cracks telegraphs the crack through the finish within weeks.`,
        `**Clean integration.** We often pair epoxy flooring with garage wall painting, exterior door repainting, and driveway pressure washing as a full garage-complex refresh. Everything coordinates through a single project manager.`,
      ],
    },
  ],
  pricingNote: (loc) =>
    `Epoxy flooring in ${loc.name} is priced per square foot with the system type determining the rate. Standard decorative chip systems (the most popular residential garage option) run $6-$9/sq ft installed and fully cured - so a 2-car garage (approx 400 sq ft) trends $2,400-$3,600, and a 3-car garage (600 sq ft) runs $3,600-$5,400. Solid-color systems run $5-$7/sq ft. Metallic epoxy systems trend $10-$15/sq ft. Basement and specialty-space pricing varies with size, prep required, and system complexity. Every epoxy flooring estimate is free, itemized, and valid for 60 days, and includes diamond grinding, crack repair, and full resin system.`,
  faqs: (loc) => [
    {
      question: `How much does epoxy flooring cost in ${loc.name}, IL?`,
      answer: `Epoxy flooring in ${loc.name} typically runs $6-$9/sq ft for decorative chip systems (the most popular garage option) - so a 2-car garage runs $2,400-$3,600 and a 3-car garage $3,600-$5,400. Solid-color systems run $5-$7/sq ft. Metallic epoxy runs $10-$15/sq ft. Pricing includes diamond grinding, crack repair, full-resin primer, pigmented base coat, chip broadcast, and two polyaspartic or urethane topcoats. Free itemized estimates valid 60 days.`,
    },
    {
      question: `How long does epoxy flooring installation take?`,
      answer: `Typical ${loc.name} garage floor takes 3 working days start to finish: day 1 (grinding, crack repair, primer), day 2 (base coat and chip broadcast), day 3 (scraping, topcoats, cure). Light foot traffic after 24 hours; vehicles back on the floor after 72 hours; full chemical cure at 7 days. Larger garages or basements add 1-2 days. Commercial installations are scheduled after-hours or over weekends to minimize disruption.`,
    },
    {
      question: `Will it peel like those roll-on garage kits?`,
      answer: `No - because we use professional prep and professional products. Roll-on garage kits peel because they rely on a weak acid etch and use water-based hobby products. Our system uses diamond grinding (removes the top 1/16" of concrete for mechanical bond) and 100% solids epoxy with polyaspartic topcoats. Professionally installed epoxy floors in ${loc.name} routinely last 15-20 years. We warranty every installation.`,
    },
    {
      question: `Can I park on my new garage floor right away?`,
      answer: `Not right away - vehicles should stay off the floor for 72 hours after topcoat application. Light foot traffic is fine after 24 hours. Full chemical cure takes 7 days, during which you should avoid dragging heavy objects or dropping wrenches. After the 7-day cure, the floor handles everything a garage requires: hot tires, oil drips, road salt, dropped tools, and daily in-and-out traffic.`,
    },
    {
      question: `Do you install epoxy in basements?`,
      answer: `Yes - epoxy is increasingly popular for finished basement floors in ${loc.name}. Benefits include easier maintenance than carpet, moisture resistance, decorative options (chip, solid, or metallic), and modern aesthetic. Important consideration: we test basement moisture vapor transmission first. Basements with high vapor transmission need moisture-tolerant primer systems to prevent bubbling. If your basement is consistently damp, we may recommend addressing the moisture source first.`,
    },
    {
      question: `Will oil stains show through after epoxy is installed?`,
      answer: `Not when prep is done correctly. We treat oil-stained concrete with specialty degreasers and an oil-stop primer before the full epoxy system goes down. For severe oil contamination, we may grind deeper to remove contaminated concrete. Once sealed under the primer and base coat, oil stains cannot bleed back through. Skipping this step causes bleed-through - which is why proper prep matters.`,
    },
  ],
  keyTakeaways: (loc) => [
    `Professional epoxy flooring in ${loc.name} uses diamond grinding (not acid etch) for a mechanical bond that lasts 15-20 years - vs. 12-18 months for home-center roll-on kits`,
    `Typical ${loc.name} pricing: $6-$9/sq ft for decorative chip (most popular), $5-$7/sq ft solid color, $10-$15/sq ft metallic - 2-car garages $2,400-$3,600`,
    `Full installation takes 3 days; light foot traffic at 24 hours; vehicles back on floor at 72 hours; full chemical cure at 7 days`,
    `Decorative chip systems hide imperfections, add slip resistance, and come in earth, cool, or warm tone blends - most popular ${loc.name} residential choice`,
    `Metallic epoxy creates dramatic three-dimensional marbled finishes - popular for finished basements, showroom garages, and commercial spaces`,
    `Diamond grinding with HEPA-vacuum dust containment keeps your home clean during installation - not dusty like traditional concrete prep`,
    `Basements, workshops, laundry rooms, and commercial bays all benefit from epoxy - we scale the system to match actual use and moisture conditions`,
  ],
  relatedArticles: ["interior-painting-cost-guide-chicago-suburbs", "pre-sale-painting-roi-chicago-suburbs"],
};

export const epoxyFlooringContent: Record<string, LocationServiceContent> =
  locations.reduce<Record<string, LocationServiceContent>>((acc, loc) => {
    acc[loc.slug] = generateContent(loc, epoxyFlooringBlueprint, { locationNameMap });
    return acc;
  }, {});
