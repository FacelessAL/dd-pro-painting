#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const QUEUE = path.join(__dirname, "queue");
const TOPICS = JSON.parse(fs.readFileSync(path.join(__dirname, "topics.json"), "utf-8"));
fs.mkdirSync(QUEUE, { recursive: true });

// ── schedule ─────────────────────────────────────────────────────────
function makeDates(start, n) {
  const d = []; let c = new Date(start);
  for (let i = 0; i < n; i++) { d.push(c.toISOString().slice(0,10)); c = new Date(c.getTime()+(3+Math.round(Math.random()))*864e5); }
  return d;
}
const dates = makeDates("2026-04-29", TOPICS.length);

// ── reference data ───────────────────────────────────────────────────
const LIVE_ARTICLES = [
  {slug:"how-to-choose-interior-paint-colors", title:"How to Choose Interior Paint Colors"},
  {slug:"exterior-painting-preparation-guide", title:"Exterior Painting Preparation Guide"},
  {slug:"benefits-of-professional-painting-vs-diy", title:"Benefits of Professional Painting vs DIY"},
  {slug:"deck-staining-maintenance-guide-illinois", title:"Deck Staining Maintenance Guide"},
  {slug:"interior-painting-cost-guide-chicago-suburbs", title:"Interior Painting Cost Guide"},
  {slug:"kitchen-cabinet-painting-vs-replacement-illinois", title:"Kitchen Cabinet Painting vs Replacement"},
  {slug:"best-interior-paint-colors-chicago-homes-2026", title:"Best Interior Paint Colors for Chicago Homes"},
  {slug:"exterior-painting-cost-guide-chicago-suburbs-2026", title:"Exterior Painting Cost Guide 2026"},
  {slug:"popcorn-ceiling-removal-illinois-guide", title:"Popcorn Ceiling Removal Guide"},
  {slug:"pre-sale-painting-roi-chicago-suburbs", title:"Pre-Sale Painting ROI Guide"},
  {slug:"hoa-approved-exterior-paint-colors-dupage", title:"HOA-Approved Exterior Paint Colors"},
  {slug:"whole-home-interior-painting-timeline", title:"Whole Home Interior Painting Timeline"},
  {slug:"spring-exterior-painting-checklist-illinois", title:"Spring Exterior Painting Checklist"},
];
const C = ["woodridge","naperville","downers-grove","hinsdale","oak-brook","burr-ridge","glen-ellyn","bolingbrook","lemont","homer-glen","lockport","mokena"];
const CN = {woodridge:"Woodridge",naperville:"Naperville","downers-grove":"Downers Grove",hinsdale:"Hinsdale","oak-brook":"Oak Brook","burr-ridge":"Burr Ridge","glen-ellyn":"Glen Ellyn",bolingbrook:"Bolingbrook",lemont:"Lemont","homer-glen":"Homer Glen",lockport:"Lockport",mokena:"Mokena"};
const SVCS = {
  "interior-painting":"interior painting","exterior-painting":"exterior painting",
  "cabinet-painting":"cabinet painting","ceiling-painting":"ceiling painting",
  "popcorn-ceiling-removal":"popcorn ceiling removal","kitchen-painting":"kitchen painting",
  "pressure-washing":"pressure washing","deck-staining":"deck staining",
  "fence-staining":"fence staining","drywall-repair":"drywall repair",
  "epoxy-flooring":"epoxy flooring","commercial-painting":"commercial painting",
};
const SKEYS = Object.keys(SVCS);
const IMGS = [
  "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=1200&q=80",
  "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=1200&q=80",
  "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1200&q=80",
  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80",
  "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1200&q=80",
  "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80",
  "https://images.unsplash.com/photo-1560185008-b033106af5c3?w=1200&q=80",
  "https://images.unsplash.com/photo-1523413363574-c30aa1c2a516?w=1200&q=80",
  "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1200&q=80",
  "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
  "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1200&q=80",
  "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1200&q=80",
  "https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=1200&q=80",
  "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=80",
  "https://images.unsplash.com/photo-1591825729269-caeb344f6df2?w=1200&q=80",
  "https://images.unsplash.com/photo-1560185127-6a8c2cf8e1e3?w=1200&q=80",
  "https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?w=1200&q=80",
];

