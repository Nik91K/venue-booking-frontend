import { Link } from 'react-router-dom';
import { Button } from '@components/ui/button';
import { ArrowRight } from 'lucide-react';

export const CTAButtons = () => {
  return (
    <div className="flex flex-wrap gap-3">
      <Button size="lg" asChild variant="orange">
        <Link to="/register" className="gap-2 flex items-center">
          Create a free account
          <ArrowRight className="w-4 h-4" />
        </Link>
      </Button>

      <Button size="lg" variant="secondary" asChild>
        <Link to="/explore">Browse the map</Link>
      </Button>
    </div>
  );
};
