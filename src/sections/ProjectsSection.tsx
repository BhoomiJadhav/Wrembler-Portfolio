import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import FadeIn from '../components/FadeIn';
import LiveProjectButton from '../components/LiveProjectButton';
import { projects } from '../data/projects';
import type { Project } from '../data/projects';

function ProjectCard({
  project,
  index,
  totalCards,
}: {
  project: Project;
  index: number;
  totalCards: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'start start'],
  });

  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <div ref={containerRef} className="h-[85vh]">
      <motion.div
        className="sticky top-24 md:top-32"
        style={{
          top: `${index * 28}px`,
          scale,
        }}
      >
        <div className="rounded-[40px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:rounded-[50px] sm:p-6 md:rounded-[60px] md:p-8">
          <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-6">
              <span
                className="font-black text-[#D7E2EA]"
                style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
              >
                {project.number}
              </span>
              <div>
                <p className="text-sm font-medium uppercase tracking-widest text-[#D7E2EA]/60">
                  {project.category}
                </p>
                <h3
                  className="font-medium uppercase text-[#D7E2EA]"
                  style={{ fontSize: 'clamp(1.25rem, 3vw, 2.5rem)' }}
                >
                  {project.name}
                </h3>
              </div>
            </div>
            <LiveProjectButton href={project.href} />
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
            <div className="flex w-full flex-col gap-3 sm:w-[40%] sm:gap-4">
              <img
                src={project.images.col1Top}
                alt={`${project.name} preview 1`}
                loading="lazy"
                className="w-full rounded-[40px] object-cover sm:rounded-[50px] md:rounded-[60px]"
                style={{ height: 'clamp(130px, 16vw, 230px)' }}
              />
              <img
                src={project.images.col1Bottom}
                alt={`${project.name} preview 2`}
                loading="lazy"
                className="w-full rounded-[40px] object-cover sm:rounded-[50px] md:rounded-[60px]"
                style={{ height: 'clamp(160px, 22vw, 340px)' }}
              />
            </div>
            <div className="w-full sm:w-[60%]">
              <img
                src={project.images.col2}
                alt={`${project.name} preview 3`}
                loading="lazy"
                className="h-full min-h-[280px] w-full rounded-[40px] object-cover sm:min-h-0 sm:rounded-[50px] md:rounded-[60px]"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className="relative z-10 -mt-10 rounded-t-[40px] bg-[#0C0C0C] px-5 py-20 sm:-mt-12 sm:rounded-t-[50px] sm:px-8 sm:py-24 md:-mt-14 md:rounded-t-[60px] md:px-10 md:py-32"
    >
      <FadeIn delay={0} y={40}>
        <h2
          className="hero-heading mb-16 text-center font-black uppercase leading-none tracking-tight sm:mb-20 md:mb-28"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Projects
        </h2>
      </FadeIn>

      <div className="mx-auto max-w-6xl">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.number}
            project={project}
            index={index}
            totalCards={projects.length}
          />
        ))}
      </div>
    </section>
  );
}
