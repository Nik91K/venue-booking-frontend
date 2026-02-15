import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@components/ui/button';
import { Home, ArrowLeft } from 'lucide-react';
import LayoutPage from '@/layoutPage';

const NotFoundPage = () => {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <LayoutPage>
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="max-w-2xl w-full text-center">
          <div className="relative mb-8">
            <h1
              className="text-[12rem] md:text-[16rem] font-bold text-transparent bg-clip-text bg-gradient-to-br from-gray-200 via-gray-400 to-gray-600 dark:from-gray-700 dark:via-gray-500 dark:to-gray-300 leading-none select-none transition-transform duration-200 ease-out"
              style={{
                transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
              }}
            >
              404
            </h1>
          </div>
          <div className="space-y-4 mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-200">
              Page Not Found
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
              The page you're looking for seems to have wandered off into the
              digital void.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Button
              onClick={() => navigate('/')}
              size="lg"
              className="gap-2 min-w-[160px]"
            >
              <Home className="w-4 h-4" />
              Go Home
            </Button>
            <Button
              onClick={() => navigate(-1)}
              variant="outline"
              size="lg"
              className="gap-2 min-w-[160px]"
            >
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </Button>
          </div>
        </div>
      </div>
    </LayoutPage>
  );
};

export default NotFoundPage;
