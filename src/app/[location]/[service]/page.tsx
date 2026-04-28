import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, ArrowRight, Phone, Star, CheckCircle, ArrowLeft, ChevronDown, Lightbulb, BookOpen } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import AiAssistant from "@/components/AiAssistant";
import SeasonalPromos from "@/components/SeasonalPromos";
import { business, locations, services } from "@/data/business";
import { getLocationServiceContent } from "@/data/locationContent";
import { articles } from "@/data/articles";
import { renderInline, stripInlineMarkdown } from "@/lib/markdown";

interface Props {
  params: Promise<{ location: string; service: string }>;
}

const serviceKeyTakeaways: Record<string, (loc: string) => string[]> = {
  "interior-painting": (loc) => [
    `D&D Pro Painting provides expert interior painting in ${loc} with color consultation included at no extra cost`,
    `We protect all furniture, flooring, and belongings with professional-grade coverings throughout your ${loc} project`,
    `Our interior prep process includes filling nail holes, sanding rough spots, caulking gaps, and priming - ensuring a flawless finish`,
    `We use low-VOC and zero-VOC paints for healthier indoor air quality in your ${loc} home`,
    `Most interior rooms are completed in one to two days with minimal disruption to your household routine`,
    `Every interior painting project includes a final walkthrough to confirm every detail meets your expectations`,
  ],
  "exterior-painting": (loc) => [
    `Exterior painting in ${loc} requires products engineered for Illinois freeze-thaw cycles, UV exposure, and humidity`,
    `Our exterior prep includes pressure washing, scraping, sanding, wood repair, caulking, and targeted priming before any paint is applied`,
    `We use 100% acrylic latex exterior paints with advanced UV stabilizers for maximum durability in ${loc}'s climate`,
    `Proper exterior painting extends your home's protective envelope and prevents costly moisture damage to underlying structures`,
    `We schedule exterior projects during optimal weather windows - typically May through October in ${loc}`,
    `Transparent, itemized estimates ensure you understand exactly what your ${loc} exterior painting investment covers`,
  ],
  "pressure-washing": (loc) => [
    `Professional pressure washing in ${loc} removes years of dirt, mold, mildew, and atmospheric pollutants from exterior surfaces`,
    `We calibrate water pressure to each surface type - gentler for wood, higher for concrete and masonry - to prevent damage`,
    `Pressure washing is the essential first step before any exterior painting or staining project in ${loc}`,
    `Regular pressure washing extends the life of your existing paint and protects surfaces from biological growth damage`,
    `Our equipment delivers significantly more power and precision than consumer-grade pressure washers available for rent`,
    `We treat mold and mildew with biocidal agents that kill organisms at the root, not just remove surface discoloration`,
  ],
  "deck-staining": (loc) => [
    `Illinois weather subjects ${loc} decks to UV damage, moisture cycling, and freeze-thaw stress that destroys unprotected wood`,
    `We offer transparent, semi-transparent, semi-solid, and solid stain options matched to your deck's age and condition`,
    `Our deck prep includes board inspection, fastener repair, cleaning, brightening, and 48 to 72 hours of drying before stain application`,
    `Professional deck staining protects your $10,000 to $30,000 deck investment at a fraction of replacement cost`,
    `The optimal deck staining window in ${loc} runs from late spring through early fall when temperatures stay between 50 and 80 degrees`,
    `Two-coat application ensures maximum penetration, UV protection, and color richness for your ${loc} deck`,
  ],
  "fence-staining": (loc) => [
    `Fence staining in ${loc} protects wood from UV graying, moisture absorption, and rot that shortens fence lifespan by years`,
    `We clean and prep fence surfaces thoroughly - including removing old failing stain - before applying fresh protective coatings`,
    `Properly stained fences in ${loc} last 3 to 5 times longer than untreated wood exposed to Illinois weather extremes`,
    `We match stain colors to complement your home's exterior palette for a cohesive property appearance`,
    `Our fence staining process reaches both sides of every board for complete moisture protection, not just cosmetic coverage`,
    `Semi-transparent and semi-solid stains are our most recommended options for ${loc} fences, balancing grain visibility with UV protection`,
  ],
  "drywall-repair": (loc) => [
    `Our ${loc} drywall repair service handles everything from small nail holes to large sections of water damage or impact damage`,
    `We match existing wall textures - smooth, orange peel, knockdown, and skip trowel - so repairs blend invisibly with surrounding areas`,
    `Drywall repair is the essential first step before any interior painting project to ensure a smooth, professional finish`,
    `We address the root cause of drywall damage - including moisture sources and structural settling - not just the visible symptom`,
    `All repaired areas are primed with PVA or stain-blocking primer before painting to prevent flashing and ensure uniform sheen`,
    `Our ${loc} crews complete most drywall repairs and repainting in a single visit, minimizing disruption to your household`,
  ],
  "epoxy-flooring": (loc) => [
    `Professional epoxy flooring transforms ${loc} garage floors, basements, and commercial spaces with a durable, chemical-resistant surface`,
    `Our diamond-grinding surface preparation creates a profile that ensures permanent mechanical bond between concrete and epoxy coating`,
    `Epoxy floors resist oil stains, tire marks, chemical spills, and heavy foot traffic - lasting 10 to 20 years with proper installation`,
    `We offer decorative flake, metallic, quartz, and solid-color epoxy systems to match your aesthetic preferences`,
    `Proper moisture testing of concrete slabs prevents delamination - the number one cause of epoxy floor failure in ${loc}`,
    `Most residential garage epoxy projects in ${loc} are completed in two to three days, with full cure in five to seven days`,
  ],
  "commercial-painting": (loc) => [
    `D&D Pro Painting serves ${loc} businesses including offices, retail spaces, restaurants, medical facilities, and warehouses`,
    `We schedule commercial projects around your operating hours - evenings, weekends, and off-hours - to minimize business disruption`,
    `Low-VOC and zero-VOC products ensure safe indoor air quality for employees and customers during and after painting`,
    `Commercial-grade coatings provide superior durability and washability for high-traffic business environments in ${loc}`,
    `Our commercial crews maintain clean, organized job sites and follow all OSHA safety protocols throughout every project`,
    `We carry the comprehensive liability coverage levels that ${loc} property managers and landlords require`,
  ],
};

