import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function AnimatedText({ text, className = '', style }: AnimatedTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  });

  const characters = text.split('');

  return (
    <p ref={ref} className={className} style={style}>
      {characters.map((char, index) => (
        <Character key={`${char}-${index}`} char={char} index={index} total={characters.length} progress={scrollYProgress} />
      ))}
    </p>
  );
}

interface CharacterProps {
  char: string;
  index: number;
  total: number;
  progress: ReturnType<typeof useScroll>['scrollYProgress'];
}

function Character({ char, index, total, progress }: CharacterProps) {
  const start = index / total;
  const end = (index + 1) / total;

  const opacity = useTransform(progress, [start, end], [0.2, 1]);

  if (char === ' ') {
    return <span>&nbsp;</span>;
  }

  return (
    <span className="relative inline-block">
      <span className="invisible">{char === '\n' ? '' : char}</span>
      <motion.span className="absolute left-0 top-0" style={{ opacity }}>
        {char}
      </motion.span>
    </span>
  );
}
