import { SITE } from "../data/content";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line">
      <div className="site-container flex flex-col gap-4 py-10 md:flex-row md:items-center md:justify-between md:gap-6">
        <p className="font-mono text-[0.66rem] font-semibold tracking-[0.22em] text-dim">
          {SITE.wordmark} <span className="text-faint">·</span>{" "}
          <span className="text-dim">{SITE.tagline}</span>
        </p>
        <div className="flex items-center gap-8">
          <a
            href="#top"
            className="py-2 font-mono text-[0.66rem] tracking-[0.2em] text-faint transition-colors hover:text-accent"
          >
            BACK TO TOP ↑
          </a>
          <p className="font-mono text-[0.66rem] tracking-[0.2em] text-faint">
            © {year} — STATIC SITE, NO COOKIES
          </p>
        </div>
      </div>
    </footer>
  );
}
