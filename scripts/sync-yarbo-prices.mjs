/**
 * Pull current Y40 selling prices from yarbo.com and write them into
 * src/lib/catalog.ts. Sale notes follow Yarbo's compare-at price, so they
 * drop off on their own when a sale ends.
 */
import { readFileSync, writeFileSync } from "node:fs";

const CATALOG = new URL("../src/lib/catalog.ts", import.meta.url);

const PRODUCTS = [
  {
    slug: "yarbo-core",
    handle: "yarbo-core",
    note: (sale, was) =>
      sale
        ? `Dealer setup available in South Dakota · sale, was ${was}`
        : "Dealer setup available in South Dakota",
  },
  {
    slug: "yarbo-mower-pro",
    handle: "yarbo-lawn-mower-pro-module",
    note: (sale, was) =>
      sale
        ? `Requires Yarbo Core · sale, was ${was}`
        : "Requires Yarbo Core",
  },
  {
    slug: "yarbo-snow",
    handle: "snow-blower-module",
    note: (sale, was) =>
      sale
        ? `Requires Yarbo Core · 24 in · sale, was ${was}`
        : "Requires Yarbo Core · 24 in",
  },
  {
    slug: "yarbo-blower",
    handle: "blower-module",
    note: (sale, was) =>
      sale
        ? `Requires Yarbo Core · sale, was ${was}`
        : "Requires Yarbo Core",
  },
  {
    slug: "yarbo-core-mower-pro",
    handle: "yarbo-lawn-mower-pro",
    note: (sale, was) =>
      sale
        ? `Yarbo sale, was ${was} · local delivery and mapping`
        : "Local delivery and mapping",
  },
  {
    slug: "yarbo-acreage-kit",
    handle: "yarbo-lawn-mower-pro-snow-blower",
    note: (sale, was) =>
      sale
        ? `Yarbo sale, was ${was} · local delivery and mapping`
        : "Local delivery and mapping",
  },
];

function money(cents) {
  return (cents / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: cents % 100 === 0 ? 0 : 2,
  });
}

async function yarboPrice(handle) {
  const res = await fetch(`https://www.yarbo.com/products/${handle}.js`);
  if (!res.ok) throw new Error(`${handle} returned ${res.status}`);
  const product = await res.json();
  const variant = product.variants?.[0];
  const price = Number(variant?.price);
  const compare = Number(variant?.compare_at_price ?? 0);
  if (!Number.isFinite(price) || price <= 0) {
    throw new Error(`${handle} has no price`);
  }
  return { price, compare, title: product.title };
}

function writeProduct(src, slug, cents, note) {
  const re = new RegExp(
    `(slug: "${slug}",[\\s\\S]*?priceCents: )\\d+(,[\\s\\S]*?priceNote: )"(?:[^"\\\\]|\\\\.)*"`,
  );
  if (!re.test(src)) throw new Error(`catalog is missing ${slug}`);
  return src.replace(re, (_match, centsPrefix, notePrefix) => {
    return `${centsPrefix}${cents}${notePrefix}${JSON.stringify(note)}`;
  });
}

let src = readFileSync(CATALOG, "utf8");
const changes = [];

for (const product of PRODUCTS) {
  const { price, compare, title } = await yarboPrice(product.handle);
  const onSale = compare > price;
  const note = product.note(onSale, onSale ? money(compare) : "");
  const next = writeProduct(src, product.slug, price, note);
  if (next !== src) changes.push(`${title}: ${money(price)}${onSale ? ` (was ${money(compare)})` : ""}`);
  src = next;
}

if (changes.length === 0) {
  console.log("Yarbo prices already match.");
  process.exit(0);
}

writeFileSync(CATALOG, src);
console.log(changes.join("\n"));
