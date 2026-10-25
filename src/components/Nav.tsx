import { useEffect, useRef, useState } from "react";
import { LINKS, NAV_LINKS, SITE } from "../data/content";
import { ArrowUpRight } from "./Icons";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const menuBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* highlight the section currently in the viewport band */
  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.getElementById(l.href.slice(1))).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (sections.length === 0) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-42% 0px -52% 0px", threshold: 0 },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  /* modal behaviour for the mobile menu */
  useEffect(() => {
    if (!open) {
      menuBtnRef.current?.focus({ preventScroll: true });
      return;
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className={`nav-shell ${scrolled ? "nav-scrolled" : ""}`}>
      <div className="site-container flex h-16 items-center justify-between gap-6">
        <a
          href="#top"
          className="flex items-center gap-3 font-mono text-[0.78rem] font-semibold tracking-[0.28em] text-ink transition-colors hover:text-accent"
          aria-label="TARUSH SINGH — back to top"
        >
          <span className="block h-[7px] w-[7px] bg-accent" aria-hidden="true" />
          {SITE.wordmark}
        </a>

        <nav className="hidden items-center gap-9 md:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`nav-link ${active === link.href.slice(1) ? "nav-active" : ""}`}
            >
              {link.label}
            </a>
          ))}
          <span className="h-4 w-px bg-line-strong" aria-hidden="true" />
          <a
            href={LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link flex items-center gap-1.5 hover:text-accent"
          >
            GitHub <ArrowUpRight className="text-[0.9rem]" />
          </a>
        </nav>

        <button
          ref={menuBtnRef}
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="relative z-50 -mr-1 flex h-10 w-10 flex-col items-center justify-center gap-[6px] md:hidden"
        >
          <span
            className={`block h-px w-6 bg-ink transition-transform duration-300 ${
              open ? "translate-y-[3.5px] rotate-45" : ""
            }`}
            aria-hidden="true"
          />
          <span
            className={`block h-px w-6 bg-ink transition-transform duration-300 ${
              open ? "-translate-y-[3.5px] -rotate-45" : ""
            }`}
            aria-hidden="true"
          />
        </button>
      </div>

      {open && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-bg/97 backdrop-blur-xl"
        >
          <div className="site-container flex h-16 items-center justify-between">
            <span className="flex items-center gap-3 font-mono text-[0.78rem] font-semibold tracking-[0.28em] text-ink">
              <span className="block h-[7px] w-[7px] bg-accent" aria-hidden="true" />
              {SITE.wordmark}
            </span>
          </div>

          <nav className="site-container flex flex-1 flex-col justify-center gap-2 pb-16" aria-label="Mobile">
            {NAV_LINKS.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                onClick={close}
                className="flex items-baseline gap-5 border-b border-line py-5 font-sans text-4xl font-medium tracking-tight text-ink transition-colors hover:text-accent"
              >
                <span className="font-mono text-xs text-faint" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {link.label}
              </a>
            ))}

            <div className="mt-10 grid gap-4">
              {[
                { label: "GITHUB", href: LINKS.github },
                { label: "LINKEDIN", href: LINKS.linkedin },
              ].map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between font-mono text-[0.72rem] font-medium tracking-[0.2em] text-dim transition-colors hover:text-accent"
                >
                  {l.label} <ArrowUpRight />
                </a>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
