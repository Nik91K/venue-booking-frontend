import { cn } from '@/lib/utils';

type TwoColumnSectionProps = {
  left: React.ReactNode;
  right: React.ReactNode;
  className?: string;
  gridClass?: string;
};

export const TwoColumnSection = ({
  left,
  right,
  className,
  gridClass = 'lg:grid-cols-2 gap-16 items-center',
}: TwoColumnSectionProps) => {
  return (
    <div className={cn('grid', gridClass, className)}>
      <div>{left}</div>
      <div>{right}</div>
    </div>
  );
};
