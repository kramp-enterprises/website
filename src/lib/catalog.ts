export type ProductKind = "buy" | "quote" | "custom";
export type ProductCategory = "yarbo" | "signs" | "tables" | "bins";

export type Product = {
  slug: string;
  name: string;
  category: ProductCategory;
  kind: ProductKind;
  priceCents: number;
  priceNote?: string;
  blurb: string;
  details: string[];
  image: string;
  shots?: string[];
  badge?: string;
  cutout?: boolean;
};

export const PRODUCTS: Product[] = [
  {
    slug: "yarbo-core",
    name: "Yarbo Core",
    category: "yarbo",
    kind: "buy",
    priceCents: 399900,
    priceNote: "Dealer setup available in South Dakota",
    blurb:
      "All-terrain tracked chassis that powers every Yarbo module — mow, blow, and plow from one machine.",
    details: [
      "Modular Y Series platform",
      "Tracks for farmyards, slopes, and snow",
      "Dock, data center, and battery sold as a system",
      "Local install, mapping, and winter service from Brentford",
    ],
    image: "/images/yarbo/core.jpg",
    shots: [
      "/images/yarbo/core-side.jpg",
      "/images/yarbo/core-inbox.jpg",
      "/images/yarbo/kit-4in1.jpg",
    ],
    badge: "Dealer",
  },
  {
    slug: "yarbo-mower-pro",
    name: "Yarbo Lawn Mower Pro",
    category: "yarbo",
    kind: "buy",
    priceCents: 209900,
    priceNote: "Requires Yarbo Core",
    blurb:
      "Heavy-duty mowing module for large rural yards — the kind of lawn a riding mower used to own.",
    details: [
      "Y Series Lawn Mower Pro module",
      "Built for acreage, not postage-stamp lots",
      "Swaps onto the Core with no tools",
      "We map the property and stay on it after the sale",
    ],
    image: "/images/yarbo/mower-acres.jpg",
    shots: [
      "/images/yarbo/mower-pro.jpg",
      "/images/yarbo/mower-terrain.jpg",
      "/images/yarbo/mower-cut.jpg",
      "/images/yarbo/mower-blades.jpg",
      "/images/yarbo/mower-module.png",
    ],
  },
  {
    slug: "yarbo-snow",
    name: "Yarbo Snow Blower Module",
    category: "yarbo",
    kind: "buy",
    priceCents: 129900,
    priceNote: "Requires Yarbo Core · 24 in clearing",
    blurb:
      "Two-stage snow module for South Dakota driveways, shop lots, and farm lanes.",
    details: [
      "24-inch clearing width",
      "Adjustable throw for banks and windrows",
      "The reason a Core pays for itself north of I-90",
      "Pre-season bookings for install and mapping",
    ],
    image: "/images/yarbo/snow-throw.jpg",
    shots: [
      "/images/yarbo/snow.jpg",
      "/images/yarbo/snow-action.jpg",
      "/images/yarbo/snow-module.png",
    ],
    badge: "Winter",
  },
  {
    slug: "yarbo-blower",
    name: "Yarbo Blower Module",
    category: "yarbo",
    kind: "buy",
    priceCents: 109900,
    priceNote: "Requires Yarbo Core",
    blurb:
      "Leaf and debris blower module for fall cleanup around shops, bins, and house yards.",
    details: [
      "Attaches to the same Core as mower and snow",
      "Keeps gravel lots and shop aprons clear",
      "Year-round use from one robot",
    ],
    image: "/images/yarbo/blower-leaves.jpg",
    shots: [
      "/images/yarbo/blower.jpg",
      "/images/yarbo/blower-action.jpg",
      "/images/yarbo/blower-module.png",
    ],
  },
  {
    slug: "yarbo-acreage-kit",
    name: "Acreage Kit — Core + Mower Pro + Snow",
    category: "yarbo",
    kind: "buy",
    priceCents: 659900,
    priceNote: "Includes local delivery and mapping in our service area",
    blurb:
      "The South Dakota package: one Core, summer mowing, and winter snow. We set it up on your place.",
    details: [
      "Yarbo Core + Lawn Mower Pro + Snow Blower",
      "Docking station and data center",
      "On-farm mapping and walkthrough",
      "Call for out-of-area freight",
    ],
    image: "/images/yarbo/kit-mower-snow.jpg",
    shots: [
      "/images/yarbo/kit-4in1.jpg",
      "/images/yarbo/mower-acres.jpg",
      "/images/yarbo/snow-throw.jpg",
    ],
    badge: "Best for SD",
  },
  {
    slug: "farm-name-sign",
    name: "Farm & Lake House Sign",
    category: "signs",
    kind: "custom",
    priceCents: 18500,
    priceNote: "Starting price · size and powder coat change the quote",
    blurb:
      "Plasma-cut steel farm, family, or cabin name. Built in Brentford, finished, ready for a post or shop wall.",
    details: [
      "CNC plasma from your wording and layout",
      "Steel plate, ground and finished",
      "Powder coat in forest, black, or cream",
      "Proof before we cut",
    ],
    image: "/images/sign-jilek.png",
    shots: ["/images/plasma.jpg"],
    cutout: true,
  },
  {
    slug: "family-plaque",
    name: "Round Family Plaque",
    category: "signs",
    kind: "custom",
    priceCents: 12500,
    priceNote: "Starting price",
    blurb:
      "Circular steel plaque with your name and a line that belongs on the shop wall or the cabin door.",
    details: [
      "Cut letters and optional scrollwork",
      "Indoor or outdoor finish",
      "Send the wording — we set the type",
    ],
    image: "/images/sign-aslesons.png",
    cutout: true,
  },
  {
    slug: "portrait-sign",
    name: "Custom Portrait Sign",
    category: "signs",
    kind: "custom",
    priceCents: 28000,
    priceNote: "Starting price · art is quoted from your photo",
    blurb:
      "A face, a mascot, a grill-shop mark — vectorized in-house and cut on the plasma table.",
    details: [
      "We clean a photo or logo for plasma",
      "Heavy plate, layered or single-pass",
      "Proof before steel hits the table",
    ],
    image: "/images/sign-famous-daves.png",
    shots: ["/images/plasma-sparks.jpg", "/images/deer.png"],
    cutout: true,
  },
  {
    slug: "deer-sign",
    name: "Whitetail Wall Sign",
    category: "signs",
    kind: "buy",
    priceCents: 24500,
    priceNote: "Shown size · other sizes quoted",
    blurb:
      "Plasma-cut whitetail on a riveted steel plate. Shop wall, cabin, or man-cave — this one is a catalog cut.",
    details: [
      "Cut silhouette on a framed plate",
      "Raw steel, clear, or powder coat",
      "Hanging hardware included",
    ],
    image: "/images/deer.png",
    cutout: true,
    badge: "Catalog",
  },
  {
    slug: "custom-cut",
    name: "Custom Plasma Cut",
    category: "signs",
    kind: "custom",
    priceCents: 7500,
    priceNote: "Deposit toward the job · we quote the rest",
    blurb:
      "Upload a file or describe the piece. We nest it, cut it, and finish it in the 6th Street shop.",
    details: [
      "DXF, SVG, PNG, or a sketch",
      "Signs, brackets, gates, art",
      "We send a proof and a price before steel hits the table",
    ],
    image: "/images/plasma-cut.jpg",
    shots: ["/images/plasma.jpg", "/images/plasma-sparks.jpg", "/images/shop-weld.jpg"],
    badge: "Custom",
  },
  {
    slug: "fire-pit",
    name: "Steel Fire Box",
    category: "tables",
    kind: "buy",
    priceCents: 42000,
    priceNote: "Custom silhouettes quoted separately",
    blurb:
      "Plate-steel fire box with vent pattern and a hot-side warning cut into the wall. Cabin, shop yard, or lake house.",
    details: [
      "Heavy plate, fold-and-weld box",
      "Vent pattern and lid with flame cut",
      "Raw steel or powder coat",
    ],
    image: "/images/firepit.png",
    cutout: true,
  },
  {
    slug: "rolling-table",
    name: "Rolling Tables",
    category: "tables",
    kind: "custom",
    priceCents: 145000,
    priceNote: "Starting price · size, top, and lettering quoted",
    blurb:
      "Welded steel bases on wheels — butcher-block work tables or a long console. Shop, cabin, or outdoor bar.",
    details: [
      "Steel frame, powder coat in your color",
      "Butcher-block, plate, or slim console top",
      "Optional plasma-cut name in the shelf",
      "Wheels that actually roll on gravel",
    ],
    image: "/images/table-henjum.png",
    shots: [
      "/images/table-henjum-yard.jpg",
      "/images/table-console.png",
      "/images/shop-table.jpg",
    ],
    cutout: true,
  },
  {
    slug: "grain-bin-system",
    name: "Grain Bin & Handling System",
    category: "bins",
    kind: "quote",
    priceCents: 0,
    priceNote: "Quoted per site — never a fake cart price",
    blurb:
      "GSI farm and commercial bins, handling, conditioning, and concrete. Site walk, CAD, and our own crew.",
    details: [
      "GSI grain bins and handling",
      "Augers, sweeps, fans, and monitoring",
      "Concrete pads and millwright work",
      "James River Valley and northeast South Dakota",
    ],
    image: "/images/bins/complex.jpg",
    shots: [
      "/images/bins/harvest.jpg",
      "/images/bins/catwalk.jpg",
      "/images/bins/leg.jpg",
      "/images/bins/dryer.jpg",
      "/images/bins/site-crane.jpg",
    ],
    badge: "Quote",
  },
];