// ── helpers ──────────────────────────────────────────────────────────
function pick(a,n=1){const s=[...a].sort(()=>Math.random()-.5);return n===1?s[0]:s.slice(0,n);}
function svcLink(text,city,svc){return `[${text}](/${city||pick(C)}/${svc||pick(SKEYS)})`;}
function artLink(a){return `[${a.title}](/resources/${a.slug})`;}
function cityNames(n){return pick(C,n).map(c=>CN[c]).join(", ");}

// build safe article pool (live + already-scheduled before this index)
function safeArts(idx, published) {
  const all = [...LIVE_ARTICLES, ...published];
  return all;
}

function pickArtLinks(pool, cat, n) {
  let relevant;
  if (cat.includes("Exterior") || cat.includes("Deck")) {
    relevant = pool.filter(a => a.slug.match(/exterior|hoa|deck|pre-sale|pressure|preparation|cost/));
  } else if (cat.includes("Interior")) {
    relevant = pool.filter(a => a.slug.match(/interior|color|cabinet|popcorn|whole-home|cost|timeline/));
  } else {
    relevant = pool.filter(a => a.slug.match(/professional|cost|interior|exterior|preparation/));
  }
  if (relevant.length < n) relevant = [...relevant, ...pool.filter(a => !relevant.includes(a))];
  return pick(relevant, Math.min(n, relevant.length));
}

function pickSvcLinks(cat, n) {
  const links = [];
  const cities = pick(C, n);
  let svcs;
  if (cat.includes("Exterior")) svcs = ["exterior-painting","pressure-washing","deck-staining","fence-staining"];
  else if (cat.includes("Interior")) svcs = ["interior-painting","cabinet-painting","ceiling-painting","kitchen-painting"];
  else svcs = pick(SKEYS, n);
  for (let i = 0; i < n; i++) {
    const svc = Array.isArray(svcs) ? svcs[i % svcs.length] : svcs;
    links.push({ city: cities[i], svc, text: `${SVCS[svc]} in ${CN[cities[i]]}` });
  }
  return links;
}

// ── content templates by category ────────────────────────────────────
// Each returns {content, takeaways, faqs}

const BUILDERS = {
  "Exterior Painting": buildExterior,
  "Interior Painting": buildInterior,
  "Tips & Advice": buildTips,
  "Home Selling": buildInterior,
  "Deck & Outdoor": buildExterior,
  "Commercial Painting": buildTips,
};

