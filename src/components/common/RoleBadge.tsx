import type { Role } from '@/types/common';
import { ROLE_CONFIG } from '@fixtures/roleLabel.fixture';
import { Badge } from '../ui/badge';

const RoleBadge: React.FC<{ role: Role }> = ({ role }) => {
  const config = ROLE_CONFIG[role];
  if (!config) return null;

  return (
    <Badge className={config.className} aria-label={`Role: ${config.label}`}>
      {config.label}
    </Badge>
  );
};

export default RoleBadge;
