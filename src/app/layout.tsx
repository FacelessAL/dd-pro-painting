import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-heading-var",
  subsets: ["latin"],
  weight: ["700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "D&D Pro Painting | Professional Painting Services in Woodridge, IL",
    template: "%s | D&D Pro Painting",
  },
  description:
    "D&D Pro Painting is a family owned painting company serving Woodridge, Naperville, Downers Grove & the western Chicago suburbs. Interior & exterior painting, deck staining, and more. Call (331) 241-6600 for a free estimate.",
  keywords: [
    "painting company",
    "house painter",
    "interior painting",
    "exterior painting",
    "Woodridge IL",
    "Naperville painting",
    "DuPage County painter",
    "deck staining",
    "residential painting",
    "commercial painting",
  ],
  openGraph: {
    title: "D&D Pro Painting | Professional Painting Services",
    description:
      "Family owned painting company with 15 years of experience serving the western Chicago suburbs. Free estimates available.",
    url: "https://ddpropainting.net",
    siteName: "D&D Pro Painting",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://ddpropainting.net/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "D&D Pro Painting - Professional Painting Services",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "D&D Pro Painting | Professional Painting Services",
    description:
      "Family owned painting company with 15 years of experience serving the western Chicago suburbs. Free estimates available.",
    images: ["https://ddpropainting.net/og-image.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  metadataBase: new URL("https://ddpropainting.net"),
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://ddpropainting.net",
  name: "D&D Pro Painting",
  image: "https://ddpropainting.net/logo.jpeg",
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
  geo: {
    "@type": "GeoCoordinates",
    latitude: 41.745745,
    longitude: -88.0300279,
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "69",
  },
  priceRange: "$$",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "07:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "08:00",
      closes: "16:00",
    },
  ],
  areaServed: [
    "Woodridge",
    "Lemont",
    "Naperville",
    "Hinsdale",
    "Oak Brook",
    "Glen Ellyn",
    "Downers Grove",
    "Bolingbrook",
    "Burr Ridge",
    "Homer Glen",
    "Lockport",
    "Mokena",
  ],
  sameAs: ["https://www.facebook.com/ddpropaintingg"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
      </head>
      <body className={`${inter.variable} ${playfair.variable} antialiased`}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
