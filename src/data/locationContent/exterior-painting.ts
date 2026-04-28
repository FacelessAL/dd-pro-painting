import type { LocationServiceContent } from "./types";
import { locations } from "../business";
import { buildLocationNameMap, generateContent, type ServiceBlueprint } from "./generator";

const locationNameMap = buildLocationNameMap(locations);

const exteriorBlueprint: ServiceBlueprint = {
  serviceSlug: "exterior-painting",
  serviceName: "Exterior Painting",
  serviceNoun: "exterior painting",
  heroOpener: (city, county) =>
    `Searching for exterior painters in ${city}, IL? Your home's exterior is its single largest protective surface - and in ${county}'s freeze-thaw climate, only meticulous preparation and premium acrylic paint deliver a finish that lasts 8-12 years instead of failing in 2-3. D&D Pro Painting has protected and beautified hundreds of ${city} homes with professional exterior painting built for Illinois weather.`,
  buildSections: (loc) => [
    {
      heading: `Complete Exterior Painting Services in ${loc.name}, IL`,
      paragraphs: [
        `D&D Pro Painting provides the full range of exterior painting services across ${loc.name}, including siding painting, trim and fascia painting, soffit painting, shutter and door refinishing, porch and deck painting, brick and stucco painting, and garage door painting. Whatever exterior surfaces your ${loc.name} home has, we have the products, tools, and experience to refinish them properly - once, and built to last.`,
        `Exterior painting in ${loc.name} is not a cosmetic afterthought. The paint film is your home's first line of defense against the elements - UV radiation that degrades wood fibers, freeze-thaw cycles that stress every joint, wind-driven rain that seeks out every unsealed crack, and humidity that promotes mildew on north-facing walls. When exterior paint fails, moisture infiltrates siding, trim, and sheathing, driving expensive structural repair costs that dwarf the cost of a proper paint job.`,
        `Our exterior painting approach in ${loc.name} is engineered specifically for ${loc.county} conditions. We use 100% acrylic latex exterior paints from Sherwin-Williams (Duration, SuperPaint), Benjamin Moore (Aura, Regal Select), and Pittsburgh Paints (Manor Hall) - products with advanced UV stabilizers, flexible resin systems, and mildew-resistant additives that handle Illinois extremes. We pair each product with the correct primer and apply it under proper temperature and humidity conditions. Cutting corners on product or application timing guarantees premature failure.`,
      ],
    },
    {
      heading: `The D&D Pro Painting Exterior Process in ${loc.name}`,
      paragraphs: [
        `**Phase 1 - Full Property Inspection.** We walk every elevation of your ${loc.name} home, board by board, noting peeling paint, wood rot, failed caulk joints, rusted flashing, mildew colonies, popped nails, and any structural concerns. This inspection drives the preparation plan and prevents mid-project surprises. Homes with major deferred maintenance are quoted with repair separately so you see exactly what the work entails.`,
        `**Phase 2 - Professional Pressure Washing.** Calibrated pressure cleaning removes accumulated dirt, pollen, atmospheric pollutants, chalk, mold, and mildew from every exterior surface. We use biocidal cleaning agents that kill mold at the root rather than just removing surface discoloration. Pressure is tuned to each substrate - gentler for wood siding and trim, higher for masonry, brick, and fiber cement. Surfaces then dry 48-72 hours before any further work. Rushing this dry time traps moisture behind the new paint film - guaranteeing failure within 1-2 years.`,
        `**Phase 3 - Scraping, Sanding, and Feathering.** All loose, peeling, and flaking paint is removed through hand scraping, mechanical sanders, and specialty profile tools. Every scraped edge is feathered smooth so transitions between old and new paint are invisible under the finish coat. For ${loc.name} homes built before 1978 we perform lead testing before any disturbance and follow EPA RRP protocols when required.`,
        `**Phase 4 - Wood Repair, Caulking, and Priming.** Rotted wood is excised and replaced with matching lumber - we never paint over rot. Failed caulk joints around windows, doors, corner boards, and trim intersections are raked out and re-sealed with high-performance sealant. Popped fasteners are reset and spot-primed with rust-inhibitive primer. Cracked or warped siding boards are replaced. Bare wood is primed with oil or specialty primer. Stained knots are treated with stain-blocking primer.`,
        `**Phase 5 - Two Finish Coats.** Two full finish coats of premium acrylic exterior paint, applied by brush and roller on trim and by spray-and-back-roll on large siding surfaces. Between coats we allow full drying time per product specification and monitor weather forecasts to ensure fresh coats do not face precipitation within the critical 24-hour cure window.`,
        `**Phase 6 - Final Walkthrough and Warranty.** Before packing out, we walk every elevation with you, addressing any touch-ups on the spot. You receive written warranty documentation, leftover paint labeled by surface and color, and a 30-day and one-year follow-up inspection to catch any settling-related issues.`,
      ],
    },
    {
      heading: `Exterior Paint Colors for ${loc.name} Homes`,
      paragraphs: [
        `Exterior color selection for ${loc.name} homes requires more than aesthetic preference - it shapes how your home ages under UV, how visible dirt and pollen accumulation is between washings, how it fits your ${loc.county} neighborhood context, and how it influences resale value. We provide free color consultation with every ${loc.name} exterior painting project.`,
        `Dark colors (deep navy, charcoal, forest green) absorb significantly more solar heat than light colors, which accelerates UV degradation and can cause siding expansion and paint stress on south- and west-facing elevations. They also show dust and spider webs more visibly. They can be stunning when done right, but require premium fade-resistant products and appropriate substrate compatibility.`,
        `Light colors (warm whites, soft grays, light beiges) reflect solar heat, fade more uniformly, and hide dust better between pressure washings. They also tend to appeal to the widest range of buyers - an important factor when exterior painting is part of a pre-sale preparation in ${loc.name}.`,
        `Classic color schemes that consistently perform well in ${loc.name} include warm-white body with black or charcoal trim and a complementary door color, soft greige body with bright white trim, and monochromatic combinations using two values of the same hue. For HOA-governed ${loc.name} subdivisions we coordinate color selection with your HOA guidelines before pricing - we have navigated this countless times.`,
      ],
    },
    {
      heading: `Exterior Surfaces We Paint in ${loc.name}`,
      paragraphs: [
        `**Wood Siding.** Clapboard, cedar shakes, board-and-batten, and tongue-and-groove all require thorough prep and premium 100% acrylic paint for longevity. We are experts at identifying which boards need replacement versus repainting.`,
        `**Vinyl Siding.** Yes, vinyl siding can be painted - with the right product and proper prep. We use specialty vinyl-safe paints that bond to vinyl and flex with its expansion and contraction without peeling.`,
        `**Fiber Cement (Hardie board).** Common in newer ${loc.name} builds and widely considered the gold standard for painted siding. Fiber cement takes paint beautifully when properly prepped with the correct primer.`,
        `**Aluminum and Steel Siding.** Metal siding requires specialty bonding primers and the right top-coat chemistry. Done correctly, painted metal siding looks new and lasts as long as wood.`,
        `**Stucco and EIFS.** Requires elastomeric or masonry-compatible coatings engineered to bridge hairline cracks and flex with substrate movement. Standard exterior latex over stucco fails within 2-3 years.`,
        `**Brick and Masonry.** Brick can absolutely be painted or limewashed if desired. We use breathable mineral paints or specialty masonry coatings - not standard latex, which traps moisture and spalls brick.`,
        `**Trim, Fascia, Soffits, and Shutters.** We finish all wood trim in premium exterior enamels with excellent mildew and UV resistance. Shutter painting, often overlooked, dramatically lifts curb appeal at very modest cost.`,
        `**Porches, Decks, and Garage Doors.** Horizontal porch floors and deck boards require specialty porch and floor coatings that resist foot-traffic wear. Garage doors benefit from cabinet-grade or specialty door enamels that hold up to sun exposure.`,
      ],
    },
    {
      heading: `What Exterior Painting Costs in ${loc.name}, IL`,
      paragraphs: [
        `Exterior painting pricing in ${loc.name} depends on home size, number of stories, current surface condition, surface material, trim complexity, and accessibility. Most ${loc.name} exterior painting projects fall between $3,500 and $10,000, with custom homes and properties with extensive trim or access challenges running higher.`,
        `**Small one-story homes** (1,000-1,500 sq ft of siding area) typically run $3,500-$6,000 for complete prep and two finish coats. **Two-story homes** of 2,000-2,800 sq ft typically run $5,500-$9,500 including trim. **Larger custom homes** in ${loc.name} with extensive trim packages, cedar shakes, or stucco accents trend $8,500-$15,000 and occasionally higher.`,
        `Variables that increase investment include extensive peeling requiring full strip-and-repaint (rather than spot prep), wood rot requiring board replacement, multi-story elevations requiring lift equipment, specialty substrates like stucco or painted brick, elaborate trim packages, and dramatic color changes (dark to light especially). Variables that reduce cost include sound existing paint requiring minimal prep, single-story access throughout, and projects we can complete in consecutive days without weather interruption.`,
        `Every ${loc.name} exterior painting estimate is written, itemized, and valid for 60 days. We break down prep labor, materials, finish application, and any specialty work so you see exactly where your investment goes. Most projects are paid in thirds - deposit at scheduling, progress payment when finish coats begin, and final payment at completion.`,
      ],
    },
    {
      heading: `When to Paint Your ${loc.name} Home Exterior`,
      paragraphs: [
        `The optimal exterior painting window in ${loc.name} runs from late April through early October - temperatures consistently 50-85°F with moderate humidity and low overnight risk of precipitation during the 24-hour cure window. Paint cured outside these conditions produces weak adhesion, color inconsistencies, and early failure.`,
        `We book exterior projects in ${loc.name} starting in early spring as soon as nighttime lows are reliably above 40°F. Late-spring and early-summer dates fill first; we recommend scheduling by March for a May-June start. Late-summer and early-fall dates (August-October) are our second-busiest season.`,
        `Signs your ${loc.name} home needs exterior painting soon: visible peeling or flaking on any south- or west-facing wall; chalking (powdery residue when you rub the surface); faded color especially on south-facing elevations; hairline cracking in caulk joints around windows and trim; water soaking into painted wood rather than beading. Any of these indicates your protective film is compromising and underlying wood is beginning to absorb moisture - which leads to rot, far more expensive than painting.`,
        `For ${loc.name} homes with recent paint failures we are often asked to inspect the work and determine whether touch-up, full strip-and-repaint, or specific elevation repaint is appropriate. We provide honest assessments - sometimes a quality partial repaint at one elevation is the right answer rather than a full exterior. We do not upsell work that is not needed.`,
      ],
    },
    {
      heading: `What Makes D&D Pro Painting Different for ${loc.name} Exterior Work`,
      paragraphs: [
        `**We are local.** Based in ${loc.county}-adjacent Woodridge, we understand ${loc.name}'s specific climate, architectural styles, HOA landscape, and neighborhood expectations. National franchises apply generic specifications everywhere.`,
        `**We prep thoroughly.** Our exterior prep phase accounts for 40-60% of total labor hours. This is why our work lasts 8-12 years while low-bid competitors fail in 2-3. Prep is invisible but determinative.`,
        `**We use premium products.** 100% acrylic latex from top-tier manufacturers, paired with the correct primers and sealants. Budget contractors cut costs on paint; we never do - because premium paint over proper prep delivers dramatically better cost-per-year economics.`,
        `**We respect your property.** We protect landscaping with breathable drop cloths, clean up every day, and leave your ${loc.name} home immaculate. Neighbors consistently compliment how organized and clean our job sites are.`,
        `**We stand behind the work.** Every ${loc.name} exterior painting project includes a written warranty. If something is wrong, we return and fix it at no charge. Peace of mind is part of the service.`,
        `**We are fully insured.** Comprehensive general liability insurance and workers' compensation coverage protect you throughout the project. Certificates of insurance available before work begins.`,
      ],
    },
  ],
  pricingNote: (loc) =>
    `Most ${loc.name} exterior painting projects fall between $3,500 and $10,000 depending on home size, stories, trim complexity, and surface condition. Small one-story homes typically run $3,500-$6,000 for full prep and two finish coats. Average two-story ${loc.name} homes (2,000-2,800 sq ft) range $5,500-$9,500. Larger custom homes with extensive trim or specialty substrates trend $8,500-$15,000 and occasionally higher. Variables that drive cost include wood rot requiring board replacement, multi-story access requiring lift equipment, dramatic color changes requiring tinted primer, and specialty substrates like stucco, painted brick, or fiber cement. Every estimate is itemized, written, and valid for 60 days. Call (331) 241-6600 to schedule a free on-site assessment - the only way to quote exterior painting accurately is to see the actual property.`,
  faqs: (loc) => [
    {
      question: `How much does exterior painting cost in ${loc.name}, IL?`,
      answer: `Exterior painting in ${loc.name} typically ranges $3,500-$10,000 depending on home size, stories, trim complexity, and current surface condition. Small one-story homes run $3,500-$6,000, average two-story ${loc.name} homes run $5,500-$9,500, and larger custom homes with extensive trim or specialty substrates trend $8,500-$15,000 and higher. D&D Pro Painting provides free on-site estimates with itemized, written pricing valid for 60 days. Call (331) 241-6600 to schedule.`,
    },
    {
      question: `How long does exterior paint last on a ${loc.name} home?`,
      answer: `With professional preparation and premium 100% acrylic latex paint, exterior finishes in ${loc.name} typically last 8-12 years. Longevity depends on prep quality, paint quality, color choice (dark colors fade faster), sun exposure, and ongoing maintenance (annual cleaning, prompt caulk touch-ups). Low-bid exterior paint jobs that skip prep typically fail in 2-3 years - costing homeowners far more long-term than doing it right once. Our 8-12 year service life is backed by a written warranty.`,
    },
    {
      question: `What is the best time to paint a house exterior in ${loc.name}?`,
      answer: `The optimal exterior painting window in ${loc.name} runs late April through early October - temperatures consistently 50-85°F with moderate humidity. We avoid direct midday sun (causes flash drying and poor adhesion) and monitor weather to ensure 24-hour no-precipitation windows after each coat. Late spring and early summer dates fill first; we recommend booking by March for May-June starts. Late August through October is our second-busiest season.`,
    },
    {
      question: `Do you handle wood rot and siding repair before painting?`,
      answer: `Absolutely - we never paint over rot. Our prep phase includes replacing rotted wood, securing loose siding, re-caulking all joints, resetting popped fasteners, and priming all repairs before painting. This thorough approach is what allows our exterior finishes to last 8-12 years in ${loc.county}'s climate. Major structural rot is quoted separately so you see the specific repair scope, but we handle it in-house rather than subbing out.`,
    },
    {
      question: `Can you paint my ${loc.name} home's vinyl, aluminum, or fiber cement siding?`,
      answer: `Yes to all three - with the right product and proper prep. Vinyl siding takes specialty vinyl-safe paints that bond properly and flex with the material's temperature expansion. Aluminum and steel require specialty bonding primers and the right top-coat chemistry. Fiber cement (Hardie board) is ideal for painting with 100% acrylic latex over the factory primer. Each substrate has a different system - we use the right one for your specific siding.`,
    },
    {
      question: `Will pressure washing damage my siding or trim?`,
      answer: `Not when performed by professionals. We calibrate pressure settings to each substrate - lower PSI and wider nozzles for wood siding and trim, higher pressure for masonry and concrete. Consumer-grade pressure washers with fixed high pressure are what cause siding damage. Our technicians are trained to clean effectively without driving water behind siding or damaging paint underneath.`,
    },
    {
      question: `Are you licensed and insured for exterior painting in ${loc.name}?`,
      answer: `Yes. D&D Pro Painting is fully insured and licensed for all exterior painting work in ${loc.name} and throughout ${loc.county}. We carry comprehensive general liability insurance (including coverage for landscape damage and structural issues) and workers' compensation coverage for all crew members. Certificates of insurance are available on request before work begins - and for HOA-governed subdivisions we are familiar with the typical documentation requirements.`,
    },
    {
      question: `Do I need to be home during exterior painting?`,
      answer: `No. Once the project has started and product selections are confirmed, we can complete ${loc.name} exterior painting while you are at work, traveling, or otherwise unavailable. We communicate via text and email throughout the project with photos and daily progress updates. You receive the final walkthrough at your convenience when the work is complete.`,
    },
  ],
  keyTakeaways: (loc) => [
    `D&D Pro Painting has protected and beautified hundreds of ${loc.name} homes with professional exterior painting engineered for ${loc.county}'s freeze-thaw climate`,
    `Every exterior painting project includes thorough pressure washing, full prep (scraping, sanding, caulking, priming), and two coats of premium 100% acrylic latex`,
    `Proper prep accounts for 40-60% of labor hours - it is why our exterior finishes last 8-12 years while low-bid work fails in 2-3`,
    `Most ${loc.name} exterior painting projects fall between $3,500 and $10,000 depending on home size, stories, and trim complexity`,
    `Optimal painting window in ${loc.name} is late April through early October - book by March for May-June starts`,
    `We paint every exterior surface type including wood, vinyl, aluminum, fiber cement, stucco, brick, and metal - with the correct product system for each`,
    `Fully insured and licensed throughout ${loc.county}; certificates of insurance and HOA documentation available on request`,
    `Every project includes written warranty, leftover paint labeled by surface, and 30-day plus one-year follow-up inspections`,
  ],
  relatedArticles: ["exterior-painting-preparation-guide", "benefits-of-professional-painting-vs-diy"],
};

/**
 * Export: generator produces unique long-form content for every location.
 */
export const exteriorPaintingContent: Record<string, LocationServiceContent> =
  locations.reduce<Record<string, LocationServiceContent>>((acc, loc) => {
    acc[loc.slug] = generateContent(loc, exteriorBlueprint, { locationNameMap });
    return acc;
  }, {});