const serviceFaqs: Record<string, (loc: string, county: string) => { question: string; answer: string }[]> = {
  "interior-painting": (loc, county) => [
    { question: `How much does interior painting cost in ${loc}, IL?`, answer: `Interior painting in ${loc} typically costs $2 to $5 per square foot, with a standard bedroom running $400 to $800. Costs vary based on room size, ceiling height, trim complexity, surface condition, and color changes. D&D Pro Painting provides free, detailed estimates that itemize every component so there are no surprises. Call (331) 241-6600 to schedule yours.` },
    { question: `How long does it take to paint an interior room in ${loc}?`, answer: `Most standard rooms take 5 to 7 hours for our professional crew, including furniture protection, surface preparation, priming, two finish coats, and complete cleanup. Larger rooms or those requiring extensive prep may take a full day. We provide accurate timelines during your free consultation so you can plan accordingly.` },
    { question: `Do I need to move out during interior painting in ${loc}?`, answer: `No - we work room by room and take careful steps to contain dust and odors. We use low-VOC paints that produce minimal fumes, and most rooms can be used the same evening after painting. We protect all adjacent areas with professional drop cloths and plastic sheeting throughout the process.` },
    { question: `What interior paint brands do you use in ${loc}?`, answer: `We use premium paints from industry-leading manufacturers known for excellent coverage, durability, and color retention. We select specific products based on each room's requirements - washable eggshell for living spaces, moisture-resistant satin for bathrooms, and scrubbable finishes for high-traffic areas. Product recommendations are included in your free estimate.` },
  ],
  "exterior-painting": (loc, county) => [
    { question: `How long does exterior paint last in ${loc}, IL?`, answer: `With professional preparation and premium acrylic paint, exterior finishes in ${loc} typically last 7 to 10 years. Longevity depends on surface preparation quality, paint quality, color choice, sun exposure, and ongoing maintenance. Our thorough prep process maximizes the service life of every exterior project we complete in ${county}.` },
    { question: `What is the best time of year to paint a house exterior in ${loc}?`, answer: `The optimal window for exterior painting in ${loc} runs from late April through early October, when temperatures consistently stay between 50 and 85 degrees with moderate humidity. We avoid painting in direct midday sun and monitor weather forecasts to ensure proper curing conditions. We recommend booking spring and summer dates early as this is our busiest season.` },
    { question: `How much does it cost to paint a house exterior in ${loc}?`, answer: `Exterior painting in the ${loc} area typically ranges from $3,500 to $8,500 for an average-sized home, depending on square footage, number of stories, surface condition, and prep requirements. We provide free on-site estimates with transparent pricing that breaks down preparation, materials, and labor.` },
    { question: `Do you handle wood rot and siding repair before exterior painting?`, answer: `Absolutely. We never paint over rot or structural damage. Our prep phase includes replacing rotted wood, securing loose siding, re-caulking all joints, resetting popped fasteners, and priming all repairs before painting. This thorough approach is what allows our exterior finishes to last significantly longer than competitors who skip these critical steps.` },
  ],
  "pressure-washing": (loc, county) => [
    { question: `How much does pressure washing cost in ${loc}, IL?`, answer: `Pressure washing pricing in ${loc} varies by surface type and area. House washing typically runs $200 to $500, driveway cleaning $100 to $250, and deck cleaning $150 to $350. We provide free estimates based on the specific surfaces and square footage of your project.` },
    { question: `Will pressure washing damage my siding or deck in ${loc}?`, answer: `Not when performed by professionals. We calibrate pressure settings to each surface - lower PSI for wood siding and decks, higher for concrete driveways and masonry. Consumer-grade washers with fixed pressure settings are what cause damage. Our technicians are trained to clean effectively without harming substrates.` },
    { question: `How often should I pressure wash my ${loc} home?`, answer: `We recommend professional pressure washing every 1 to 2 years for most ${loc} homes. North-facing walls and shaded areas prone to mold may benefit from annual cleaning. Regular washing extends paint life, prevents biological damage, and maintains curb appeal.` },
    { question: `Can pressure washing remove paint from my house?`, answer: `Professional pressure washing at correct settings will not remove sound, well-adhered paint. It will remove loose, peeling, and flaking paint - which is actually desirable as the first step of exterior painting preparation. If you are planning to repaint, pressure washing is an essential prep step.` },
  ],
  "deck-staining": (loc, county) => [
    { question: `How often should I restain my deck in ${loc}, IL?`, answer: `Most ${loc} decks need restaining every 2 to 4 years depending on stain type, wood species, sun exposure, and foot traffic. Transparent stains may need annual reapplication while solid stains can last up to 5 years. We assess your specific conditions and recommend the optimal schedule during a free consultation.` },
    { question: `What type of deck stain is best for ${loc} weather?`, answer: `Semi-transparent stains are our most popular recommendation for ${loc} decks - they balance natural wood grain visibility with meaningful UV and moisture protection. For older decks with significant weathering, semi-solid or solid stains provide more coverage and longer protection. We recommend specific products based on your deck's wood species, age, and condition.` },
    { question: `Can you stain a new pressure-treated deck in ${loc}?`, answer: `New pressure-treated lumber needs 3 to 6 months of drying and weathering before staining. We test moisture content with professional meters to determine readiness - staining too early prevents proper absorption and wastes product. We are happy to schedule your staining project for the appropriate time.` },
    { question: `How much does deck staining cost in ${loc}?`, answer: `Professional deck staining in ${loc} ranges from $3 to $7 per square foot depending on deck size, condition, accessibility, and stain type. A typical 300-square-foot deck costs $900 to $2,100 for complete cleaning, preparation, and two-coat staining. Contact us for a free estimate specific to your deck.` },
  ],
  "fence-staining": (loc, county) => [
    { question: `How much does fence staining cost in ${loc}, IL?`, answer: `Fence staining in ${loc} typically costs $3 to $6 per linear foot depending on fence height, condition, and stain type. A standard 150-linear-foot privacy fence costs approximately $450 to $900 for complete preparation and staining. We provide free estimates based on your specific fence dimensions and condition.` },
    { question: `How long does fence stain last in ${loc}?`, answer: `With proper preparation and quality stain, fence staining in ${loc} lasts 3 to 5 years depending on sun exposure, stain type, and fence orientation. South and west-facing sections fade faster due to direct UV. Semi-solid stains generally outlast semi-transparent options by 1 to 2 years.` },
    { question: `Should I stain or paint my fence in ${loc}?`, answer: `We strongly recommend staining over painting for wood fences. Stain penetrates into wood fibers and allows the wood to breathe naturally, while paint sits on the surface and is prone to peeling and chipping - especially on fences that flex in wind. Solid stains provide paint-like color coverage with stain-like performance.` },
    { question: `Do you stain both sides of the fence?`, answer: `Yes - we apply stain to both sides of every fence board whenever accessible. Staining only one side allows moisture to enter from the untreated side, causing warping and premature rot. Complete coverage on both faces provides maximum wood protection and dramatically extends fence life in ${county}'s climate.` },
  ],
  "drywall-repair": (loc, county) => [
    { question: `How much does drywall repair cost in ${loc}, IL?`, answer: `Drywall repair costs in ${loc} vary by damage extent. Small patch repairs (nail holes, minor dings) typically cost $100 to $250 per area. Larger repairs from water damage or impact holes range from $250 to $600. We provide exact pricing during a free assessment of the damaged areas.` },
    { question: `Can you match my existing wall texture in ${loc}?`, answer: `Yes - texture matching is one of our specialties. We replicate smooth, orange peel, knockdown, skip trowel, and other common textures so repairs blend seamlessly with surrounding walls. Our technicians practice texture matching techniques regularly and can demonstrate samples before committing to a full repair.` },
    { question: `Do you fix water-damaged drywall in ${loc}?`, answer: `We repair water-damaged drywall throughout ${loc}, but we strongly recommend addressing the water source first. Once the leak is fixed, we remove all damaged and mold-affected drywall, treat framing with antimicrobial solution if needed, install new drywall, tape, mud, texture-match, prime, and paint the repaired area.` },
    { question: `How long does drywall repair take in ${loc}?`, answer: `Most drywall repairs require 2 to 3 visits: initial patching and mudding (day 1), sanding and second coat if needed (day 2), and final priming and painting (day 2 or 3). Drying time between mud coats drives the timeline. We schedule efficiently to minimize total project duration and disruption.` },
  ],
  "epoxy-flooring": (loc, county) => [
    { question: `How much does epoxy flooring cost in ${loc}, IL?`, answer: `Epoxy flooring in ${loc} typically costs $4 to $10 per square foot depending on the system chosen. A standard two-car garage (400 to 500 sq ft) ranges from $2,000 to $4,500 for diamond-ground preparation, base coat, decorative flake or color, and clear topcoat. We provide free estimates based on your space and desired finish.` },
    { question: `How long does epoxy flooring last in ${loc}?`, answer: `Professionally installed epoxy floors last 10 to 20 years in residential settings and 5 to 10 years in heavy commercial environments. Longevity depends on proper concrete preparation (diamond grinding, not acid etching), quality of materials, and appropriate topcoat selection. Our installation method maximizes service life.` },
    { question: `Can epoxy be applied to any concrete floor in ${loc}?`, answer: `Most concrete floors are suitable, but proper testing is essential. We check for moisture vapor transmission, existing coatings or sealers that could prevent adhesion, and concrete condition. Floors with excessive moisture, prior sealers, or severe damage may require additional preparation or alternative coating systems.` },
    { question: `How long does epoxy floor installation take in ${loc}?`, answer: `Most residential garage epoxy projects take 2 to 3 days: day 1 for diamond grinding and repairs, day 2 for base coat and decorative media, and day 3 for clear topcoat. Light foot traffic is possible after 24 hours; vehicles can drive on the surface after 5 to 7 days of full curing depending on temperature.` },
  ],
  "commercial-painting": (loc, county) => [
    { question: `Do you paint commercial properties in ${loc}, IL?`, answer: `Yes - D&D Pro Painting serves commercial clients throughout ${loc} and ${county}, including offices, retail stores, restaurants, medical facilities, churches, schools, and warehouses. We carry comprehensive commercial liability coverage and follow all applicable safety regulations.` },
    { question: `Can you work outside business hours in ${loc}?`, answer: `Absolutely. We routinely schedule commercial projects during evenings, weekends, and overnight hours to avoid disrupting your business operations and customers. We develop a phased schedule that minimizes impact to your daily workflow and can work around any specific timing requirements you have.` },
    { question: `How much does commercial painting cost in ${loc}?`, answer: `Commercial painting pricing in ${loc} depends on square footage, ceiling height, surface condition, accessibility, and scheduling requirements. After-hours work, specialty coatings, and high-access areas affect pricing. We provide detailed proposals with transparent line-item pricing after an on-site assessment of your facility.` },
    { question: `Do you use low-odor paint for commercial spaces in ${loc}?`, answer: `Yes - we prioritize low-VOC and zero-VOC products for all occupied commercial spaces. These paints meet or exceed air quality standards while delivering excellent coverage and durability. For healthcare and food service environments, we select products that meet specific regulatory requirements for those industries.` },
  ],
};