function buildExterior(t, arts, svcs, cities) {
  const a1 = arts[0], a2 = arts[1], a3 = arts[2] || arts[0];
  const s1 = svcs[0], s2 = svcs[1], s3 = svcs[2] || svcs[0];
  const c4 = cities;

  const content = `${t.title.replace(/:/g," -")} is one of the most common questions homeowners across ${c4} ask when spring arrives and the damage from another Illinois winter becomes visible. The answer depends on your specific home, your budget, and the condition of your current exterior - but the core principles we have learned across 15 years and hundreds of projects in the western Chicago suburbs remain consistent.

## Why This Matters More Than You Think

Your home's exterior coating is not decorative. It is a weather barrier. In Illinois, that barrier faces temperature swings from -15 to over 100 degrees Fahrenheit, 80 to 100 freeze-thaw cycles every year, persistent rain from April through November, and ultraviolet radiation that breaks down paint binders on south-facing and west-facing walls. When that coating fails, moisture gets behind the siding and rot starts spreading where you cannot see it.

We regularly inspect homes in ${CN[s1.city]} and ${CN[s2.city]} where owners delayed repainting by two or three years after noticing the first signs of failure. In almost every case, the cost doubled because what started as a straightforward [${s1.text}](/${s1.city}/${s1.svc}) project became a combined paint-and-repair scope. Wood rot that could have been caught at $200 per board run grew into $2,000 to $4,000 in carpentry. Early action saves real money.

## Evaluating Your Home's Current Condition

Before making any decisions, walk the perimeter of your home and honestly evaluate what you see. Start with the south and west walls - these take the most abuse from direct sunlight and prevailing weather. Look for these specific signs:

**Chalking.** Rub your hand across the painted surface. If a powdery white residue comes off on your fingers, the UV radiation has broken down the paint's binder. The coating is no longer protecting the substrate underneath. Our ${artLink(a1)} covers this testing method in more detail.

**Cracking and flaking.** Fine hairline cracks mean the paint film has lost flexibility. It can no longer expand and contract with temperature changes without breaking. Once cracks form, water enters and accelerates the failure from inside.

**Peeling.** Paint separating from the surface in sheets or curls indicates adhesion failure. This is usually caused by moisture behind the paint, inadequate surface preparation during the last paint job, or incompatible paint layers. Peeling requires complete removal of the failed coating before new paint can be applied.

**Fading.** Significant color loss - especially compared to areas under overhangs or porches that are protected from direct sun - means the pigment has degraded. While fading alone does not mean the coating has failed structurally, it indicates the paint is past its prime.

**Caulk failure.** Check every joint around windows, doors, trim transitions, and siding intersections. Caulk that has cracked, pulled away from one surface, or gone hard and brittle is no longer sealing against water. Recaulking is part of any proper [${s2.text}](/${s2.city}/${s2.svc}) project.

## The Preparation Reality

Surface preparation determines 80 percent of how long your next paint job will last. This is the step that separates a five-year paint job from a twelve-year paint job, and it is the step most often shortchanged by contractors trying to deliver the lowest bid.

Professional preparation for exterior painting in Illinois includes:

- Complete pressure washing at appropriate PSI for your siding material (vinyl and aluminum require lower pressure than wood)
- Scraping every square inch of loose, cracked, or peeling paint down to a sound edge
- Sanding scraped areas to feather edges and create mechanical adhesion
- Replacing rotted wood - we check every board, window sill, fascia run, and trim piece
- Recaulking every failed joint with high-quality, paintable exterior caulk rated for at least 25 years
- Spot priming bare wood, repaired areas, and stain-prone substrates like cedar or redwood
- Full priming of any surface that has been stripped to bare substrate

Homes in ${c4} that were built before 1978 may contain lead paint. Any disturbance of lead paint requires EPA RRP-certified contractors following specific containment and disposal protocols. D&D Pro Painting maintains current RRP certification for exactly this reason.

## Paint Selection and Application

For Illinois exterior work, we recommend premium 100-percent acrylic latex paint from Sherwin-Williams (Duration or Emerald) or Benjamin Moore (Aura Exterior or Regal Select). These products cost $55 to $85 per gallon versus $25 to $40 for builder-grade alternatives, but the performance difference is dramatic. Premium acrylics maintain flexibility through our extreme temperature range, resist UV degradation longer, and shed dirt and mildew better.

Two full coats are non-negotiable. Each coat adds approximately 1.5 mils of dry film thickness. You need 3 or more mils total to achieve the film integrity that resists UV breakdown for a decade in Illinois conditions. One coat might look fine at completion, but it will fail years earlier than two coats.

The ${artLink(a2)} provides specific pricing data for what professional exterior work costs across the western suburbs, broken down by home size and siding type.

## HOA and Neighborhood Considerations

Many subdivisions in ${CN[s1.city]}, ${CN[s3.city]}, and throughout DuPage County require color approval before exterior painting begins. Submitting an unapproved color and painting anyway can result in fines and mandatory repainting at your expense. We maintain current palette documentation for active HOAs across our service area and handle the approval submission process for our clients.

Even in neighborhoods without formal HOAs, consider how your color choice interacts with neighboring homes. Extreme color departures can create tension and may affect resale value. Our ${artLink(a3)} covers color strategy in more depth.

## Timing and Scheduling

Exterior painting season in Illinois runs from late April through mid-October, with May through September offering the most reliable conditions. The critical temperature threshold is 50 degrees Fahrenheit overnight - paint applied below this minimum does not cure properly and will fail prematurely.

Spring and early summer slots book fastest. If your inspection reveals the need for work this season, contact us early. D&D Pro Painting provides free on-site estimates throughout ${c4} and all surrounding communities. Call (331) 241-6600 to schedule, or request an estimate through our contact form.`;

  const takeaways = [
    "Surface preparation determines 80% of how long your exterior paint job lasts - never shortchange this step",
    "Illinois homes endure 80-100 freeze-thaw cycles annually, making premium 100% acrylic latex paint essential",
    "Two full coats provide 3+ mils of film thickness - the threshold for decade-long UV and weather protection",
    "South and west-facing walls degrade 2-3 years faster than north-facing walls on the same house",
    "Delaying repainting after coating failure typically doubles the eventual project cost from spreading rot",
    "Pre-1978 homes may contain lead paint requiring EPA RRP-certified contractors for safe handling",
    "HOA color approval should be secured before any exterior painting begins to avoid fines and forced repaints",
  ];

  const faqs = [
    {question:"When is the best time to paint a house exterior in Illinois?",answer:"Late April through mid-October, once overnight temperatures stay consistently above 50 degrees Fahrenheit. May through September offers the most reliable conditions. Avoid painting in direct midday sun above 90 degrees - professional crews work early mornings and shaded elevations during peak summer. Fall often delivers ideal painting weather with moderate temperatures and lower humidity."},
    {question:"How long does professional exterior painting last in Illinois?",answer:"Premium paint with thorough professional preparation lasts 8-12 years on most Illinois homes. Budget work with minimal prep typically fails in 2-4 years. The biggest factor is preparation quality - properly scraped, primed, and caulked surfaces hold paint dramatically longer than shortcuts."},
    {question:"How much does exterior painting cost in the Chicago suburbs?",answer:"Most two-story homes in the western suburbs run $6,000 to $12,000 for professional work with premium paint and complete preparation. Smaller single-story homes start around $3,500. The primary cost driver is preparation scope - homes with significant peeling, rot, or lead paint require more labor before any color goes on."},
    {question:"Do I need to be home during exterior painting?",answer:"No. Exterior painting crews work entirely outside and do not need interior access. We coordinate scheduling in advance so you know which days crews will be on-site. We do ask that vehicles be moved from driveways on spray days and that pets be kept inside during active painting near doorways."},
  ];

  return { content, takeaways, faqs };
}

