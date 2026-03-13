import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

type AvatarShowcaseProps = {
  urls?: string[];
  diceBear?: { style: string; count: number; seedPrefix?: string };
  className?: string;
  imageClassName?: string;
};

export const AvatarShowcase = ({
  urls,
  diceBear = { style: 'thumbs', count: 12, seedPrefix: 'reservio-demo' },
  className,
  imageClassName,
}: AvatarShowcaseProps) => {
  const sources =
    urls ??
    Array.from(
      { length: diceBear.count },
      (_, i) =>
        `https://api.dicebear.com/9.x/${diceBear.style}/svg?seed=${diceBear.seedPrefix ?? 'avatar'}-${i}`
    );

  return (
    <div
      className={cn(
        'flex flex-wrap gap-4 justify-center lg:justify-start',
        className
      )}
    >
      {sources.map((src, i) => (
        <motion.img
          key={i}
          src={src}
          alt={`avatar-${i}`}
          className={cn(
            'w-14 h-14 rounded-full border-2 transition-transform duration-200 hover:scale-110',
            imageClassName
          )}
          style={{
            borderColor: 'rgba(201,168,76,0.25)',
            background: 'var(--primary-background-light)',
          }}
          initial={{ opacity: 0, scale: 0.7 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.04, duration: 0.35 }}
        />
      ))}
    </div>
  );
};