function getKeyTakeaways(serviceSlug: string, serviceName: string, locationName: string) {
  const getter = serviceKeyTakeaways[serviceSlug];
  if (getter) return getter(locationName);
  return [
    `D&D Pro Painting offers professional ${serviceName.toLowerCase()} services throughout ${locationName}, IL with over 15 years of proven experience`,
    `All ${serviceName.toLowerCase()} projects include free estimates, premium materials, and a satisfaction-backed warranty`,
    `As a fully insured and licensed family business, we bring personal accountability to every ${locationName} project`,
    `Our meticulous preparation process ensures ${serviceName.toLowerCase()} results that last for years, even through harsh Illinois weather`,
    `We serve ${locationName} and surrounding communities with on-time project completion and clean, respectful crews`,
    `Competitive pricing with no hidden fees - we provide transparent, detailed quotes before any work begins`,
  ];
}

function getFaqs(serviceSlug: string, serviceName: string, locationName: string, county: string) {
  const getter = serviceFaqs[serviceSlug];
  if (getter) return getter(locationName, county);
  return [
    { question: `How much does ${serviceName.toLowerCase()} cost in ${locationName}, IL?`, answer: `The cost of ${serviceName.toLowerCase()} in ${locationName} varies depending on the size of the project, condition of surfaces, materials needed, and complexity of the work. D&D Pro Painting offers free, no-obligation estimates with transparent pricing. Contact us at (331) 241-6600 for a detailed quote tailored to your specific project.` },
    { question: `How long does a ${serviceName.toLowerCase()} project take in ${locationName}?`, answer: `Project timelines depend on the scope of work. We provide estimated timelines during your free consultation and work efficiently to minimize disruption to your daily life. Weather can affect exterior projects in ${county}.` },
    { question: `Is D&D Pro Painting licensed and insured for work in ${locationName}?`, answer: `Yes, D&D Pro Painting is fully licensed and insured for all services in ${locationName} and throughout ${county}. We carry comprehensive liability insurance and workers' compensation coverage, giving you complete peace of mind.` },
    { question: `How do I get started with ${serviceName.toLowerCase()} for my ${locationName} home?`, answer: `Call us at (331) 241-6600 or fill out our online contact form to request a free estimate. We will schedule a convenient time to assess your project, discuss your goals, and provide a detailed, transparent quote - all with no obligation.` },
  ];
}

