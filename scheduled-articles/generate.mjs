#!/usr/bin/env node
/**
 * Generates scheduled article JSON files in queue/.
 * Each file is a complete article ready for publish.mjs to inject into articles.ts.
 *
 * Run:  node scheduled-articles/generate.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const QUEUE = path.join(__dirname, "queue");
const TOPICS = JSON.parse(fs.readFileSync(path.join(__dirname, "topics.json"), "utf-8"));

fs.mkdirSync(QUEUE, { recursive: true });

// ── schedule: 3-4 day random gaps ────────────────────────────────────
function makeDates(start, n) {
  const dates = [];
  let cur = new Date(start);
  for (let i = 0; i < n; i++) {
    dates.push(cur.toISOString().slice(0, 10));
    cur = new Date(cur.getTime() + (3 + Math.round(Math.random())) * 864e5);
  }
  return dates;
}

const dates = makeDates("2026-04-29", TOPICS.length);

// ── existing slugs (always safe to link) ─────────────────────────────
const LIVE = [
  "how-to-choose-interior-paint-colors",
  "exterior-painting-preparation-guide",
  "benefits-of-professional-painting-vs-diy",
  "deck-staining-maintenance-guide-illinois",
  "interior-painting-cost-guide-chicago-suburbs",
  "kitchen-cabinet-painting-vs-replacement-illinois",
  "best-interior-paint-colors-chicago-homes-2026",
  "exterior-painting-cost-guide-chicago-suburbs-2026",
  "popcorn-ceiling-removal-illinois-guide",
  "pre-sale-painting-roi-chicago-suburbs",
  "hoa-approved-exterior-paint-colors-dupage",
  "whole-home-interior-painting-timeline",
];

const CITIES = ["woodridge","naperville","downers-grove","hinsdale","oak-brook","burr-ridge","glen-ellyn","bolingbrook","lemont","homer-glen","lockport","mokena"];
const CNAMES = {woodridge:"Woodridge",naperville:"Naperville","downers-grove":"Downers Grove",hinsdale:"Hinsdale","oak-brook":"Oak Brook","burr-ridge":"Burr Ridge","glen-ellyn":"Glen Ellyn",bolingbrook:"Bolingbrook",lemont:"Lemont","homer-glen":"Homer Glen",lockport:"Lockport",mokena:"Mokena"};
const SVCS = ["interior-painting","exterior-painting","cabinet-painting","ceiling-painting","popcorn-ceiling-removal","kitchen-painting","pressure-washing","deck-staining","fence-staining","drywall-repair","epoxy-flooring","commercial-painting"];

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

function pick(arr, n = 1) { const s = [...arr].sort(() => Math.random() - .5); return n === 1 ? s[0] : s.slice(0, n); }
function cityLink(c, svc) { return `[${svc.replace(/-/g, " ")} in ${CNAMES[c]}](/${c}/${svc})`; }
function artLink(slug) {
  const t = slug.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());
  return `[${t}](/resources/${slug})`;
}

// ── content builder ──────────────────────────────────────────────────
function buildContent(topic, idx, published) {
  const allSafe = [...LIVE, ...published];
  const cs = pick(CITIES, 4);
  const cityList = cs.map(c => CNAMES[c]).join(", ");

  // pick 2-3 safe article links relevant to category
  let relArts;
  if (topic.cat.includes("Exterior") || topic.cat.includes("Deck")) {
    relArts = allSafe.filter(s => s.includes("exterior") || s.includes("hoa") || s.includes("deck") || s.includes("pre-sale") || s.includes("pressure"));
  } else if (topic.cat.includes("Interior")) {
    relArts = allSafe.filter(s => s.includes("interior") || s.includes("color") || s.includes("cabinet") || s.includes("popcorn") || s.includes("whole-home") || s.includes("cost"));
  } else {
    relArts = allSafe.filter(s => s.includes("professional") || s.includes("cost") || s.includes("interior") || s.includes("exterior"));
  }
  relArts = pick(relArts.length ? relArts : allSafe, Math.min(3, relArts.length || 1));
  if (!Array.isArray(relArts)) relArts = [relArts];

  // pick a service link
  const svc = topic.cat.includes("Exterior") ? "exterior-painting" : topic.cat.includes("Interior") ? "interior-painting" : pick(SVCS);
  const svcCity = pick(CITIES);

  const meta = topic.title.replace(/['"]/g, "") + ". Expert guidance from D&D Pro Painting serving " + cityList + " and surrounding Chicago suburbs.";

  const content = buildBody(topic, cs, svc, svcCity, relArts);
  const words = content.split(/\s+/).length;

  return {
    slug: topic.slug,
    title: topic.title,
    metaDescription: meta.slice(0, 160),
    heroImage: IMGS[idx % IMGS.length],
    heroImageAlt: topic.title + " - Chicago suburb home",
    category: topic.cat,
    publishDate: dates[idx],
    readTime: Math.ceil(words / 200) + " min read",
    content,
    keyTakeaways: buildTakeaways(topic),
    faqs: buildFaqs(topic, relArts),
  };
}

function buildBody(t, cs, svc, svcCity, relArts) {
  const cn = cs.map(c => CNAMES[c]);
  const svcName = svc.replace(/-/g, " ");
  const artLinkStr = relArts.map(s => artLink(s)).join(", ");
  const cityLinkStr = cityLink(svcCity, svc);

  // Build unique sections based on slug keywords
  const slug = t.slug;
  const title = t.title;

  // Intro paragraph
  let intro = `${title.replace(/:/g, " -")} is a question we hear regularly from homeowners across ${cn[0]}, ${cn[1]}, and the broader western Chicago suburbs. After 15 years and hundreds of projects, D&D Pro Painting has developed clear answers backed by hands-on experience rather than theory.`;

  // Section 1
  let s1Title, s1Body;
  if (slug.includes("exterior")) {
    s1Title = "Understanding the Scope";
    s1Body = `Exterior painting in the Chicago suburbs involves more than applying color to walls. Illinois weather - temperature swings exceeding 100 degrees annually, 80-100 freeze-thaw cycles, persistent moisture from spring through fall - puts extraordinary stress on every painted surface. Any approach to ${svcName} must account for these conditions or the results will disappoint within a few seasons.\n\nHomeowners in ${cn[2]} and ${cn[3]} frequently ask us to repaint homes where a previous contractor skipped critical preparation steps. The pattern is consistent: paint that looked fine at completion begins failing within 18-24 months because the foundation underneath was not properly addressed.`;
  } else if (slug.includes("interior")) {
    s1Title = "Why This Matters for Your Home";
    s1Body = `Interior paint affects your daily experience more than almost any other design element. You see your walls from the moment you wake up until you go to sleep. The colors, sheen, and condition of your interior paint shapes how rooms feel, how large spaces appear, and how well your home photographs for real estate listings.\n\nAcross ${cn[0]}, ${cn[1]}, and the surrounding communities, we consistently see homeowners underestimate how much their interior paint choices affect daily comfort and long-term property value. Getting this right pays dividends for years.`;
  } else {
    s1Title = "The Foundation of Good Results";
    s1Body = `Every successful painting project - interior or exterior - starts with proper understanding of the scope, timeline, and decision points involved. Homeowners in ${cn[0]} and ${cn[1]} who take time to understand the process before starting consistently report better outcomes than those who rush into contractor selection based on price alone.\n\nD&D Pro Painting provides detailed consultation before any project begins because informed homeowners make better decisions and experience fewer surprises during execution.`;
  }

  // Section 2 - practical detail
  let s2Title, s2Body;
  if (slug.includes("color") || slug.includes("paint-colors")) {
    s2Title = "Color Selection Strategy";
    s2Body = `Selecting the right colors requires evaluating your specific conditions: the direction your rooms or walls face, the fixed elements you cannot change (flooring, stone, brick, cabinetry), and the architectural style of your home.\n\nSouth-facing surfaces in ${cn[0]} receive intense direct light that washes out color and amplifies warmth. North-facing surfaces get diffuse cool light that flatters blues and grays but drains warmth from beiges. East-facing surfaces change character dramatically from morning to afternoon. Test every color candidate under the specific lighting conditions of your space before committing.\n\nFor a comprehensive approach to color selection, see our ${artLinkStr.split(",")[0]}. D&D Pro Painting includes professional color consultation with every project - we bring oversized samples to your home and evaluate under real conditions.`;
  } else if (slug.includes("prep") || slug.includes("repair") || slug.includes("fix")) {
    s2Title = "Preparation Is the Real Work";
    s2Body = `Professional preparation accounts for 40-60% of project time and cost - and it should. Paint is only as durable as the surface underneath it. Skipping preparation to save time or money is the single most expensive shortcut in the painting industry.\n\nFor exterior work, this means thorough pressure washing, complete scraping of all loose paint, sanding to create a mechanical bond, wood repair where needed, caulk replacement at every failed joint, and strategic priming. For interior work, it means patching every hole, sanding every rough spot, priming stains, and ensuring surfaces are clean and sound.\n\nOur ${cityLinkStr} crews follow the same preparation protocol on every project regardless of price point because cutting preparation always costs more in the long run.`;
  } else if (slug.includes("cost") || slug.includes("price") || slug.includes("roi")) {
    s2Title = "Understanding the Investment";
    s2Body = `Painting costs in the Chicago suburbs reflect labor market conditions, material quality, and the preparation intensity that Illinois conditions demand. A legitimate professional quote includes thorough preparation, premium materials, skilled application, and warranty coverage.\n\nThe cheapest quote almost always cuts preparation time - the component that most determines how long your paint job will last. A $4,000 paint job that fails in 3 years costs more per year than a $7,000 job that lasts 10 years. Professional homeowners in ${cn[2]} and ${cn[3]} increasingly evaluate cost on a per-year basis rather than upfront total.\n\nFor detailed pricing data, see our ${artLinkStr.split(",")[0]}.`;
  } else {
    s2Title = "What to Expect from the Process";
    s2Body = `Understanding the process eliminates surprises and helps you plan around the disruption any painting project creates. Whether you are scheduling ${svcName} or a different scope, the sequence follows a predictable pattern: consultation, color selection, preparation, application, and final walkthrough.\n\nIn ${cn[0]} and surrounding communities, D&D Pro Painting typically provides a written estimate within 48 hours of an on-site visit. Color consultation follows, then scheduling based on weather (exterior) or your household schedule (interior). Execution timelines depend on scope - single rooms take 1-2 days, whole-home projects take 10-30 working days.\n\nSee related guidance: ${artLinkStr}.`;
  }

  // Section 3 - local expertise
  let s3Title = "Local Considerations for Chicago Suburb Homeowners";
  let s3Body = `Painting in the western Chicago suburbs carries specific considerations that generic online advice often misses.\n\n**Illinois climate impact.** Temperature extremes from -15 to 100+ degrees Fahrenheit mean paint must flex without cracking through the full annual range. Products formulated for milder climates underperform here.\n\n**HOA requirements.** Many ${cn[0]} and ${cn[1]} subdivisions require color approval before painting begins. Painting without approval can trigger fines and forced repainting - an expensive mistake. Our team navigates HOA submissions routinely and maintains current palette documentation for active subdivisions.\n\n**Seasonal timing.** Exterior painting season runs April through October in most years. Interior painting works year-round, with winter offering lower humidity and faster dry times. Spring and fall are peak demand seasons - book 4-6 weeks ahead for these windows.\n\n**Local building codes.** Homes built before 1978 may contain lead paint that requires EPA RRP-certified contractors for any disturbance. D&D Pro Painting maintains current RRP certification and follows all required containment and documentation protocols.`;

  // Section 4 - getting started
  let s4Title = "Getting Started";
  let s4Body = `Schedule a free on-site estimate by calling (331) 241-6600. We serve all 12 communities throughout the western Chicago suburbs including ${cn.join(", ")} and surrounding areas. Written estimates are provided within 48 hours of the on-site visit and remain valid for 60 days.\n\nFor related reading:\n- ${artLinkStr.split(",").join("\n- ")}\n- ${cityLinkStr}`;

  return `${intro}\n\n## ${s1Title}\n\n${s1Body}\n\n## ${s2Title}\n\n${s2Body}\n\n## ${s3Title}\n\n${s3Body}\n\n## ${s4Title}\n\n${s4Body}`;
}

function buildTakeaways(t) {
  const base = [
    `Illinois climate demands premium materials and thorough preparation for lasting results`,
    `Professional color consultation eliminates costly repainting mistakes`,
    `Spring and fall are peak demand - book estimates 4-6 weeks ahead`,
    `Combined scopes save 15-25% versus scheduling separate projects`,
    `D&D Pro Painting provides free on-site estimates valid for 60 days across 12 Chicago suburb communities`,
  ];
  if (t.cat.includes("Exterior")) {
    base.unshift("Exterior painting season in Illinois runs April through October - overnight temps must stay above 50F");
    base.unshift("Surface preparation accounts for 40-60% of project cost and determines long-term durability");
  } else if (t.cat.includes("Interior")) {
    base.unshift("Interior painting works year-round in Illinois, with winter offering lower humidity and faster drying");
    base.unshift("Test paint colors under your room's specific lighting at morning, midday, and evening before committing");
  }
  return base.slice(0, 6);
}

function buildFaqs(t, relArts) {
  const faqs = [];
  if (t.cat.includes("Exterior")) {
    faqs.push({ question: "What is the best time of year for exterior painting in Illinois?", answer: "Late April through mid-October, when overnight temperatures consistently stay above 50 degrees Fahrenheit. May through September provides the most reliable conditions. Avoid painting in direct midday sun above 90 degrees - professional crews work early mornings and shaded elevations during peak summer heat." });
    faqs.push({ question: "How much does exterior painting cost in the Chicago suburbs?", answer: "Typical two-story homes run $6,000-$10,000 for professional work with premium paint and thorough preparation. Smaller homes start around $3,500. Estate homes in Hinsdale and Oak Brook can run $15,000-$35,000+. The biggest cost driver is preparation intensity, which directly determines how long the paint job lasts." });
    faqs.push({ question: "How long does professional exterior painting take?", answer: "Most single-family homes take 5-10 working days including preparation, priming, and two finish coats. Larger homes and estate properties may take 2-3 weeks. Weather delays are common during Illinois spring and fall - professional contractors build buffer days into the schedule." });
  } else if (t.cat.includes("Interior")) {
    faqs.push({ question: "How long does interior painting take per room?", answer: "A single standard-size room typically takes 1-2 days for professional work including preparation, priming where needed, two finish coats, and trim painting. Master bedrooms and great rooms with high ceilings may take 2-3 days. Whole-home projects run 10-30 working days depending on home size." });
    faqs.push({ question: "What interior paint finish should I use?", answer: "Flat or matte for ceilings and formal rooms, eggshell for most living spaces (best balance of appearance and washability), satin for kitchens and bathrooms (moisture resistance), and semi-gloss for trim, doors, and baseboards (durability and easy cleaning)." });
    faqs.push({ question: "Can I stay in my home during interior painting?", answer: "Yes. We sequence rooms so you always have access to at least one bedroom and bathroom as completed zones. Low-VOC paints allow same-day reoccupancy of finished rooms with no extended odor periods. Most families stay in place during 1-2 week projects." });
  } else {
    faqs.push({ question: "How do I get a painting estimate?", answer: "Call D&D Pro Painting at (331) 241-6600 or submit a request through our contact form. We schedule a free on-site visit where we measure, assess condition, discuss colors and scope, and provide a written itemized estimate within 48 hours. Estimates are valid for 60 days." });
    faqs.push({ question: "Does D&D Pro Painting serve my area?", answer: "We serve 12 communities throughout the western Chicago suburbs: Woodridge, Naperville, Downers Grove, Hinsdale, Oak Brook, Burr Ridge, Glen Ellyn, Bolingbrook, Lemont, Homer Glen, Lockport, and Mokena. We also serve surrounding areas within DuPage and Will Counties." });
    faqs.push({ question: "What brands of paint does D&D Pro Painting use?", answer: "We primarily use Sherwin-Williams (Duration, Emerald, SuperPaint lines) and Benjamin Moore (Aura, Regal Select). Both brands offer premium 100% acrylic formulations that deliver superior coverage, durability, and color retention. We recommend specific products based on each project's requirements." });
  }
  faqs.push({ question: "Do you offer free estimates?", answer: "Yes. On-site estimates are completely free with no obligation. We provide written, itemized quotes within 48 hours of the visit. Estimates are valid for 60 days. Call (331) 241-6600 to schedule." });
  return faqs;
}

// ── main ─────────────────────────────────────────────────────────────
const published = [];
let created = 0;

for (let i = 0; i < TOPICS.length; i++) {
  const article = buildContent(TOPICS[i], i, published);
  const filename = `${dates[i]}_${TOPICS[i].slug}.json`;
  fs.writeFileSync(path.join(QUEUE, filename), JSON.stringify(article, null, 2), "utf-8");
  published.push(TOPICS[i].slug);
  created++;
}

console.log(`Generated ${created} articles in queue/`);
console.log(`Schedule: ${dates[0]} through ${dates[dates.length - 1]}`);
console.log(`Total span: ${Math.round((new Date(dates[dates.length-1]) - new Date(dates[0])) / 864e5)} days`);
