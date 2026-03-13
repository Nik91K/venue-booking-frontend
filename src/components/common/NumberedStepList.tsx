import { motion } from 'motion/react';
import { fadeInUp } from '@/lib/motion';
import { defaultViewport } from '@/lib/motion';

export type StepItem = {
  title: string;
  desc: string;
};

type NumberedStepListProps = {
  steps: StepItem[];
  className?: string;
  borderColor?: string;
  animate?: boolean;
};

export const NumberedStepList = ({
  steps,
  borderColor = 'rgba(201,168,76,0.12)',
  animate = true,
}: NumberedStepListProps) => {
  return (
    <>
      {steps.map((step, i) => {
        const stepEl = (
          <div
            key={step.title}
            className="flex gap-6 py-7 border-b last:border-0 group"
            style={{ borderColor }}
          >
            <span className="text-5xl font-bold leading-none select-none transition-colors duration-200 group-hover:opacity-100 text-(--fourth-color)">
              0{i + 1}
            </span>
            <div>
              <h3 className="font-semibold mb-1">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {step.desc}
              </p>
            </div>
          </div>
        );

        if (animate) {
          return (
            <motion.div
              key={step.title}
              initial="hidden"
              whileInView="visible"
              viewport={defaultViewport}
              custom={i + 1}
              variants={fadeInUp}
            >
              {stepEl}
            </motion.div>
          );
        }

        return <div key={step.title}>{stepEl}</div>;
      })}
    </>
  );
};