const CUTOUT_SRC = new Set([
  "/images/yarbo/core.jpg",
  "/images/yarbo/core-side.jpg",
  "/images/yarbo/core-inbox.jpg",
  "/images/yarbo/mower-pro.jpg",
  "/images/yarbo/mower-pro-side.jpg",
  "/images/yarbo/mower-inbox.jpg",
  "/images/yarbo/snow.jpg",
  "/images/yarbo/snow-module-on.jpg",
  "/images/yarbo/snow-inbox.jpg",
  "/images/yarbo/blower.jpg",
  "/images/yarbo/kit-mower-snow.jpg",
  "/images/yarbo/kit-4in1.jpg",
  "/images/yarbo/kit-5in1.jpg",
]);

export function isCutoutSrc(src: string) {
  if (src.endsWith(".png")) return true;
  return CUTOUT_SRC.has(src);
}

export function productBySlug(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function productsByCategory(category: ProductCategory | "all") {
  if (category === "all") return PRODUCTS;
  return PRODUCTS.filter((p) => p.category === category);
}

export const PHONE = "(605) 887-3456";
export const PHONE_TEL = "+16058873456";
export const EMAIL = "kristakramp@yahoo.com";
export const ADDRESS = "303 East 6th Street";
export const CITY = "Brentford, SD 57429";
export const HOURS = "Mon–Fri 7:30–5:00 · Saturday by appointment";
export const WEB = "www.krampenterprises.com";