function buildInterior(t, arts, svcs, cities) {
  const a1 = arts[0], a2 = arts[1], a3 = arts[2] || arts[0];
  const s1 = svcs[0], s2 = svcs[1], s3 = svcs[2] || svcs[0];
  const c4 = cities;

  const content = `${t.title.replace(/:/g," -")} comes up in nearly every consultation we do across ${c4} and the broader western Chicago suburbs. Whether you are refreshing a single room or planning a multi-room project, the principles below are what we have learned across 15 years and hundreds of interior painting projects in Illinois homes.

## Starting with the Right Foundation

Every successful interior paint job starts well before the first roller touches a wall. The decisions you make about preparation, product selection, and color directly determine whether you will love the result for a decade or regret it within a year.

The most important factor most homeowners overlook is wall condition. Walk through your space and run your hand along the walls. Feel for bumps, ridges, nail pops, and hairline cracks. Mark each one with a piece of painter's tape. Every imperfection visible before painting will be more visible after painting - new paint draws the eye to surface flaws rather than hiding them. Our [${s1.text}](/${s1.city}/${s1.svc}) crews spend 30 to 40 percent of total project time on surface preparation for exactly this reason.

For homes with existing damage, whether that is water stains, settling cracks, or drywall tape failure, repairs must be completed and fully cured before any primer or paint is applied. Painting over damage does not hide it - it frames it.

## Selecting the Right Paint and Finish

Paint sheen selection matters as much as color choice, and most homeowners give it almost no thought. Here is what we recommend based on real-world performance in Illinois homes:

**Flat or matte finish** works best for ceilings and low-traffic formal rooms where a soft, non-reflective appearance is preferred. Flat paint hides surface imperfections better than any other sheen, which is why it is the standard for ceilings. The tradeoff is that flat finishes are harder to clean and more susceptible to scuffing.

**Eggshell finish** is our most recommended sheen for living rooms, bedrooms, hallways, and dining rooms. It provides a subtle warmth and soft luster while being significantly more washable than flat. For families in ${c4} with children or pets, eggshell hits the ideal balance between appearance and durability.

**Satin finish** is appropriate for kitchens, bathrooms, laundry rooms, and any space with regular moisture exposure. Satin resists moisture and cleans easily, making it the practical choice for high-humidity environments. We use satin extensively for [${s2.text}](/${s2.city}/${s2.svc}) projects where steam and splatter are daily realities.

**Semi-gloss finish** belongs on trim, baseboards, doors, and crown molding. The higher sheen creates visual contrast against wall surfaces and provides the most durable, washable finish available. Semi-gloss is also easier to wipe clean, which matters for baseboards and door frames that accumulate scuffs and fingerprints.

For brand selection, we primarily use Sherwin-Williams (Emerald or SuperPaint lines) and Benjamin Moore (Aura or Regal Select) for interior work. Both brands offer premium 100-percent acrylic formulations that deliver excellent coverage in fewer coats, superior color accuracy, and better washability over time than builder-grade alternatives. The ${artLink(a1)} breaks down specific product recommendations by room type.

## Color Selection Without Regret

Color drives more anxiety than any other part of an interior painting project, and for good reason - you will live with this decision daily for years. Here is the systematic approach we use with clients:

**Test under your specific lighting.** The same gray can look blue in a north-facing bedroom, green in a south-facing kitchen, and perfectly neutral in an east-facing living room. Buy sample pots and paint 2-foot squares on at least two walls in the room. Observe at morning, midday, and evening with both natural and artificial light before committing.

**Consider the full sight line.** In open-concept homes common throughout ${CN[s1.city]} and ${CN[s2.city]}, colors in connected spaces must coordinate. You do not need the same color everywhere, but you need colors from the same tonal family that transition smoothly when viewed together. The ${artLink(a2)} provides a detailed methodology for selecting colors that flow.

**Work from the fixed elements.** Your flooring, countertops, tile, and cabinetry are not changing. Any wall color must harmonize with these permanent features. Start your color selection from the fixed elements and work toward the walls, not the other way around.

## Room Sequencing and Planning

For multi-room interior projects, painting order matters for both efficiency and livability. Professional crews work in a specific sequence:

Start with ceilings throughout the project area - ceiling work is the messiest phase and must happen before walls are finished. Next, walls are cut in at all edges and corners, then rolled. Trim, baseboards, and doors are painted last because they require the most precision and benefit from the walls being finished first.

For homeowners living in the home during a project, we plan room sequencing so you always have access to finished spaces. Bedrooms and bathrooms are typically scheduled in pairs so you never lose access to sleeping and bathing at the same time. Our ${artLink(a3)} covers project timelines in detail.

## The Professional Difference

The gap between professional interior painting and DIY is less about the actual rolling of paint onto walls and more about the hundreds of small details that add up to a polished result. Clean cutting lines where walls meet ceilings and trim. Properly filled and sanded nail holes that disappear under paint rather than showing through. Consistent sheen across large wall surfaces with no lap marks or roller tracks. Smooth, drip-free trim with no brush strokes visible.

These details require specific tools, trained technique, and the patience that comes from doing this work professionally every day. A single room that takes a homeowner an entire weekend typically takes a two-person professional crew six to eight hours with noticeably better results.

D&D Pro Painting provides free on-site estimates for [${s3.text}](/${s3.city}/${s3.svc}) and all interior painting scopes across ${c4}. Call (331) 241-6600 to schedule.`;

  const takeaways = [
    "Wall preparation accounts for 30-40% of professional project time and directly determines final quality",
    "Eggshell finish is the best all-around choice for most living spaces - balancing appearance with washability",
    "Test paint colors on two walls minimum and observe at morning, midday, and evening before committing",
    "In open floor plans, choose colors from the same tonal family for smooth visual transitions between spaces",
    "Semi-gloss on trim creates visual contrast and provides the most durable, cleanable finish for high-touch surfaces",
    "Professional crews sequence rooms so homeowners always have access to sleeping and bathing spaces during the project",
    "Premium paints (Sherwin-Williams Emerald, Benjamin Moore Aura) deliver better coverage, color accuracy, and washability than builder-grade options",
  ];

  const faqs = [
    {question:"How long does interior painting take per room?",answer:"A standard bedroom or living room takes a professional two-person crew 1-2 days including preparation, priming where needed, two finish coats, and trim. Master bedrooms with vaulted ceilings or complex trim may take 2-3 days. Full home projects run 10-30 working days depending on size, condition, and the scope of preparation required."},
    {question:"Can I stay in my home during interior painting?",answer:"Yes. We sequence work so you always have access to at least one bedroom and bathroom at all times. Low-VOC paints allow same-day reoccupancy of finished rooms with minimal odor. Most families stay in place throughout even multi-week projects without significant disruption."},
    {question:"What sheen should I use for interior walls?",answer:"Eggshell for most living spaces (living rooms, bedrooms, hallways, dining rooms). Satin for kitchens, bathrooms, and laundry rooms. Flat for ceilings. Semi-gloss for all trim, baseboards, doors, and crown molding. This combination provides the right balance of appearance and durability for each surface type."},
    {question:"How often does interior paint need to be redone?",answer:"In a well-maintained home, professional interior painting lasts 7-12 years depending on traffic, sunlight exposure, and household wear. High-traffic areas like hallways and kids rooms may need refreshing sooner. Regular cleaning with gentle soap and water extends paint life significantly."},
  ];

  return { content, takeaways, faqs };
}

