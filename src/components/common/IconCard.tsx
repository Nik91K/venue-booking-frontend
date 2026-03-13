import type { LucideIcon } from 'lucide-react';
import { Badge } from '@components/ui/badge';
import { cn } from '@/lib/utils';

export type IconCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  badge?: string;
  className?: string;
};

export const IconCard = ({
  icon: Icon,
  title,
  description,
  badge,
  className,
}: IconCardProps) => {
  return (
    <div
      className={cn(
        'relative p-6 rounded-xl border group transition-all duration-200',
        className
      )}
    >
      <Icon className="w-7 h-7 mb-4 text-(--fourth-color)" />
      <p className="font-semibold mb-1">{title}</p>
      <p className="text-sm text-muted-foreground leading-relaxed mb-4">
        {description}
      </p>
      {badge && (
        <Badge variant="secondary" className="text-xs">
          {badge}
        </Badge>
      )}
    </div>
  );
};
