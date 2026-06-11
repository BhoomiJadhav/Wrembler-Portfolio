// import FadeIn from '../components/FadeIn';
// import { services } from '../data/services';

// export default function ServicesSection() {
//   return (
//     <section
//       id="services"
//       className="rounded-t-[40px] bg-white px-5 py-20 sm:rounded-t-[50px] sm:px-8 sm:py-24 md:rounded-t-[60px] md:px-10 md:py-32"
//     >
//       <h2
//         className="mb-16 text-center font-black uppercase text-[#0C0C0C] sm:mb-20 md:mb-28"
//         style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
//       >
//         Services
//       </h2>

//       <div className="mx-auto max-w-5xl">
//         {services.map((service, index) => (
//           <FadeIn key={service.number} delay={index * 0.1}>
//             <div
//               className="flex flex-col gap-4 py-8 sm:flex-row sm:items-start sm:gap-8 sm:py-10 md:py-12"
//               style={{
//                 borderBottom:
//                   index < services.length - 1
//                     ? '1px solid rgba(12, 12, 12, 0.15)'
//                     : undefined,
//               }}
//             >
//               <span
//                 className="shrink-0 font-black text-[#0C0C0C]"
//                 style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
//               >
//                 {service.number}
//               </span>

//               <div className="flex flex-col gap-2">
//                 <h3
//                   className="font-medium uppercase text-[#0C0C0C]"
//                   style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
//                 >
//                   {service.name}
//                 </h3>
//                 <p
//                   className="max-w-2xl font-light leading-relaxed opacity-60 text-[#0C0C0C]"
//                   style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)' }}
//                 >
//                   {service.description}
//                 </p>
//               </div>
//             </div>
//           </FadeIn>
//         ))}
//       </div>
//     </section>
//   );
// }
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { services } from "../data/services";

gsap.registerPlugin(ScrollTrigger);

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading reveal
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 85%",
              once: true,
            },
          },
        );
      }

      // Each service row
      const rows = sectionRef.current?.querySelectorAll(".service-row");
      rows?.forEach((row, i) => {
        gsap.fromTo(
          row,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            delay: i * 0.08,
            scrollTrigger: { trigger: row, start: "top 88%", once: true },
          },
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="rounded-t-[40px] bg-white px-5 py-20 sm:rounded-t-[50px] sm:px-8 sm:py-24 md:rounded-t-[60px] md:px-10 md:py-32"
    >
      <h2
        ref={headingRef}
        className="mb-16 text-center font-black uppercase text-[#0C0C0C] sm:mb-20 md:mb-28"
        style={{ fontSize: "clamp(3rem, 12vw, 160px)", opacity: 0 }}
      >
        Services
      </h2>

      <div className="mx-auto max-w-5xl">
        {services.map((service, index) => (
          <div
            key={service.number}
            className="service-row flex flex-col gap-4 py-8 sm:flex-row sm:items-start sm:gap-8 sm:py-10 md:py-12"
            style={{
              borderBottom:
                index < services.length - 1
                  ? "1px solid rgba(12, 12, 12, 0.15)"
                  : undefined,
              opacity: 0,
            }}
          >
            <span
              className="shrink-0 font-black text-[#0C0C0C]"
              style={{ fontSize: "clamp(3rem, 10vw, 140px)" }}
            >
              {service.number}
            </span>
            <div className="flex flex-col gap-2">
              <h3
                className="font-medium uppercase text-[#0C0C0C]"
                style={{ fontSize: "clamp(1rem, 2.2vw, 2.1rem)" }}
              >
                {service.name}
              </h3>
              <p
                className="max-w-2xl font-light leading-relaxed opacity-60 text-[#0C0C0C]"
                style={{ fontSize: "clamp(0.85rem, 1.6vw, 1.25rem)" }}
              >
                {service.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