function buildTips(t, arts, svcs, cities) {
  const a1 = arts[0], a2 = arts[1], a3 = arts[2] || arts[0];
  const s1 = svcs[0], s2 = svcs[1], s3 = svcs[2] || svcs[0];
  const c4 = cities;

  const content = `${t.title.replace(/:/g," -")} is something homeowners across ${c4} and the broader western Chicago suburbs ask about regularly. Based on 15 years of professional painting experience and hundreds of completed projects, here is what we know works - and what does not.

## Understanding the Fundamentals

Good painting results - whether interior or exterior - depend on the same core principles regardless of the specific project. Surface condition, product selection, application technique, and environmental conditions all interact. Shortcutting any single element compromises the entire system.

The biggest misconception we encounter in consultations across ${CN[s1.city]}, ${CN[s2.city]}, and surrounding communities is that paint quality alone determines results. Premium paint on a poorly prepared surface will fail just as quickly as bargain paint. The substrate must be clean, sound, dry, and properly primed before topcoat application. This principle applies whether you are tackling [${s1.text}](/${s1.city}/${s1.svc}) or a single accent wall in a bedroom.

## What Most Homeowners Get Wrong

**Skipping the repair phase.** Cracks, nail pops, water stains, peeling, and joint failures must be addressed before painting begins. These problems do not get better under a coat of paint - they get worse and become more visible. Every dollar spent on repair and preparation saves three to five dollars in premature repainting costs.

**Choosing the cheapest bid.** In the painting industry, the lowest bid almost always means shortcuts in preparation. A contractor who quotes significantly below competitors is either skipping steps, using inferior products, or underinsuring their operation. The ${artLink(a1)} explains what goes into professional estimates and why legitimate pricing reflects the actual scope of work.

**Not testing colors in place.** Two-inch chips under hardware store lighting tell you almost nothing about how a color will perform in your specific room under your specific lighting conditions. Buy quart samples. Paint 24-inch squares on at least two different walls. Live with them for two to three days, observing at morning, noon, evening, and under artificial light. This $15 to $30 investment prevents $2,000 to $8,000 color mistakes.

**Ignoring sheen selection.** Gloss level affects both appearance and performance. Using flat paint in a kitchen (where it will absorb grease and resist cleaning) or semi-gloss on a living room wall (where it will highlight every surface imperfection) are common mistakes that undermine otherwise good color choices. The ${artLink(a2)} provides room-by-room sheen recommendations.

## The Professional Preparation Process

Whether the scope is [${s2.text}](/${s2.city}/${s2.svc}) or a full home repaint, professional preparation follows a consistent sequence:

**Assessment and documentation.** We photograph and note every condition issue before work begins. This creates a clear record of existing damage versus new work and ensures nothing gets overlooked during execution.

**Surface cleaning.** Interior walls get wiped down to remove dust, cobwebs, and surface grime. Exterior surfaces get pressure washed at appropriate PSI. Kitchen and bathroom walls get degreased. Paint does not bond to dirty surfaces.

**Repair work.** Holes get filled with appropriate compound (lightweight spackle for small holes, setting-type compound for larger repairs). Cracks get opened, filled, and taped where necessary. Peeling areas get scraped to a sound edge and sanded smooth. Rotted exterior wood gets replaced with solid stock or epoxy consolidant.

**Priming.** Bare surfaces, stain-prone areas, repaired spots, and any surface changing dramatically in color get primed with the appropriate product. Primer is not optional - it provides the adhesion bridge between substrate and topcoat and blocks stains from telegraphing through the finish.

## Product Selection Matters

For interior work in Illinois homes, we recommend Sherwin-Williams Emerald or Benjamin Moore Aura for premium results, and Sherwin-Williams SuperPaint or Benjamin Moore Regal Select for strong mid-range performance. All four are 100-percent acrylic formulations with excellent coverage, color accuracy, and long-term washability.

For exterior work, product selection must account for Illinois temperature extremes and moisture exposure. Our ${artLink(a3)} covers exterior product recommendations in detail.

Paint technology has improved substantially in the last decade. Modern premium paints offer better coverage per coat, faster dry times, lower odor, and significantly better durability than products available even five years ago. If your reference point for paint performance is a project from 2015, expect meaningfully better results today.

## When to Hire a Professional vs DIY

Some painting projects make sense for capable homeowners. A single bedroom with good wall condition and simple trim is a reasonable weekend project for someone with patience and basic skills.

Projects that should always go to a professional:
- Any room with ceiling heights above 10 feet (safety equipment required)
- Exterior painting of any scope (ladder safety, weather management, product expertise)
- Homes built before 1978 (potential lead paint requiring EPA RRP certification)
- Kitchens and bathrooms (moisture management and specific product requirements)
- Multi-room or whole-home projects (sequencing, consistency, and timeline management)
- [${s3.text}](/${s3.city}/${s3.svc}) or any commercial scope

D&D Pro Painting provides free on-site estimates throughout ${c4} and surrounding communities. Call (331) 241-6600 to discuss your project scope.`;

  const takeaways = [
    "Surface preparation determines results more than paint brand or price - never shortchange the repair and priming phase",
    "The cheapest painting bid almost always means shortcuts in preparation that cost more in premature failure",
    "Test paint colors in your actual space for 2-3 days under natural and artificial light before committing",
    "Sheen selection (flat, eggshell, satin, semi-gloss) affects both appearance and performance - match to room function",
    "Modern premium paints offer dramatically better coverage, durability, and washability than products from even 5 years ago",
    "Professional painting is essential for heights above 10 feet, pre-1978 homes, exteriors, and multi-room projects",
    "Every dollar spent on preparation saves $3-$5 in premature repainting costs",
  ];

  const faqs = [
    {question:"How do I choose between professional painting and DIY?",answer:"Single rooms with good wall condition and simple trim are reasonable DIY projects. Anything involving heights above 10 feet, exterior surfaces, multiple rooms, pre-1978 homes, or kitchens and bathrooms should go to a professional for safety, product expertise, and consistent results."},
    {question:"What questions should I ask a painting contractor before hiring?",answer:"Ask about insurance coverage (general liability and workers compensation), preparation process specifics, paint brands and products they use, timeline expectations, warranty terms, and references from recent similar projects. Any contractor who cannot answer these confidently is not ready for your project."},
    {question:"How far in advance should I schedule a painting project?",answer:"For exterior work, schedule estimates in February or March for spring start dates. For interior work, 3-4 weeks lead time is typical during busy seasons (spring and fall), with shorter availability during winter months. Holiday preparation projects should be booked by early October."},
    {question:"Does D&D Pro Painting offer free estimates?",answer:"Yes. On-site estimates are completely free with no obligation. We measure, assess surface condition, discuss colors and scope, and provide a written itemized quote within 48 hours. Estimates remain valid for 60 days. Call (331) 241-6600 to schedule."},
  ];

  return { content, takeaways, faqs };
}

