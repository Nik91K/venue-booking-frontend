import { motion } from 'motion/react';
import { fadeInUp } from '@/lib/motion';
import { cn } from '@/lib/utils';

export type StatItem = {
  num: string;
  label: string;
};

type StatsRowProps = {
  stats: StatItem[];
  className?: string;
  gap?: string;
  animate?: boolean;
};

export const StatsRow = ({
  stats,
  className,
  gap = 'gap-10',
  animate = true,
}: StatsRowProps) => {
  const content = stats.map(stat => (
    <div key={stat.label}>
      <p className="text-2xl font-bold leading-none text-(--fourth-color)">
        {stat.num}
      </p>
      <p className="text-xs text-muted-foreground mt-1 tracking-wide uppercase">
        {stat.label}
      </p>
    </div>
  ));

  if (animate) {
    return (
      <motion.div
        initial="hidden"
        animate="visible"
        custom={4}
        variants={fadeInUp}
        className={cn('flex', gap, className)}
      >
        {content}
      </motion.div>
    );
  }

  return <div className={cn('flex', gap, className)}>{content}</div>;
};
