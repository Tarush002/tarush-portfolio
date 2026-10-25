import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { LINKS, NAV_LINKS, SITE } from "../data/content";
import { ArrowUpRight } from "./Icons";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const wasOpen = useRef(false);

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

  /* modal behaviour for the mobile menu: scroll lock, Esc, simple focus trap,
     and focus returned to the toggle on close (only after a real open) */
  useEffect(() => {
    if (!open) {
      if (wasOpen.current) {
        wasOpen.current = false;
        menuBtnRef.current?.focus({ preventScroll: true });
      }
      return;
    }
    wasOpen.current = true;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab" || !menuRef.current) return;
      const focusables = menuRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const current = document.activeElement;
      const inside = menuRef.current.contains(current);
      if (e.shiftKey && (!inside || current === first)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (!inside || current === last)) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  /* clear the scroll lock synchronously (the effect cleanup runs too late for
     the default anchor action) so a link tap navigates instead of being
     swallowed while the viewport is still locked */
  const close = () => {
    document.body.style.overflow = "";
    setOpen(false);
  };

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
              aria-current={active === link.href.slice(1) ? "true" : undefined}
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

      {/*
        Overlay lives at <body> level (stacking order: grain 80 > skip-link 100 >
        header 50 > overlay 40 > page). It must not be a DOM child of this
        header: when .nav-scrolled applies backdrop-filter, the header becomes
        the containing block for fixed descendants and an inset-0 overlay
        collapses to the 64px header box. Portaling escapes that entirely. */}
      {open &&
        createPortal(
          <div
            ref={menuRef}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-bg/97 pt-16 backdrop-blur-xl"
          >
            {/* pt-16 donates its row to the real header, which paints above
                the overlay — so the ☰→✕ toggle (header, z-50) stays visible
                and clickable. The duplicate wordmark row is therefore gone. */}

            <nav
              className="site-container flex flex-1 flex-col justify-center gap-2 pb-16"
              aria-label="Mobile"
            >
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
          </div>,
          document.body,
        )}
    </header>
  );
}
