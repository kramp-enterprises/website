import {
  ADDRESS,
  CITY,
  EMAIL,
  PHONE,
  PHONE_TEL,
  PRODUCTS,
  type Product,
} from "@/lib/catalog";

export const SITE_URL = "https://www.krampenterprises.com";
export const SITE_NAME = "Kramp Enterprises";
export const GEO_REGION = "US-SD";
export const GEO_PLACENAME = "Brentford, South Dakota";

export const NAP = {
  name: "Kramp Enterprises Inc.",
  alternateName: ["Kramp Construction", "6th Street Fab", "6th Street Designs"],
  street: ADDRESS,
  city: "Brentford",
  region: "SD",
  postal: "57429",
  phone: PHONE,
  phoneTel: PHONE_TEL,
  email: EMAIL,
  hours: "Mo-Fr 08:30-16:30",
};

export function absUrl(path = "/") {
  if (path.startsWith("http")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export type PageSeo = {
  title: string;
  description: string;
  path: string;
  image?: string;
};

export function pageHead({ title, description, path, image }: PageSeo) {
  const url = absUrl(path);
  const ogImage = absUrl(image ?? "/images/logo-full.png");
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  return {
    meta: [
      { title: fullTitle },
      { name: "description", content: description },
      { name: "robots", content: "index,follow,max-image-preview:large" },
      { name: "author", content: SITE_NAME },
      { name: "geo.region", content: GEO_REGION },
      { name: "geo.placename", content: GEO_PLACENAME },
      { name: "geo.position", content: "45.1608;-98.1762" },
      { name: "ICBM", content: "45.1608, -98.1762" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:title", content: fullTitle },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { property: "og:image", content: ogImage },
      { property: "og:locale", content: "en_US" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: fullTitle },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: ogImage },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
    "@id": `${SITE_URL}/#business`,
    name: NAP.name,
    alternateName: NAP.alternateName,
    url: SITE_URL,
    telephone: NAP.phoneTel,
    email: NAP.email,
    image: absUrl("/images/logo-full.png"),
    logo: absUrl("/images/logo.png"),
    foundingDate: "1985",
    priceRange: "$$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: NAP.street,
      addressLocality: NAP.city,
      addressRegion: NAP.region,
      postalCode: NAP.postal,
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 45.1608,
      longitude: -98.1762,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:30",
      closes: "16:30",
    },
    areaServed: [
      { "@type": "AdministrativeArea", name: "Spink County" },
      { "@type": "AdministrativeArea", name: "James River Valley" },
      { "@type": "State", name: "South Dakota" },
      { "@type": "City", name: "Brentford" },
      { "@type": "City", name: "Redfield" },
      { "@type": "City", name: "Aberdeen" },
    ],
    sameAs: ["https://www.facebook.com/krampconstruction"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Kramp Enterprises services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "GSI grain bin sales and installation",
            url: absUrl("/grain-bins"),
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Yarbo robotic yard care dealer",
            url: absUrl("/yarbo"),
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Custom CNC plasma signs and steel fabrication",
            url: absUrl("/fabrication"),
          },
        },
      ],
    },
  };
}

export function faqJsonLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absUrl(item.path),
    })),
  };
}

export function serviceJsonLd(opts: {
  name: string;
  description: string;
  path: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    description: opts.description,
    url: absUrl(opts.path),
    image: absUrl(opts.image ?? "/images/logo-full.png"),
    provider: { "@id": `${SITE_URL}/#business` },
    areaServed: "South Dakota",
  };
}

export function productJsonLd(product: Product) {
  const url = absUrl(`/store/${product.slug}`);
  const offer =
    product.kind === "quote" || product.priceCents <= 0
      ? {
          "@type": "Offer",
          availability: "https://schema.org/InStoreOnly",
          priceCurrency: "USD",
          url,
        }
      : {
          "@type": "Offer",
          priceCurrency: "USD",
          price: (product.priceCents / 100).toFixed(2),
          availability: "https://schema.org/InStock",
          url,
        };
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.blurb,
    image: absUrl(product.image),
    brand: { "@type": "Brand", name: SITE_NAME },
    sku: product.slug,
    offers: offer,
  };
}

export const GRAIN_FAQS = [
  {
    q: "Do you sell and install GSI grain bins in South Dakota?",
    a: "Yes. Kramp Enterprises is a GSI dealer in Brentford. We design, pour concrete, erect bins, and install handling and conditioning for farms across the James River Valley and northeast South Dakota.",
  },
  {
    q: "What grain handling equipment do you install?",
    a: "Augers, bucket elevators, conveyors, U-trough unloads, paddle sweeps, aeration fans, heaters, spreaders, and bin monitoring. Each site is drawn in-house before we build.",
  },
  {
    q: "Can you add onto an existing grain system?",
    a: "Yes. Most of our work is repeat — extra bins, a dryer, a wet holding bin, or replacing a plugged unload. We walk the existing site before we quote.",
  },
  {
    q: "Do you pour grain bin concrete pads?",
    a: "Yes. Concrete under the bin is part of the job. We form and pour pads and related farm concrete with crews we have used for years.",
  },
];

export const YARBO_FAQS = [
  {
    q: "Are you a Yarbo dealer in South Dakota?",
    a: "Yes. We sell Yarbo Core machines and modules from Brentford, map the property, and service the unit after the first winter. It is not a porch drop-ship.",
  },
  {
    q: "Will a Yarbo work on a farm or acreage lawn?",
    a: "That is the job we sell it for. Tracks, long driveways, gravel, wind, and South Dakota snow. The acreage kit is Core + Lawn Mower Pro + Snow.",
  },
  {
    q: "Do you install and map Yarbo locally?",
    a: "Yes. Delivery, RTK mapping, dock setup, and a walkthrough are included in our service area. Call for freight outside that area.",
  },
  {
    q: "Can one Yarbo mow and blow snow?",
    a: "One Core powers the mower, snow blower, and leaf blower modules. Swap the attachment when the season changes.",
  },
];

export const FAB_FAQS = [
  {
    q: "Do you make custom farm signs in South Dakota?",
    a: "Yes. 6th Street Fab plasma-cuts farm names, lake-house signs, family plaques, and portraits in the Brentford shop. You see a proof before we cut.",
  },
  {
    q: "What files do you take for CNC plasma?",
    a: "DXF, SVG, PNG, or a napkin sketch. We clean the art, send a layout and a price, then cut.",
  },
  {
    q: "Can you build steel tables and fire boxes?",
    a: "Yes. Rolling butcher-block tables, consoles, fire boxes, and stairs are built on the welding table at 303 East 6th.",
  },
];

export const AREA_FAQS = [
  {
    q: "What towns do you serve?",
    a: "Brentford, Redfield, Mellette, Conde, Tulare, Ashton, Northville, Aberdeen, and farms across Spink County and the James River Valley. Northeast South Dakota is our home ground.",
  },
  {
    q: "Is Kramp Construction the same company?",
    a: "Yes. Kramp Construction is a division of Kramp Enterprises Inc. Same shop, same phone, same crew — grain, Yarbo, and custom steel.",
  },
];

export const ALL_PRODUCTS = PRODUCTS;
