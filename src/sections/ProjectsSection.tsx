// import { useRef } from 'react';
// import { motion, useScroll, useTransform } from 'framer-motion';
// import FadeIn from '../components/FadeIn';
// import LiveProjectButton from '../components/LiveProjectButton';
// import { projects } from '../data/projects';
// import type { Project } from '../data/projects';

// function ProjectCard({
//   project,
//   index,
//   totalCards,
// }: {
//   project: Project;
//   index: number;
//   totalCards: number;
// }) {
//   const containerRef = useRef<HTMLDivElement>(null);

//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ['start end', 'start start'],
//   });

//   const targetScale = 1 - (totalCards - 1 - index) * 0.03;
//   const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

//   return (
//     <div ref={containerRef} className="h-[85vh]">
//       <motion.div
//         className="sticky top-24 md:top-32"
//         style={{
//           top: `${index * 28}px`,
//           scale,
//         }}
//       >
//         <div className="rounded-[40px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:rounded-[50px] sm:p-6 md:rounded-[60px] md:p-8">
//           <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
//             <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-6">
//               <span
//                 className="font-black text-[#D7E2EA]"
//                 style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
//               >
//                 {project.number}
//               </span>
//               <div>
//                 <p className="text-sm font-medium uppercase tracking-widest text-[#D7E2EA]/60">
//                   {project.category}
//                 </p>
//                 <h3
//                   className="font-medium uppercase text-[#D7E2EA]"
//                   style={{ fontSize: 'clamp(1.25rem, 3vw, 2.5rem)' }}
//                 >
//                   {project.name}
//                 </h3>
//               </div>
//             </div>
//             <LiveProjectButton href={project.href} />
//           </div>

//           <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
//             <div className="flex w-full flex-col gap-3 sm:w-[40%] sm:gap-4">
//               <img
//                 src={project.images.col1Top}
//                 alt={`${project.name} preview 1`}
//                 loading="lazy"
//                 className="w-full rounded-[40px] object-cover sm:rounded-[50px] md:rounded-[60px]"
//                 style={{ height: 'clamp(130px, 16vw, 230px)' }}
//               />
//               <img
//                 src={project.images.col1Bottom}
//                 alt={`${project.name} preview 2`}
//                 loading="lazy"
//                 className="w-full rounded-[40px] object-cover sm:rounded-[50px] md:rounded-[60px]"
//                 style={{ height: 'clamp(160px, 22vw, 340px)' }}
//               />
//             </div>
//             <div className="w-full sm:w-[60%]">
//               <img
//                 src={project.images.col2}
//                 alt={`${project.name} preview 3`}
//                 loading="lazy"
//                 className="h-full min-h-[280px] w-full rounded-[40px] object-cover sm:min-h-0 sm:rounded-[50px] md:rounded-[60px]"
//               />
//             </div>
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// }

// export default function ProjectsSection() {
//   return (
//     <section
//       id="projects"
//       className="relative z-10 -mt-10 rounded-t-[40px] bg-[#0C0C0C] px-5 py-20 sm:-mt-12 sm:rounded-t-[50px] sm:px-8 sm:py-24 md:-mt-14 md:rounded-t-[60px] md:px-10 md:py-32"
//     >
//       <FadeIn delay={0} y={40}>
//         <h2
//           className="hero-heading mb-16 text-center font-black uppercase leading-none tracking-tight sm:mb-20 md:mb-28"
//           style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
//         >
//           Projects
//         </h2>
//       </FadeIn>

//       <div className="mx-auto max-w-6xl">
//         {projects.map((project, index) => (
//           <ProjectCard
//             key={project.number}
//             project={project}
//             index={index}
//             totalCards={projects.length}
//           />
//         ))}
//       </div>
//     </section>
//   );
// }
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "../data/projects";

gsap.registerPlugin(ScrollTrigger);

