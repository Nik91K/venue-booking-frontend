import { motion } from 'motion/react';
import { fadeInUp } from '@/lib/motion';
import { defaultViewport } from '@/lib/motion';
import { cn } from '@/lib/utils';

type CTASectionProps = {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  children: React.ReactNode;
  withGradient?: boolean;
  className?: string;
};

export const CTASection = ({
  title,
  subtitle,
  children,
  withGradient = true,
  className,
}: CTASectionProps) => {
  return (
    <section
      className={cn(
        'py-24 px-4 text-center relative overflow-hidden',
        className
      )}
    >
      {withGradient && (
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background: `radial-gradient(ellipse 60% 60% at 50% 50%, rgba(201,168,76,0.06), transparent)`,
          }}
        />
      )}
      <motion.h2
        initial="hidden"
        whileInView="visible"
        viewport={defaultViewport}
        variants={fadeInUp}
        className="font-bold leading-tight mb-5"
        style={{ fontSize: 'clamp(2rem, 5vw, 3.8rem)' }}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          custom={1}
          variants={fadeInUp}
          className="text-muted-foreground max-w-md mx-auto mb-10 leading-relaxed"
        >
          {subtitle}
        </motion.p>
      )}
      <div className="flex flex-wrap gap-3 justify-center items-center flex-col">
        {children}
      </div>
    </section>
  );
};
