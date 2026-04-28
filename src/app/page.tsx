import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  Star,
  Shield,
  BadgeCheck,
  Heart,
  Clock,
  Award,
  Sparkles,
  Paintbrush,
  Home as HomeIcon,
  Droplets,
  Fence,
  Wrench,
  Layers,
  Building2,
  ArrowRight,
  MapPin,
  CheckCircle,
  Zap,
} from "lucide-react";
import AnimateIn from "@/components/AnimateIn";
import AiAssistant from "@/components/AiAssistant";
import { business, services, locations, keyFeatures, processSteps, reviews } from "@/data/business";

const iconMap: Record<string, React.ReactNode> = {
  Paintbrush: <Paintbrush className="w-6 h-6" />,
  Home: <HomeIcon className="w-6 h-6" />,
  Droplets: <Droplets className="w-6 h-6" />,
  Fence: <Fence className="w-6 h-6" />,
  Wrench: <Wrench className="w-6 h-6" />,
  Layers: <Layers className="w-6 h-6" />,
  Sparkles: <Sparkles className="w-6 h-6" />,
  Building2: <Building2 className="w-6 h-6" />,
  Shield: <Shield className="w-6 h-6" />,
  BadgeCheck: <BadgeCheck className="w-6 h-6" />,
  Heart: <Heart className="w-6 h-6" />,
  Clock: <Clock className="w-6 h-6" />,
  Award: <Award className="w-6 h-6" />,
};