function FluidBackground() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;
    const blobs = svgRef.current.querySelectorAll(".fluid-blob");
    blobs.forEach((blob, i) => {
      gsap.to(blob, {
        attr: { d: generateBlobPath(i + 1) },
        duration: 6 + i * 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 1.5,
      });
      gsap.to(blob, {
        x: i % 2 === 0 ? 40 : -40,
        y: i % 2 === 0 ? -30 : 30,
        duration: 8 + i * 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 0.8,
      });
    });
    return () => gsap.killTweensOf(blobs);
  }, []);

  return (
    <svg
      ref={svgRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 1200 700"
      preserveAspectRatio="xMidYMid slice"
    >
      <path
        className="fluid-blob"
        d={generateBlobPath(0)}
        fill="url(#bG1)"
        opacity="0.12"
      />
      <path
        className="fluid-blob"
        d={generateBlobPath(1)}
        fill="url(#bG2)"
        opacity="0.09"
      />
      <path
        className="fluid-blob"
        d={generateBlobPath(2)}
        fill="url(#bG3)"
        opacity="0.07"
      />
      <defs>
        <radialGradient id="bG1" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#B600A8" />
          <stop offset="100%" stopColor="#0C0C0C" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="bG2" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#7621B0" />
          <stop offset="100%" stopColor="#0C0C0C" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="bG3" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#BE4C00" />
          <stop offset="100%" stopColor="#0C0C0C" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}

function generateBlobPath(seed: number): string {
  const offsets = [
    [600, 350, 380, 280, 320, 400, 260, 300, 400, 280, 340, 420],
    [250, 200, 320, 150, 200, 280, 180, 160, 280, 140, 220, 300],
    [900, 450, 300, 220, 260, 340, 200, 240, 320, 220, 280, 360],
  ][seed % 3];
  const [cx, cy, r0, r1, r2, r3, r4, r5, r6, r7, r8, r9] = offsets;
  return `M ${cx + r0} ${cy} C ${cx + r1} ${cy - r2}, ${cx + r3} ${cy - r4}, ${cx} ${cy - r5} C ${cx - r6} ${cy - r7}, ${cx - r8} ${cy - r9}, ${cx - r0} ${cy} C ${cx - r1} ${cy + r2}, ${cx - r3} ${cy + r4}, ${cx} ${cy + r5} C ${cx + r6} ${cy + r7}, ${cx + r8} ${cy + r9}, ${cx + r0} ${cy} Z`;
}

function CursorFollower({
  sectionRef,
}: {
  sectionRef: React.RefObject<HTMLElement>;
}) {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !dotRef.current || !ringRef.current) return;
    let mx = 0,
      my = 0,
      rx = 0,
      ry = 0,
      rafId: number;

    const onMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      mx = e.clientX - rect.left;
      my = e.clientY - rect.top;
      gsap.to(dotRef.current, {
        x: mx,
        y: my,
        duration: 0.15,
        ease: "power2.out",
      });
    };
    const loop = () => {
      rx += (mx - rx) * 0.08;
      ry += (my - ry) * 0.08;
      gsap.set(ringRef.current, { x: rx, y: ry });
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);
    section.addEventListener("mousemove", onMove);

    const cards = section.querySelectorAll(".proj-item");
    cards.forEach((c) => {
      c.addEventListener("mouseenter", () => setLabel("View"));
      c.addEventListener("mouseleave", () => setLabel(""));
    });
    return () => {
      section.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
    };
  }, [sectionRef]);

  return (
    <div className="pointer-events-none absolute inset-0 z-50 overflow-hidden">
      <div
        ref={dotRef}
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
        style={{ width: 8, height: 8, mixBlendMode: "difference" }}
      />
      <div
        ref={ringRef}
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/40 flex items-center justify-center"
        style={{
          width: label ? 80 : 40,
          height: label ? 80 : 40,
          transition: "width 0.3s ease, height 0.3s ease",
          mixBlendMode: "difference",
        }}
      >
        {label && (
          <span className="text-[10px] font-medium uppercase tracking-widest text-white">
            {label}
          </span>
        )}
      </div>
    </div>
  );
}