// ── main ─────────────────────────────────────────────────────────────
const published = [];
let created = 0;

for (let i = 0; i < TOPICS.length; i++) {
  const t = TOPICS[i];
  const pool = safeArts(i, published);
  const artLinks = pickArtLinks(pool, t.cat, 3);
  const svcLinks = pickSvcLinks(t.cat, 3);
  const cities = cityNames(4);
  const builder = BUILDERS[t.cat] || buildTips;
  const { content, takeaways, faqs } = builder(t, artLinks, svcLinks, cities);
  const words = content.split(/\s+/).length;

  const article = {
    slug: t.slug,
    title: t.title,
    metaDescription: (t.title + ". Expert guidance from D&D Pro Painting serving " + cities + " and surrounding Chicago suburbs. Call (331) 241-6600.").slice(0,160),
    heroImage: IMGS[i % IMGS.length],
    heroImageAlt: t.title + " - professional painting in the Chicago suburbs",
    category: t.cat,
    publishDate: dates[i],
    readTime: Math.ceil(words / 200) + " min read",
    content,
    keyTakeaways: takeaways,
    faqs,
  };

  const fn = `${dates[i]}_${t.slug}.json`;
  fs.writeFileSync(path.join(QUEUE, fn), JSON.stringify(article, null, 2), "utf-8");
  published.push({ slug: t.slug, title: t.title });
  created++;
}

console.log(`Generated ${created} articles in queue/`);
console.log(`Schedule: ${dates[0]} through ${dates[dates.length-1]}`);
const avgWords = Math.round(fs.readdirSync(QUEUE).reduce((sum, f) => {
  const a = JSON.parse(fs.readFileSync(path.join(QUEUE, f), "utf-8"));
  return sum + a.content.split(/\s+/).length;
}, 0) / created);
console.log(`Average word count: ${avgWords}`);
