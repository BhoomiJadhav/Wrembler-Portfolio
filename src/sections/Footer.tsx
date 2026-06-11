import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const footerLinks = {
  navigation: [
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ],
  services: [
    { label: "Web Design & Development", href: "#services" },
    { label: "Social Media Content", href: "#services" },
    { label: "Ad Banners & Graphics", href: "#services" },
    { label: "SEO & Digital Strategy", href: "#services" },
    { label: "Brand Identity", href: "#services" },
  ],
  connect: [
    { label: "Instagram", href: "https://instagram.com/wrembler" },
    { label: "LinkedIn", href: "https://linkedin.com/in/bhoomijadhav" },
    { label: "Portfolio", href: "https://wrembler.studio" },
    { label: "Email Us", href: "mailto:bhoomijadhav@example.com" },
  ],
};

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Wordmark reveal on scroll
      if (wordmarkRef.current) {
        gsap.fromTo(
          wordmarkRef.current,
          { scaleX: 0.85, opacity: 0 },
          {
            scaleX: 1,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: wordmarkRef.current,
              start: "top 90%",
              once: true,
            },
          },
        );
      }

      // Columns fade stagger
      const cols = footerRef.current?.querySelectorAll(".footer-col");
      if (cols) {
        gsap.fromTo(
          cols,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.12,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top 85%",
              once: true,
            },
          },
        );
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const year = new Date().getFullYear();

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden bg-[#0C0C0C] px-5 pb-8 pt-20 sm:px-8 sm:pt-24 md:px-10 md:pt-32"
    >
      {/* Top divider */}
      <div
        className="mb-16 h-px w-full sm:mb-20 md:mb-24"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, #B600A8 30%, #7621B0 70%, transparent 100%)",
          opacity: 0.35,
        }}
      />

      {/* Info grid */}
      <div className="mx-auto mb-16 grid max-w-6xl grid-cols-2 gap-10 sm:mb-20 sm:grid-cols-2 md:grid-cols-4 md:gap-12">
        {/* Brand column */}
        <div className="footer-col col-span-2 md:col-span-1">
          <a
            href="#"
            className="mb-4 inline-block text-2xl font-black uppercase tracking-wider text-[#D7E2EA]"
          >
            Wrembler
          </a>
          <p
            className="mb-6 max-w-[240px] font-light leading-relaxed text-[#D7E2EA]/45"
            style={{ fontSize: "clamp(0.8rem, 1.3vw, 0.95rem)" }}
          >
            A freelancing studio by Bhoomi Jadhav & Smita Ranjane — crafting
            websites, content &amp; digital growth that builds lasting
            impressions.
          </p>
          {/* Availability */}
          <div className="inline-flex items-center gap-2.5 rounded-full border border-[#D7E2EA]/10 px-4 py-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span className="text-[10px] font-medium uppercase tracking-widest text-[#D7E2EA]/50">
              Open to work
            </span>
          </div>
        </div>

        {/* Navigation */}
        <div className="footer-col">
          <p className="mb-5 text-xs font-medium uppercase tracking-widest text-[#D7E2EA]/35">
            Navigate
          </p>
          <ul className="flex flex-col gap-3">
            {footerLinks.navigation.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="group flex items-center gap-1.5 text-sm font-medium text-[#D7E2EA]/60 transition-colors hover:text-[#D7E2EA]"
                >
                  <span className="h-px w-0 bg-[#B600A8] transition-all duration-300 group-hover:w-3" />
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div className="footer-col">
          <p className="mb-5 text-xs font-medium uppercase tracking-widest text-[#D7E2EA]/35">
            Services
          </p>
          <ul className="flex flex-col gap-3">
            {footerLinks.services.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="group flex items-center gap-1.5 text-sm font-medium text-[#D7E2EA]/60 transition-colors hover:text-[#D7E2EA]"
                >
                  <span className="h-px w-0 bg-[#B600A8] transition-all duration-300 group-hover:w-3" />
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Connect */}
        <div className="footer-col">
          <p className="mb-5 text-xs font-medium uppercase tracking-widest text-[#D7E2EA]/35">
            Connect
          </p>
          <ul className="flex flex-col gap-3">
            {footerLinks.connect.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="group flex items-center gap-1.5 text-sm font-medium text-[#D7E2EA]/60 transition-colors hover:text-[#D7E2EA]"
                >
                  <span className="h-px w-0 bg-[#B600A8] transition-all duration-300 group-hover:w-3" />
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Bhoomi's portfolio link */}
          <div className="mt-6">
            <a
              href="https://bhoomijadhav.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full border border-[#D7E2EA]/15 px-4 py-2 text-xs font-medium uppercase tracking-widest text-[#D7E2EA]/50 transition-all hover:border-[#B600A8]/50 hover:text-[#D7E2EA]"
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
              </svg>
              Bhoomi's Portfolio
            </a>
          </div>
        </div>
      </div>

      {/* Giant wordmark */}
      <div
        ref={wordmarkRef}
        className="relative mb-8 overflow-hidden text-center "
        style={{ transformOrigin: "center" }}
      >
        <span
          className="select-none font-black uppercase leading-none tracking-tighter "
          style={{
            fontSize: "clamp(5rem, 18vw, 22rem)",
            opacity: 0.3,
            display: "block",
            lineHeight: 0.85,
            color: "#ffffff",
          }}
        >
          Wrembler
        </span>
      </div>

      {/* Bottom bar */}
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 border-t border-[#D7E2EA]/8 pt-6 sm:flex-row">
        <p className="text-xs font-medium uppercase tracking-widest text-[#ffffff]/90">
          © {year} Wrembler. All rights reserved.
        </p>
        <p className="text-xs font-medium uppercase tracking-widest text-[#D7E2EA]/90">
          Built by{" "}
          <a
            href="https://bhoomijadhav.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#ffffff]/ transition-colors hover:text-[#D7E2EA]"
          >
            Bhoomi Jadhav
          </a>
        </p>
      </div>
    </footer>
  );
}
