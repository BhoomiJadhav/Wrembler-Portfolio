import { useEffect, useRef, useState } from 'react';
import { marqueeImages } from '../data/marqueeImages';

const row1Images = marqueeImages.slice(0, 11);
const row2Images = marqueeImages.slice(11);

function MarqueeRow({
  images,
  direction,
  offset,
}: {
  images: string[];
  direction: 'left' | 'right';
  offset: number;
}) {
  const tripled = [...images, ...images, ...images];

  const translateX =
    direction === 'right' ? offset - 200 : -(offset - 200);

  return (
    <div
      className="flex gap-3"
      style={{
        transform: `translateX(${translateX}px)`,
        willChange: 'transform',
      }}
    >
      {tripled.map((src, index) => (
        <img
          key={`${src}-${index}`}
          src={src}
          alt=""
          loading="lazy"
          className="h-[270px] w-[420px] shrink-0 rounded-2xl object-cover"
        />
      ))}
    </div>
  );
}

export default function MarqueeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const sectionTop = window.scrollY + rect.top;
      const scrollOffset =
        (window.scrollY - sectionTop + window.innerHeight) * 0.3;

      setOffset(scrollOffset);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="flex flex-col gap-3 bg-[#0C0C0C] pb-10 pt-24 sm:pt-32 md:pt-40"
    >
      <MarqueeRow images={row1Images} direction="right" offset={offset} />
      <MarqueeRow images={row2Images} direction="left" offset={offset} />
    </section>
  );
}
