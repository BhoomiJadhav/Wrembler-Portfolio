import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FadeIn from "../components/FadeIn";

gsap.registerPlugin(ScrollTrigger);

const FORMSPREE_URL = "https://formspree.io/f/maqzjvyk";

const contactLinks = [
  {
    label: "Email",
    value: "bhoomijadhav706@gmail.com",
    href: "mailto:bhoomijadhav706@gmail.com",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M2 7l10 7 10-7" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    value: "@wrembler",
    href: "https://instagram.com/wrembler",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    value: "Bhoomi Jadhav",
    href: "https://linkedin.com/in/bhoomijadhav",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="2" width="20" height="20" rx="3" />
        <path d="M7 10v7M7 7v.01M12 10v7M12 13a3 3 0 016 0v4" />
      </svg>
    ),
  },
  {
    label: "Portfolio",
    value: "wrembler.studio",
    href: "https://wrembler.studio",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15 15 0 010 20M12 2a15 15 0 000 20" />
      </svg>
    ),
  },
];

type FormState = "idle" | "loading" | "success" | "error";

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);

  const [formState, setFormState] = useState<FormState>("idle");
  const [fields, setFields] = useState({ name: "", email: "", message: "" });

  // GSAP scroll-triggered animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading letter stagger
      if (headingRef.current) {
        const letters = headingRef.current.querySelectorAll(".contact-letter");
        gsap.fromTo(
          letters,
          { y: 120, opacity: 0, rotateX: -90 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            stagger: 0.04,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 85%",
              once: true,
            },
          },
        );
      }

      // Form slide-in from left
      if (formRef.current) {
        gsap.fromTo(
          formRef.current,
          { x: -80, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: formRef.current,
              start: "top 80%",
              once: true,
            },
          },
        );

        // Stagger form fields
        const inputs = formRef.current.querySelectorAll(".form-field");
        gsap.fromTo(
          inputs,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.12,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: formRef.current,
              start: "top 78%",
              once: true,
            },
          },
        );
      }

      // Contact links stagger from right
      if (linksRef.current) {
        const links = linksRef.current.querySelectorAll(".contact-link");
        gsap.fromTo(
          links,
          { x: 80, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: linksRef.current,
              start: "top 80%",
              once: true,
            },
          },
        );
      }

      // Floating orbit ring ambient animation
      if (orbitRef.current) {
        gsap.to(orbitRef.current, {
          rotation: 360,
          duration: 20,
          repeat: -1,
          ease: "none",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("loading");

    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(fields),
      });

      if (res.ok) {
        setFormState("success");
        setFields({ name: "", email: "", message: "" });

        // Success animation
        if (formRef.current) {
          gsap.fromTo(
            formRef.current,
            { scale: 0.98 },
            { scale: 1, duration: 0.4, ease: "back.out(1.7)" },
          );
        }
      } else {
        setFormState("error");
      }
    } catch {
      setFormState("error");
    }

    if (formState === "success" || formState === "error") {
      setTimeout(() => setFormState("idle"), 4000);
    }
  };

  // Split heading text for letter animation
  const headingText = "Contact";
  const letters = headingText.split("");

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative z-10 -mt-10 overflow-hidden rounded-t-[40px] bg-[#0C0C0C] px-5 py-20 sm:-mt-12 sm:rounded-t-[50px] sm:px-8 sm:py-24 md:-mt-14 md:rounded-t-[60px] md:px-10 md:py-32"
    >
      {/* Ambient decorative orbit */}
      <div
        ref={orbitRef}
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.04]"
        style={{
          width: "clamp(400px, 70vw, 900px)",
          height: "clamp(400px, 70vw, 900px)",
        }}
      >
        <svg
          viewBox="0 0 900 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <ellipse
            cx="450"
            cy="450"
            rx="430"
            ry="180"
            stroke="#B600A8"
            strokeWidth="1.5"
          />
          <ellipse
            cx="450"
            cy="450"
            rx="430"
            ry="180"
            stroke="#7621B0"
            strokeWidth="1"
            transform="rotate(60 450 450)"
          />
          <ellipse
            cx="450"
            cy="450"
            rx="430"
            ry="180"
            stroke="#BE4C00"
            strokeWidth="0.8"
            transform="rotate(120 450 450)"
          />
        </svg>
      </div>

      {/* Heading */}
      <div className="relative  mb-16 overflow-hidden text-center sm:mb-20 md:mb-28">
        <h2
          ref={headingRef}
          className="hero-heading inline-block font-black uppercase leading-none tracking-tight ]"
          style={{
            fontSize: "clamp(3rem, 12vw, 160px)",
            perspective: "600px",
            color: "#ffffff",
          }}
        >
          {letters.map((letter, i) => (
            <span
              key={i}
              className="contact-letter inline-block text-white"
              style={{ display: "inline-block", color: "#ffffff" }}
            >
              {letter}
            </span>
          ))}
        </h2>
      </div>

      {/* Two-column layout */}
      <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
        {/* ── Left: Form ── */}
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 rounded-[40px] border-2 border-[#D7E2EA]/20 bg-[#0C0C0C] p-7 sm:rounded-[50px] sm:p-9 md:rounded-[60px] md:p-10"
        >
          <FadeIn delay={0}>
            <p
              className="font-light uppercase tracking-widest text-[#D7E2EA]/50"
              style={{ fontSize: "clamp(0.7rem, 1.2vw, 0.9rem)" }}
            >
              Send a message
            </p>
          </FadeIn>

          {/* Name */}
          <div className="form-field flex flex-col gap-2">
            <label className="text-xs font-medium uppercase tracking-widest text-[#D7E2EA]/50">
              Name
            </label>
            <input
              type="text"
              name="name"
              required
              value={fields.name}
              onChange={handleChange}
              placeholder="Your name"
              className="w-full rounded-2xl border border-[#D7E2EA]/15 bg-[#D7E2EA]/5 px-5 py-3.5 text-sm font-medium text-[#D7E2EA] placeholder-[#D7E2EA]/25 outline-none transition-all duration-300 focus:border-[#B600A8]/60 focus:bg-[#B600A8]/5 focus:ring-0"
            />
          </div>

          {/* Email */}
          <div className="form-field flex flex-col gap-2">
            <label className="text-xs font-medium uppercase tracking-widest text-[#D7E2EA]/50">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              value={fields.email}
              onChange={handleChange}
              placeholder="your@email.com"
              className="w-full rounded-2xl border border-[#D7E2EA]/15 bg-[#D7E2EA]/5 px-5 py-3.5 text-sm font-medium text-[#D7E2EA] placeholder-[#D7E2EA]/25 outline-none transition-all duration-300 focus:border-[#B600A8]/60 focus:bg-[#B600A8]/5 focus:ring-0"
            />
          </div>

          {/* Message */}
          <div className="form-field flex flex-col gap-2">
            <label className="text-xs font-medium uppercase tracking-widest text-[#D7E2EA]/50">
              Message
            </label>
            <textarea
              name="message"
              required
              rows={5}
              value={fields.message}
              onChange={handleChange}
              placeholder="Tell us about your project..."
              className="w-full resize-none rounded-2xl border border-[#D7E2EA]/15 bg-[#D7E2EA]/5 px-5 py-3.5 text-sm font-medium text-[#D7E2EA] placeholder-[#D7E2EA]/25 outline-none transition-all duration-300 focus:border-[#B600A8]/60 focus:bg-[#B600A8]/5 focus:ring-0"
            />
          </div>

          {/* Submit */}
          <div className="form-field">
            <button
              type="submit"
              disabled={formState === "loading"}
              className="group relative inline-flex w-full items-center justify-center overflow-hidden rounded-full px-8 py-4 text-sm font-medium uppercase tracking-widest text-white outline outline-2 outline-offset-[-3px] outline-white transition-opacity hover:opacity-90 disabled:opacity-60"
              style={{
                background:
                  "linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)",
                boxShadow:
                  "0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset",
              }}
            >
              {formState === "loading" ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="h-4 w-4 animate-spin"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8z"
                    />
                  </svg>
                  Sending…
                </span>
              ) : formState === "success" ? (
                <span className="flex items-center gap-2">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  Message Sent!
                </span>
              ) : formState === "error" ? (
                "Something went wrong — try again"
              ) : (
                "Let's work together →"
              )}
            </button>
          </div>
        </form>

        {/* ── Right: Info ── */}
        <div ref={linksRef} className="flex flex-col justify-between gap-10">
          {/* Tagline */}
          <div className="contact-link">
            <FadeIn delay={0.1} y={30}>
              <p
                className="font-medium leading-snug text-[#D7E2EA]"
                style={{ fontSize: "clamp(1.1rem, 2.5vw, 2rem)" }}
              >
                Got a project in mind?
                <br />
                <span className="opacity-40">We'd love to hear about it.</span>
              </p>
            </FadeIn>
          </div>

          {/* Contact links */}
          <div className="flex flex-col gap-4">
            {contactLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="contact-link group flex items-center gap-5 rounded-2xl border border-[#D7E2EA]/10 bg-[#D7E2EA]/5 px-6 py-4 transition-all duration-300 hover:border-[#B600A8]/40 hover:bg-[#B600A8]/8"
              >
                <span className="shrink-0 text-[#D7E2EA]/40 transition-colors group-hover:text-[#B600A8]">
                  {link.icon}
                </span>
                <div className="flex flex-col">
                  <span className="text-xs font-medium uppercase tracking-widest text-[#D7E2EA]/40 group-hover:text-[#D7E2EA]/60">
                    {link.label}
                  </span>
                  <span className="text-sm font-medium text-[#D7E2EA] group-hover:text-white">
                    {link.value}
                  </span>
                </div>
                <span className="ml-auto text-[#D7E2EA]/20 transition-all group-hover:translate-x-1 group-hover:text-[#D7E2EA]/60">
                  →
                </span>
              </a>
            ))}
          </div>

          {/* Availability badge */}
          <div className="contact-link">
            <div className="inline-flex items-center gap-3 rounded-full border border-[#D7E2EA]/10 px-5 py-2.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
              </span>
              <span className="text-xs font-medium uppercase tracking-widest text-[#D7E2EA]/60">
                Available for new projects
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
