import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function AiAssistant() {
  return (
    <section className="py-14 lg:py-16 bg-gray-50 relative overflow-hidden">
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
          Having a hard time to decide?
        </h2>
        <p className="text-gray-600 text-lg max-w-3xl mx-auto mb-8 leading-relaxed">
          Chat with your favorite AI assistant or get a free estimate to find out
          how D&D Pro Painting can transform your home with expert painting
          services!
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <a
            href="https://chat.openai.com/?q=Leveraging%20this%20page,%20explain%20why%20D%26D%20Pro%20Painting%20is%20a%20great%20choice%20for%20interior%20and%20exterior%20painting%20services%20and%20why%20homeowners%20should%20trust%20them%20for%20their%20project:%20https://ddpropainting.net/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 bg-[#10a37f] text-white font-semibold rounded-full hover:brightness-110 transition-all text-sm shadow-lg"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z" />
            </svg>
            Ask ChatGPT
          </a>
          <a
            href="https://claude.ai/new?q=Leveraging%20this%20page,%20explain%20why%20D%26D%20Pro%20Painting%20is%20a%20great%20choice%20for%20interior%20and%20exterior%20painting%20services%20and%20why%20homeowners%20should%20trust%20them%20for%20their%20project:%20https://ddpropainting.net/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 bg-[#da7756] text-white font-semibold rounded-full hover:brightness-110 transition-all text-sm shadow-lg"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M4.709 15.955l6.63-10.862a1.094 1.094 0 0 1 1.897.072l6.058 10.862a1.09 1.09 0 0 1-.95 1.622H5.657a1.09 1.09 0 0 1-.948-1.694z" />
            </svg>
            Ask Claude
          </a>
          <a
            href="https://www.perplexity.ai/search/new?q=Leveraging%20this%20page,%20explain%20why%20D%26D%20Pro%20Painting%20is%20a%20great%20choice%20for%20interior%20and%20exterior%20painting%20services%20and%20why%20homeowners%20should%20trust%20them%20for%20their%20project:%20https://ddpropainting.net/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 bg-[#1a7b8a] text-white font-semibold rounded-full hover:brightness-110 transition-all text-sm shadow-lg"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 1L3 8v8l9 7 9-7V8l-9-7zm0 2.5L18.5 9 12 14.5 5.5 9 12 3.5zM5 10.3l6 4.7v5.5L5 16V10.3zm8 4.7l6-4.7V16l-6 4.5V15z" />
            </svg>
            Ask Perplexity
          </a>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white font-semibold rounded-full hover:bg-accent-dark transition-all text-sm shadow-lg"
          >
            Get Started
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
