import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function SeasonalPromos() {
  return (
    <section className="py-14 lg:py-20 bg-primary-dark overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-16">
          <div className="text-center lg:text-left shrink-0">
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-white italic leading-tight">
              Our{" "}
              <span className="text-accent-light not-italic font-extrabold">
                Seasonal
                <br />
                Promotions
              </span>
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row gap-8 sm:gap-10">
            <Link href="/contact" className="dangle-1 block group">
              <div className="relative bg-white rounded-2xl px-6 pt-10 pb-12 text-center w-[230px] shadow-xl">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-3">
                  <div className="w-5 h-5 rounded-full border-[3px] border-gray-300 bg-white" />
                  <div className="w-0.5 h-2.5 bg-gray-300 mx-auto -mt-0.5" />
                </div>
                <h3 className="text-base font-bold text-primary mb-2 leading-snug">
                  Residential Exterior Painting
                </h3>
                <div className="text-4xl font-black text-primary mb-0.5">15%</div>
                <div className="text-xl font-bold text-primary mb-3">OFF</div>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Give your home&apos;s exterior a fresh new look and save big on
                  expert exterior painting services!
                </p>
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-9 h-9 bg-accent rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <ArrowRight className="w-4 h-4 text-white" />
                </div>
              </div>
            </Link>
            <Link href="/contact" className="dangle-2 block group">
              <div className="relative bg-white rounded-2xl px-6 pt-10 pb-12 text-center w-[230px] shadow-xl">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-3">
                  <div className="w-5 h-5 rounded-full border-[3px] border-gray-300 bg-white" />
                  <div className="w-0.5 h-2.5 bg-gray-300 mx-auto -mt-0.5" />
                </div>
                <h3 className="text-base font-bold text-primary mb-2 leading-snug">
                  Interior Painting for Seniors
                </h3>
                <div className="text-4xl font-black text-primary mb-0.5">20%</div>
                <div className="text-xl font-bold text-primary mb-3">OFF</div>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Seniors 65+ enjoy exclusive savings on interior painting  - 
                  with full room prep included (like furniture moving)!
                </p>
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-9 h-9 bg-accent rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <ArrowRight className="w-4 h-4 text-white" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