const featureColors = [
  "bg-accent/20 text-accent-light",
  "bg-accent-teal/20 text-accent-teal",
  "bg-accent-warm/20 text-accent-warm",
  "bg-accent-rose/20 text-accent-rose",
  "bg-accent-light/20 text-accent",
  "bg-primary-light/20 text-primary-light",
];

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[650px] lg:min-h-[750px] flex items-center overflow-hidden">
        <Image
          src="/hero-fleet.png"
          alt="D&D Pro Painting fleet of branded vehicles"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 hero-gradient" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-primary-dark/30 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-2xl">
            <a
              href={business.googleReadReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 hover:bg-white/20 transition-colors"
            >
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-accent fill-accent" />
                ))}
              </div>
              <span className="text-white/90 text-sm font-medium">
                {business.googleRating} Stars · {business.googleReviewCount} Google Reviews
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-accent-light" />
            </a>
            <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.1] mb-6 tracking-tight">
              Elevate Your Home With{" "}
              <span className="gradient-text">Expert Painting</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/85 mb-10 leading-relaxed max-w-xl">
              D&D Pro Painting transforms homes and businesses throughout the
              western Chicago suburbs with professional painting, deck staining,
              and more. Quality craftsmanship backed by{" "}
              <span className="text-accent-light font-semibold">15 years of experience</span>.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent text-white font-bold rounded-xl hover:bg-accent-dark transition-colors shadow-lg shadow-accent/30 text-base"
              >
                Get a Free Estimate
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href={`tel:${business.phoneFull}`}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/20 transition-colors border border-white/20 text-base"
              >
                <Phone className="w-5 h-5" />
                {business.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-primary-dark text-white py-5 relative overflow-hidden">
        <div className="absolute inset-0 shimmer" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 text-sm font-medium">
            {["Fully Insured", "Licensed", "Family Owned", "15 Years Experience", "Warranty Included"].map(
              (item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-accent" />
                  <span>{item}</span>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 lg:py-28 section-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateIn>
            <div className="text-center mb-14">
              <span className="inline-block text-accent font-bold text-sm tracking-widest uppercase mb-2 px-4 py-1.5 bg-accent/10 rounded-full">
                What We Do
              </span>
              <h2 className="font-heading text-4xl lg:text-5xl font-bold text-gray-900 mt-3 mb-4">
                Our Professional Services
              </h2>
              <div className="w-20 h-1 accent-gradient rounded-full mx-auto mb-4" />
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                From interior painting to deck staining and epoxy flooring, D&D Pro
                Painting delivers exceptional results on every project.
              </p>
            </div>
          </AnimateIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.slice(0, 6).map((service, index) => (
              <AnimateIn key={service.slug} delay={index * 100} direction={index % 2 === 0 ? "left" : "right"}>
                <Link
                  href={`/woodridge/${service.slug}`}
                  className="group block bg-white rounded-2xl p-7 shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-accent/30 hover:-translate-y-1"
                >
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:bg-accent group-hover:text-white transition-all duration-300 mb-5 group-hover:scale-110 group-hover:rotate-3">
                    {iconMap[service.icon]}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-3">
                    {service.shortDescription}
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm text-accent font-semibold group-hover:gap-2 transition-all">
                    Learn More <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              </AnimateIn>
            ))}
          </div>
          <AnimateIn>
            <div className="text-center mt-12">
              <Link
                href="/locations"
                className="inline-flex items-center gap-2 text-primary font-semibold hover:text-accent transition-colors text-lg"
              >
                View All Services by Location
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 lg:py-28 bg-primary text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent-teal/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateIn>
            <div className="text-center mb-14">
              <span className="inline-block text-accent-light font-bold text-sm tracking-widest uppercase mb-2 px-4 py-1.5 bg-accent/10 rounded-full">
                Why Choose Us
              </span>
              <h2 className="font-heading text-4xl lg:text-5xl font-bold mt-3 mb-4">
                The D&D Pro Painting <span className="text-accent-light italic">Difference</span>
              </h2>
              <div className="w-20 h-1 accent-gradient rounded-full mx-auto mb-4" />
              <p className="text-white/75 max-w-2xl mx-auto text-lg">
                We are not just painters - we are craftsmen committed to
                delivering exceptional quality on every project.
              </p>
            </div>
          </AnimateIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {keyFeatures.map((feature, index) => (
              <AnimateIn key={feature.title} delay={index * 100}>
                <div className="bg-white/8 backdrop-blur-sm rounded-2xl p-7 border border-white/10 hover:bg-white/15 transition-all duration-300 hover:-translate-y-1 group">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 ${featureColors[index % featureColors.length]} group-hover:scale-110 transition-transform`}>
                    {iconMap[feature.icon]}
                  </div>
                  <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                  <p className="text-white/65 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* Seasonal Promotions */}
      <section className="py-20 lg:py-28 bg-primary-dark overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-12 lg:gap-8">
            <AnimateIn direction="left">
              <div className="text-center lg:text-left lg:max-w-xs shrink-0">
                <h2 className="font-heading text-4xl lg:text-5xl font-bold text-white italic leading-tight">
                  Our{" "}
                  <span className="text-accent-light not-italic font-extrabold">
                    Seasonal
                    <br />
                    Promotions
                  </span>
                </h2>
              </div>
            </AnimateIn>
            <div className="flex flex-col sm:flex-row gap-10 sm:gap-12">
              <AnimateIn delay={200}>
                <Link href="/contact" className="dangle-1 block group">
                  <div className="relative bg-white rounded-2xl px-8 pt-12 pb-14 text-center w-[260px] shadow-xl">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-3">
                      <div className="w-6 h-6 rounded-full border-4 border-gray-300 bg-white" />
                      <div className="w-0.5 h-3 bg-gray-300 mx-auto -mt-0.5" />
                    </div>
                    <h3 className="text-lg font-bold text-primary mb-3 leading-snug">
                      Residential Exterior
                      <br />
                      Painting
                    </h3>
                    <div className="text-5xl font-black text-primary mb-1">15%</div>
                    <div className="text-2xl font-bold text-primary mb-4">OFF</div>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      Give your home&apos;s exterior a fresh new look and save big on
                      expert exterior painting services!
                    </p>
                    <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-10 h-10 bg-accent rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <ArrowRight className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </Link>
              </AnimateIn>
              <AnimateIn delay={400}>
                <Link href="/contact" className="dangle-2 block group">
                  <div className="relative bg-white rounded-2xl px-8 pt-12 pb-14 text-center w-[260px] shadow-xl">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-3">
                      <div className="w-6 h-6 rounded-full border-4 border-gray-300 bg-white" />
                      <div className="w-0.5 h-3 bg-gray-300 mx-auto -mt-0.5" />
                    </div>
                    <h3 className="text-lg font-bold text-primary mb-3 leading-snug">
                      Interior Painting
                      <br />
                      for Seniors
                    </h3>
                    <div className="text-5xl font-black text-primary mb-1">20%</div>
                    <div className="text-2xl font-bold text-primary mb-4">OFF</div>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      Seniors 65+ enjoy exclusive savings on interior painting  - 
                      with full room prep included (like furniture moving)!
                    </p>
                    <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-10 h-10 bg-accent rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <ArrowRight className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </Link>
              </AnimateIn>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateIn>
            <div className="text-center mb-14">
              <span className="inline-block text-accent font-bold text-sm tracking-widest uppercase mb-2 px-4 py-1.5 bg-accent/10 rounded-full">
                <Zap className="w-3.5 h-3.5 inline mr-1 -mt-0.5" />
                How It Works
              </span>
              <h2 className="font-heading text-4xl lg:text-5xl font-bold text-gray-900 mt-3 mb-4">
                Our Simple <span className="gradient-text italic">4-Step</span> Process
              </h2>
              <div className="w-20 h-1 accent-gradient rounded-full mx-auto mb-4" />
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                From your first call to the final walkthrough, we make the
                painting process easy and stress-free.
              </p>
            </div>
          </AnimateIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <AnimateIn key={step.step} delay={index * 150} direction="up">
                <div className="text-center group">
                  <div className="relative mx-auto mb-5">
                    <div className="w-16 h-16 bg-accent text-white rounded-2xl flex items-center justify-center text-2xl font-black mx-auto shadow-lg shadow-accent/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                      {step.step}
                    </div>
                    {index < processSteps.length - 1 && (
                      <div className="hidden lg:block absolute top-1/2 -right-10 w-8 border-t-2 border-dashed border-accent/30" />
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-20 lg:py-28 section-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateIn>
            <div className="text-center mb-14">
              <span className="inline-block text-accent font-bold text-sm tracking-widest uppercase mb-2 px-4 py-1.5 bg-accent/10 rounded-full">
                Testimonials
              </span>
              <h2 className="font-heading text-4xl lg:text-5xl font-bold text-gray-900 mt-3 mb-4">
                What Our Customers <span className="gradient-text italic">Say</span>
              </h2>
              <div className="w-20 h-1 accent-gradient rounded-full mx-auto mb-4" />
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-accent fill-accent" />
                  ))}
                </div>
                <span className="text-gray-700 font-bold text-lg">
                  {business.googleRating} out of 5
                </span>
              </div>
              <p className="text-gray-500">
                Based on{" "}
                <a
                  href={business.googleReadReviewsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent font-semibold hover:underline"
                >
                  {business.googleReviewCount} Google Reviews
                </a>
              </p>
            </div>
          </AnimateIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.slice(0, 6).map((review, index) => (
              <AnimateIn key={index} delay={index * 100}>
                <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full">
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-accent fill-accent" />
                    ))}
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed mb-4">
                    &ldquo;{review.text}&rdquo;
                  </p>
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary text-sm font-bold">
                        {review.name.charAt(0)}
                      </div>
                      <span className="font-semibold text-gray-900 text-sm">
                        {review.name}
                      </span>
                    </div>
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <Star className="w-3 h-3 text-accent fill-accent" />
                      {review.source}
                    </span>
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>
          <AnimateIn>
            <div className="text-center mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={business.googleReadReviewsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-light transition-colors shadow-md"
              >
                Read All Reviews
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href={business.googleWriteReviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent/10 text-accent font-semibold rounded-xl hover:bg-accent/20 transition-colors border border-accent/20"
              >
                <Star className="w-4 h-4" />
                Write a Review
              </a>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateIn>
            <div className="text-center mb-14">
              <span className="inline-block text-accent font-bold text-sm tracking-widest uppercase mb-2 px-4 py-1.5 bg-accent/10 rounded-full">
                Service Areas
              </span>
              <h2 className="font-heading text-4xl lg:text-5xl font-bold text-gray-900 mt-3 mb-4">
                Proudly Serving the <span className="gradient-text italic">Western Chicago</span> Suburbs
              </h2>
              <div className="w-20 h-1 accent-gradient rounded-full mx-auto mb-4" />
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                Based in Woodridge, IL, we provide professional painting services
                across DuPage and Will Counties.
              </p>
            </div>
          </AnimateIn>
          <AnimateIn>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {locations.map((loc) => (
                <Link
                  key={loc.slug}
                  href={`/${loc.slug}`}
                  className="flex items-center gap-2 px-4 py-3.5 bg-gray-50 rounded-xl hover:bg-primary hover:text-white transition-all duration-300 group border border-gray-100 hover:shadow-md hover:-translate-y-0.5"
                >
                  <MapPin className="w-4 h-4 text-accent group-hover:text-accent-light flex-shrink-0" />
                  <span className="text-sm font-medium">{loc.name}, IL</span>
                </Link>
              ))}
            </div>
          </AnimateIn>
          <AnimateIn>
            <div className="text-center mt-10">
              <Link
                href="/locations"
                className="inline-flex items-center gap-2 text-primary font-semibold hover:text-accent transition-colors text-lg"
              >
                View All Service Area Details
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </AnimateIn>
        </div>
      </section>

      <AiAssistant />

      {/* CTA Section */}
      <section className="py-20 lg:py-24 bg-primary relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 accent-gradient" />
        <div className="absolute top-0 right-0 w-80 h-80 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimateIn>
            <h2 className="font-heading text-4xl lg:text-5xl font-bold text-white mb-5">
              Ready to <span className="text-accent-light italic">Transform</span> Your Home?
            </h2>
            <p className="text-white/75 text-lg mb-10 max-w-2xl mx-auto">
              Contact D&D Pro Painting today for a free, no-obligation estimate.
              Join hundreds of happy homeowners across the western Chicago suburbs.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-9 py-4 bg-accent text-white font-bold rounded-xl hover:bg-accent-dark transition-all shadow-lg shadow-accent/30 text-lg hover:scale-105 duration-300"
              >
                Get Your Free Estimate
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href={`tel:${business.phoneFull}`}
                className="inline-flex items-center gap-2 px-9 py-4 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-all border border-white/20 text-lg hover:scale-105 duration-300"
              >
                <Phone className="w-5 h-5" />
                {business.phone}
              </a>
            </div>
          </AnimateIn>
        </div>
      </section>
    </>
  );
}