export async function generateStaticParams() {
  const params: { location: string; service: string }[] = [];
  for (const loc of locations) {
    for (const svc of services) {
      params.push({ location: loc.slug, service: svc.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { location: locSlug, service: svcSlug } = await params;
  const location = locations.find((l) => l.slug === locSlug);
  const service = services.find((s) => s.slug === svcSlug);
  if (!location || !service) return { title: "Not Found" };
  return {
    title: `${service.name} in ${location.name}, IL - Professional ${service.name}`,
    description: `Looking for ${service.name.toLowerCase()} in ${location.name}, IL? D&D Pro Painting provides expert ${service.name.toLowerCase()} services in ${location.name} and ${location.county}. 15 years experience. Call (331) 241-6600.`,
  };
}

export default async function LocationServicePage({ params }: Props) {
  const { location: locSlug, service: svcSlug } = await params;
  const location = locations.find((l) => l.slug === locSlug);
  const service = services.find((s) => s.slug === svcSlug);
  if (!location || !service) notFound();

  // Prefer hand-written, city-specific long-form content when available.
  // Falls back to the generic templated copy otherwise.
  const richContent = getLocationServiceContent(location.slug, service.slug);

  const keyTakeaways =
    richContent?.keyTakeaways ??
    getKeyTakeaways(service.slug, service.name, location.name);
  const faqs =
    richContent?.faqs ?? getFaqs(service.slug, service.name, location.name, location.county);

  const relatedArticles = richContent?.relatedArticles
    ? articles.filter((a) => richContent.relatedArticles.includes(a.slug))
    : [];

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.name,
    provider: {
      "@type": "LocalBusiness",
      name: "D&D Pro Painting",
      telephone: "+1-331-241-6600",
      email: "paint@ddpropainting.net",
      url: "https://ddpropainting.net",
      address: {
        "@type": "PostalAddress",
        streetAddress: "7723 Woodward Ave",
        addressLocality: "Woodridge",
        addressRegion: "IL",
        postalCode: "60517",
        addressCountry: "US",
      },
    },
    areaServed: {
      "@type": "City",
      name: location.name,
      containedInPlace: {
        "@type": "State",
        name: "Illinois",
      },
    },
    description: service.description,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: stripInlineMarkdown(faq.question),
      acceptedAnswer: {
        "@type": "Answer",
        text: stripInlineMarkdown(faq.answer),
      },
    })),
  };

  const otherServices = services.filter((s) => s.slug !== svcSlug);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Breadcrumbs
        items={[
          { label: "Locations", href: "/locations" },
          { label: `${location.name}, IL`, href: `/${location.slug}` },
          { label: service.name },
        ]}
      />

      {/* Hero */}
      <section className="py-16 lg:py-20 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="w-5 h-5 text-accent-light" />
              <span className="text-accent-light font-semibold text-sm tracking-widest uppercase">
                {location.name}, {location.state}
              </span>
            </div>
            <h1 className="font-heading text-4xl lg:text-5xl font-extrabold mt-2 mb-6">
              {service.name} in{" "}
              <span className="text-accent-light">{location.name}, IL</span>
            </h1>
            <p className="text-xl text-white/85 leading-relaxed mb-6">
              {service.description}
            </p>
            <div className="flex items-center gap-3 mb-6">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-accent fill-accent" />
                ))}
              </div>
              <a
                href={business.googleReadReviewsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 text-sm hover:text-accent-light transition-colors"
              >
                {business.googleRating} Stars · {business.googleReviewCount} Google Reviews
              </a>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-accent text-white font-semibold rounded-lg hover:bg-accent-dark transition-colors shadow-lg"
              >
                Get a Free {service.name} Estimate
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href={`tel:${business.phoneFull}`}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-colors border border-white/20"
              >
                <Phone className="w-5 h-5" />
                {business.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Key Takeaways */}
      <section className="py-10 bg-accent/5 border-b border-accent/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-md border border-accent/20">
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="w-5 h-5 text-accent" />
              <h2 className="text-lg font-bold text-primary">
                Key Takeaways - {service.name} in {location.name}
              </h2>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {keyTakeaways.map((takeaway, index) => (
                <li key={index} className="flex items-start gap-2.5 text-sm text-gray-700">
                  <span className="w-5 h-5 bg-accent text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    {index + 1}
                  </span>
                  <span className="leading-relaxed">{renderInline(takeaway)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              {richContent ? (
                <>
                  {/* Rich hero intro */}
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">
                    Expert {service.name} Services in {location.name}, IL
                  </h2>
                  <p className="text-lg text-gray-700 leading-relaxed mb-10">
                    {renderInline(richContent.heroIntro)}
                  </p>

                  {/* Deep sections */}
                  {richContent.sections.map((section, idx) => (
                    <div key={idx}>
                      <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
                        {section.heading}
                      </h2>
                      <div className="space-y-4 text-gray-600 leading-relaxed">
                        {section.paragraphs.map((paragraph, pi) => (
                          <p key={pi}>{renderInline(paragraph)}</p>
                        ))}
                      </div>
                    </div>
                  ))}

                  {/* Local challenges callout */}
                  <div className="bg-accent/5 border-l-4 border-accent rounded-r-xl p-6 my-10">
                    <h3 className="text-lg font-bold text-primary mb-2">
                      Illinois Climate & Local Considerations in {location.name}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {renderInline(richContent.localChallenges)}
                    </p>
                  </div>

                  {/* Neighborhood focus grid */}
                  {richContent.neighborhoodFocus.length > 0 && (
                    <>
                      <h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
                        Neighborhoods We Serve in {location.name}
                      </h3>
                      <p className="text-gray-600 leading-relaxed mb-6">
                        Our {service.name.toLowerCase()} crews have completed projects across every
                        corner of {location.name}. Here are some of the neighborhoods where we regularly
                        work and the specific considerations each area brings.
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        {richContent.neighborhoodFocus.map((hood) => (
                          <div
                            key={hood.name}
                            className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm"
                          >
                            <div className="flex items-center gap-2 mb-2">
                              <MapPin className="w-4 h-4 text-accent flex-shrink-0" />
                              <h4 className="font-bold text-gray-900 text-sm">
                                {hood.name}
                              </h4>
                            </div>
                            <p className="text-sm text-gray-600 leading-relaxed">
                              {renderInline(hood.note)}
                            </p>
                          </div>
                        ))}
                      </div>
                    </>
                  )}

                  {/* Pricing & scope callout */}
                  <div className="bg-primary/5 border border-primary/10 rounded-xl p-6 my-10">
                    <h3 className="text-lg font-bold text-primary mb-2">
                      {service.name} Pricing & Scope in {location.name}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {renderInline(richContent.pricingNote)}
                    </p>
                  </div>

                  {/* Related guides / internal linking */}
                  {relatedArticles.length > 0 && (
                    <div className="bg-gray-50 rounded-xl p-6 my-10 border border-gray-100">
                      <div className="flex items-center gap-2 mb-4">
                        <BookOpen className="w-5 h-5 text-accent" />
                        <h3 className="text-lg font-bold text-gray-900">
                          Related Guides & Resources
                        </h3>
                      </div>
                      <ul className="space-y-2">
                        {relatedArticles.map((a) => (
                          <li key={a.slug}>
                            <Link
                              href={`/resources/${a.slug}`}
                              className="flex items-start gap-2 text-primary hover:text-accent transition-colors group"
                            >
                              <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0 group-hover:translate-x-0.5 transition-transform" />
                              <span className="font-semibold">{a.title}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">
                    Expert {service.name} Services in {location.name}
                  </h2>
                  <div className="space-y-4 text-gray-600 leading-relaxed">
                    <p>
                      D&D Pro Painting provides professional {service.name.toLowerCase()}{" "}
                      services to homeowners and businesses throughout {location.name},{" "}
                      {location.state}. With over 15 years of experience and a{" "}
                      {business.googleRating}-star rating on Google, we are the trusted
                      choice for {service.name.toLowerCase()} in {location.county}.
                    </p>
                    <p>{service.description}</p>
                    <p>
                      Our team of skilled professionals uses only premium materials and
                      proven techniques to deliver results that exceed your
                      expectations. Every {service.name.toLowerCase()} project begins with
                      a free, no-obligation estimate and includes a thorough
                      consultation to understand your specific needs and goals.
                    </p>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
                    Understanding {service.name} in {location.name}, IL
                  </h3>
                  <div className="space-y-4 text-gray-600 leading-relaxed">
                    <p>
                      {location.name} is a vibrant community located in {location.county}, Illinois,
                      with a population of approximately {location.population} residents. {location.description}{" "}
                      As local experts who live and work in the western Chicago suburbs, D&D Pro Painting
                      understands the specific requirements that {location.name} properties demand.
                    </p>
                    <p>
                      Illinois weather is notoriously tough on homes. From freezing winters with
                      sub-zero temperatures to hot, humid summers, your property&apos;s surfaces
                      are constantly under stress. That is why choosing the right {service.name.toLowerCase()}{" "}
                      contractor in {location.name} is so important - you need a team that understands
                      local climate challenges and uses materials and methods designed to withstand them.
                    </p>
                    <p>
                      D&D Pro Painting has built a strong reputation in {location.name} and across{" "}
                      {location.county} by consistently delivering exceptional {service.name.toLowerCase()}{" "}
                      results. We select products that are proven performers in the Midwest climate,
                      and our preparation techniques ensure maximum adhesion and longevity - so your
                      investment looks beautiful and stays protected for years to come.
                    </p>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
                    What Sets Our {service.name} Apart
                  </h3>
                  <div className="space-y-4 text-gray-600 leading-relaxed">
                    <p>
                      Not all {service.name.toLowerCase()} contractors deliver the same level of quality.
                      At D&D Pro Painting, we differentiate ourselves through an unwavering commitment
                      to excellence at every stage of the project. Here is what you can expect when you
                      hire us for {service.name.toLowerCase()} in {location.name}:
                    </p>
                    <p>
                      <strong className="text-gray-800">Thorough Surface Preparation:</strong> We
                      believe that proper preparation is the foundation of every successful{" "}
                      {service.name.toLowerCase()} project. Our crews meticulously clean, repair,
                      sand, and prime all surfaces before any finish material is applied.
                    </p>
                    <p>
                      <strong className="text-gray-800">Premium-Quality Materials:</strong> We
                      source our paints, stains, and coatings from the industry&apos;s most trusted
                      brands. We never compromise on material quality.
                    </p>
                    <p>
                      <strong className="text-gray-800">Skilled, Experienced Crews:</strong> Our
                      painters bring years of hands-on experience to every job.
                    </p>
                    <p>
                      <strong className="text-gray-800">Respectful, Clean Service:</strong> We
                      treat your {location.name} property with the utmost respect.
                    </p>
                  </div>
                </>
              )}

              {/* Universal: Why choose us checklist */}
              <h3 className="text-xl font-bold text-gray-900 mt-12 mb-4">
                Why {location.name} Homeowners Choose D&D Pro Painting
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {[
                  "Fully insured and licensed",
                  "15+ years of local experience",
                  "Free, detailed estimates",
                  "Premium materials and tools",
                  "Warranty on every project",
                  "Family owned and operated",
                  "Clean and respectful crews",
                  "On-time project completion",
                  "Transparent, honest pricing",
                  "Personalized color consultation",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-gray-700">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>

              {/* Universal: Process */}
              <h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
                Our {service.name} Process in {location.name}
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                We have refined our {service.name.toLowerCase()} process over 15 years of
                serving homeowners across the western Chicago suburbs. Every step is designed
                to deliver outstanding results while making the experience as smooth and
                stress-free as possible for you.
              </p>
              <div className="space-y-4">
                {[
                  {
                    step: "1",
                    title: "Free Consultation & Estimate",
                    desc: `Contact us to schedule a free, no-obligation consultation for your ${service.name.toLowerCase()} project in ${location.name}. We will visit your property, assess the scope of work, discuss your goals and preferences, and provide a detailed, transparent quote with no hidden fees.`,
                  },
                  {
                    step: "2",
                    title: "Color Selection & Planning",
                    desc: `Once you approve the estimate, we work with you to finalize all details - colors, materials, scheduling, and any special requirements. Color consultation is always included at no extra charge.`,
                  },
                  {
                    step: "3",
                    title: "Thorough Preparation",
                    desc: `Great results start with great preparation. Our team carefully protects your property, then cleans, repairs, sands, caulks, and primes all surfaces as needed. We never skip or rush preparation.`,
                  },
                  {
                    step: "4",
                    title: "Expert Application",
                    desc: `Our skilled crew applies finish coats with precision, maintaining wet edges for even coverage and paying close attention to detail on trim, edges, and transitions.`,
                  },
                  {
                    step: "5",
                    title: "Final Walkthrough & Warranty",
                    desc: `When the project is complete, we conduct a thorough walkthrough with you to review every detail. Once you are completely satisfied, we clean up the workspace and provide warranty documentation.`,
                  },
                ].map((item) => (
                  <div
                    key={item.step}
                    className="flex gap-4 p-5 bg-gray-50 rounded-xl border border-gray-100"
                  >
                    <div className="w-10 h-10 bg-accent text-white rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">{item.title}</h4>
                      <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-primary rounded-xl p-6 text-white sticky top-28">
                <h3 className="text-lg font-bold mb-2">
                  Get a Free {service.name} Estimate
                </h3>
                <p className="text-sm text-white/80 mb-4">
                  Ready to start your {service.name.toLowerCase()} project in{" "}
                  {location.name}? Contact us today.
                </p>
                <Link
                  href="/contact"
                  className="block text-center px-4 py-3 bg-accent text-white font-semibold rounded-lg hover:bg-accent-dark transition-colors mb-3"
                >
                  Request Free Estimate
                </Link>
                <a
                  href={`tel:${business.phoneFull}`}
                  className="flex items-center justify-center gap-2 text-sm text-white/80 hover:text-white transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  {business.phone}
                </a>

                <div className="mt-6 pt-6 border-t border-white/20">
                  <h4 className="font-semibold text-sm mb-3">
                    Other Services in {location.name}
                  </h4>
                  <div className="space-y-1.5">
                    {otherServices.slice(0, 8).map((svc) => (
                      <Link
                        key={svc.slug}
                        href={`/${location.slug}/${svc.slug}`}
                        className="block text-sm text-white/70 hover:text-accent-light transition-colors"
                      >
                        {svc.name}
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-white/20">
                  <h4 className="font-semibold text-sm mb-2">Area Info</h4>
                  <div className="space-y-1 text-xs text-white/60">
                    <div className="flex justify-between">
                      <span>County</span>
                      <span className="text-white/80">{location.county}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Population</span>
                      <span className="text-white/80">{location.population}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>ZIP</span>
                      <span className="text-white/80">{location.zipCodes.join(", ")}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 lg:py-24 bg-gray-50 section-pattern">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="inline-block text-accent font-bold text-sm tracking-widest uppercase mb-2 px-4 py-1.5 bg-accent/10 rounded-full">
              FAQ
            </span>
            <h2 className="text-3xl font-bold text-gray-900 mt-3 mb-4">
              {service.name} in {location.name} - Frequently Asked Questions
            </h2>
            <p className="text-gray-600">
              Common questions from {location.name} homeowners about our {service.name.toLowerCase()} services.
            </p>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="group bg-white rounded-xl border border-gray-200 shadow-sm"
              >
                <summary className="flex items-center justify-between cursor-pointer p-5 text-gray-900 font-semibold text-sm hover:text-primary transition-colors list-none">
                  {faq.question}
                  <ChevronDown className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0 ml-4" />
                </summary>
                <div className="px-5 pb-5 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                  {renderInline(faq.answer)}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Back & CTA */}
      <section className="py-12 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link
              href={`/${location.slug}`}
              className="inline-flex items-center gap-2 text-primary font-semibold hover:text-accent transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to All {location.name} Services
            </Link>
            <div className="flex items-center gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white font-semibold rounded-lg hover:bg-accent-dark transition-colors shadow-md"
              >
                Get a Free Estimate
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={`tel:${business.phoneFull}`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-light transition-colors"
              >
                <Phone className="w-4 h-4" />
                {business.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      <AiAssistant />
      <SeasonalPromos />
    </>
  );
}