function ProjectItem({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const itemRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (!itemRef.current) return;
    const el = itemRef.current;
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 88%",
      once: true,
      onEnter: () =>
        gsap.fromTo(
          el,
          { y: 70, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            delay: index * 0.1,
          },
        ),
    });
    return () => st.kill();
  }, [index]);

  useEffect(() => {
    const item = itemRef.current;
    const img = imgRef.current;
    if (!item || !img) return;
    const onMove = (e: MouseEvent) => {
      const r = item.getBoundingClientRect();
      const cx = (e.clientX - r.left - r.width / 2) / r.width;
      const cy = (e.clientY - r.top - r.height / 2) / r.height;
      gsap.to(img, {
        x: cx * 18,
        y: cy * 12,
        rotateY: cx * 6,
        rotateX: -cy * 6,
        duration: 0.6,
        ease: "power2.out",
      });
    };
    const onLeave = () =>
      gsap.to(img, {
        x: 0,
        y: 0,
        rotateY: 0,
        rotateX: 0,
        duration: 0.8,
        ease: "elastic.out(1,0.5)",
      });
    item.addEventListener("mousemove", onMove);
    item.addEventListener("mouseleave", onLeave);
    return () => {
      item.removeEventListener("mousemove", onMove);
      item.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  const handleEnter = () => {
    setHovered(true);
    if (infoRef.current)
      gsap.to(infoRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.35,
        ease: "power2.out",
      });
  };
  const handleLeave = () => {
    setHovered(false);
    if (infoRef.current)
      gsap.to(infoRef.current, {
        opacity: 0,
        y: 8,
        duration: 0.25,
        ease: "power2.in",
      });
  };

  return (
    <div
      ref={itemRef}
      className="proj-item group relative"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{ opacity: 0 }}
    >
      {index > 0 && (
        <div
          className="h-px w-full"
          style={{
            background:
              "linear-gradient(90deg, transparent, #D7E2EA22, transparent)",
          }}
        />
      )}
      <div className="flex items-center gap-4 py-5 sm:gap-8 sm:py-7 md:gap-12 md:py-9">
        {/* Number */}
        <span
          className="select-none shrink-0 font-black leading-none transition-all duration-500"
          style={{
            fontSize: "clamp(2.5rem, 6vw, 7.5rem)",
            opacity: hovered ? 1 : 0.12,
            backgroundImage: hovered
              ? "linear-gradient(123deg, #B600A8 0%, #7621B0 50%, #BE4C00 100%)"
              : "none",
            WebkitBackgroundClip: hovered ? "text" : undefined,
            WebkitTextFillColor: hovered ? "transparent" : undefined,
            color: hovered ? "transparent" : "#D7E2EA",
          }}
        >
          {project.number}
        </span>

        {/* Title */}
        <div className="flex-1 overflow-hidden">
          <div
            ref={infoRef}
            style={{ opacity: 0, transform: "translateY(8px)" }}
          >
            <p className="mb-0.5 text-xs font-medium uppercase tracking-widest text-[#D7E2EA]/40">
              {project.category}
            </p>
          </div>
          <h3
            className="font-black uppercase leading-tight text-[#D7E2EA]"
            style={{
              fontSize: "clamp(1.1rem, 2.8vw, 2.8rem)",
              transform: hovered ? "translateX(10px)" : "translateX(0)",
              transition: "transform 0.45s cubic-bezier(0.25,0.1,0.25,1)",
            }}
          >
            {project.name}
          </h3>
        </div>

        {/* Image */}
        <div
          className="relative shrink-0 overflow-hidden rounded-2xl sm:rounded-3xl"
          style={{
            width: "clamp(80px, 14vw, 200px)",
            height: "clamp(55px, 9vw, 130px)",
            perspective: "800px",
            opacity: hovered ? 1 : 0.5,
            transform: hovered ? "scale(1.06)" : "scale(1)",
            transition: "opacity 0.45s, transform 0.45s",
          }}
        >
          <div
            ref={imgRef}
            className="h-full w-full"
            style={{ transformStyle: "preserve-3d", willChange: "transform" }}
          >
            <img
              src={project.images.col2}
              alt={project.name}
              loading="lazy"
              className="h-full w-full object-cover"
              style={{ transform: "scale(1.15)" }}
            />
            <div
              className="absolute inset-0 transition-opacity duration-500"
              style={{
                background:
                  "linear-gradient(135deg,#B600A820 0%,#7621B015 100%)",
                opacity: hovered ? 0 : 1,
              }}
            />
          </div>
        </div>

        {/* Arrow */}
        <div
          className="shrink-0"
          style={{
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateX(0)" : "translateX(-10px)",
            transition: "opacity 0.3s, transform 0.3s",
          }}
        >
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D7E2EA]/20 text-[#D7E2EA] hover:border-[#B600A8] hover:bg-[#B600A8]/10 transition-all"
            aria-label={`View ${project.name}`}
          >
            →
          </a>
        </div>
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!headingRef.current) return;
    const letters = headingRef.current.querySelectorAll(".h-letter");
    const st = ScrollTrigger.create({
      trigger: headingRef.current,
      start: "top 82%",
      once: true,
      onEnter: () =>
        gsap.fromTo(
          letters,
          { y: 90, opacity: 0, skewY: 5 },
          {
            y: 0,
            opacity: 1,
            skewY: 0,
            stagger: 0.06,
            duration: 1,
            ease: "power3.out",
          },
        ),
    });
    return () => st.kill();
  }, []);

  useEffect(() => {
    if (!headingRef.current || !sectionRef.current) return;
    const tw = gsap.to(headingRef.current, {
      y: -50,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "top top",
        scrub: true,
      },
    });
    return () => {
      tw.scrollTrigger?.kill();
    };
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative z-10 -mt-10 overflow-hidden rounded-t-[40px] bg-[#0C0C0C] px-5 pt-20 pb-20 sm:-mt-12 sm:rounded-t-[50px] sm:px-8 sm:pt-24 sm:pb-24 md:-mt-14 md:rounded-t-[60px] md:px-10 md:pt-32 md:pb-32"
    >
      <FluidBackground />
      <CursorFollower sectionRef={sectionRef as React.RefObject<HTMLElement>} />

      {/* Heading */}
      <div
        ref={headingRef}
        className="relative z-10 mb-16 overflow-hidden text-center sm:mb-20 md:mb-24"
      >
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
          aria-hidden="true"
        >
          <span
            className="select-none whitespace-nowrap font-black uppercase leading-none text-[#D7E2EA]"
            style={{
              fontSize: "clamp(5rem, 20vw, 26rem)",
              opacity: 0.025,
              letterSpacing: "-0.02em",
            }}
          >
            Work
          </span>
        </div>
        <div className="relative z-10">
          <div className="overflow-hidden">
            <h2
              className="hero-heading inline-block font-black uppercase leading-none tracking-tight"
              style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
            >
              {"Projects".split("").map((char, i) => (
                <span
                  key={i}
                  className="h-letter inline-block"
                  style={{ opacity: 0 }}
                >
                  {char}
                </span>
              ))}
            </h2>
          </div>
          <p
            className="mt-3 font-light uppercase tracking-[0.3em] text-[#D7E2EA]/30"
            style={{ fontSize: "clamp(0.65rem, 1.2vw, 0.85rem)" }}
          >
            Selected work
          </p>
        </div>
      </div>

      {/* List */}
      <div className="relative z-10 mx-auto max-w-6xl">
        {projects.map((project, index) => (
          <ProjectItem key={project.number} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
