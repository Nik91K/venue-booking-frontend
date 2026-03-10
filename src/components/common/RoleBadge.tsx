import type { Role } from '@/types/common';
import { ROLE_CONFIG } from '@fixtures/roleLabel.fixture';

const RoleBadge: React.FC<{ role: Role }> = ({ role }) => {
  const config = ROLE_CONFIG[role];
  if (!config) return null;

  return (
    <span
      className={`
        inline-flex items-center px-2 py-0.5 rounded-full
        text-xs font-medium tracking-wide select-none
        ${config.className}
      `}
      aria-label={`Role: ${config.label}`}
    >
      {config.label}
    </span>
  );
};

export default RoleBadge;
