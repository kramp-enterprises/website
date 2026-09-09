import { Link } from "@tanstack/react-router";
import { BrandMark } from "@/components/brand-mark";
import { ADDRESS, CITY, EMAIL, HOURS, PHONE, PHONE_TEL } from "@/lib/catalog";

export function SiteFooter() {
  return (
    <footer className="bg-forest-deep text-cream">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-4">
        <div className="md:col-span-1">
          <BrandMark invert />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/70">
            Grain systems, Yarbo yard robots, and custom metal — built and
            backed from Brentford, South Dakota.
          </p>
        </div>
        <div>
          <p className="font-display text-xs uppercase tracking-[0.2em] text-cream/50">
            Work
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link to="/grain-bins" className="hover:text-leaf-bright">
                Grain bins & handling
              </Link>
            </li>
            <li>
              <Link to="/yarbo" className="hover:text-leaf-bright">
                Yarbo yard care
              </Link>
            </li>
            <li>
              <Link to="/fabrication" className="hover:text-leaf-bright">
                Custom fab & signs
              </Link>
            </li>
            <li>
              <Link to="/store" className="hover:text-leaf-bright">
                Store
              </Link>
            </li>
            <li>
              <Link to="/gallery" className="hover:text-leaf-bright">
                Gallery
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="font-display text-xs uppercase tracking-[0.2em] text-cream/50">
            Shop
          </p>
          <p className="mt-3 text-sm leading-relaxed text-cream/80">
            {ADDRESS}
            <br />
            {CITY}
          </p>
          <p className="mt-3 text-sm text-cream/80">{HOURS}</p>
        </div>
        <div>
          <p className="font-display text-xs uppercase tracking-[0.2em] text-cream/50">
            Call
          </p>
          <a
            href={`tel:${PHONE_TEL}`}
            className="mt-3 block font-display text-2xl tracking-wide text-cream"
          >
            {PHONE}
          </a>
          <a href={`mailto:${EMAIL}`} className="mt-2 block text-sm text-cream/70">
            {EMAIL}
          </a>
          <Link
            to="/quote"
            className="mt-4 inline-block font-display text-xs uppercase tracking-[0.18em] text-leaf-bright"
          >
            Request a bin quote →
          </Link>
        </div>
      </div>
      <div className="border-t border-cream/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-4 text-xs text-cream/45 sm:flex-row sm:justify-between">
          <span>© {new Date().getFullYear()} Kramp Enterprises Inc.</span>
          <span>krampenterprises.com · formerly krampconstruction.com</span>
        </div>
      </div>
    </footer>
  );
}
