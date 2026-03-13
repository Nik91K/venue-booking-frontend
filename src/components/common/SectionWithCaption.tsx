import { motion } from 'motion/react';
import { fadeInUp } from '@/lib/motion';
import { cn } from '@/lib/utils';

type SectionWithCaptionProps = {
  children: React.ReactNode;
  caption?: string;
  viewportMargin?: string;
  className?: string;
  contentClassName?: string;
};

export const SectionWithCaption = ({
  children,
  caption,
  viewportMargin = '-80px',
  className,
  contentClassName,
}: SectionWithCaptionProps) => {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      variants={fadeInUp}
      viewport={{ once: true, margin: viewportMargin }}
      className={cn('px-4 pb-20', className)}
    >
      <div className={cn(contentClassName)}>{children}</div>
      {caption && (
        <p className="text-center text-xs text-muted-foreground mt-3 tracking-widest uppercase">
          {caption}
        </p>
      )}
    </motion.section>
  );
};
