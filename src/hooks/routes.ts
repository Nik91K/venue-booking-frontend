import type { RouteHeaderConfig } from '@/types/common';

export const routeHeaders: Record<string, RouteHeaderConfig> = {
  '/': { showLinks: true, showEstablishment: false, variant: 'default' },
  '/home': { showLinks: false, showEstablishment: false, variant: 'minimal' },
  '/login': { showLinks: false, showEstablishment: false, variant: 'minimal' },
  '/establishment/:id': {
    showLinks: false,
    showEstablishment: true,
    variant: 'establishment',
  },
  '/settings': {
    showLinks: false,
    showEstablishment: false,
    variant: 'minimal',
  },
  '/admin': { showLinks: false, showEstablishment: false, variant: 'minimal' },
  '/moderator': {
    showLinks: false,
    showEstablishment: false,
    variant: 'minimal',
  },
};
