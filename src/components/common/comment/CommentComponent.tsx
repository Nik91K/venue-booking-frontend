import { useAppDispatch, useAppSelector } from '@/api/hooks';
import {
  getEstablishmentById,
  getEstablishmentComments,
} from '@/api/slices/establishmentSlice';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import LayoutPage from '@/layoutPage';
import { Star } from 'lucide-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CommentComponent = ({ id }: { id: number }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { selectedEstablishment, error } = useAppSelector(
    state => state.establishment
  );
  const establishment = selectedEstablishment;
  useEffect(() => {
    if (!id) return;

    if (!selectedEstablishment || selectedEstablishment.id !== id) {
      dispatch(getEstablishmentById(Number(id)));
      dispatch(getEstablishmentComments(Number(id)));
    }
  }, [id, dispatch]);

  if (error || !establishment) {
    return (
      <LayoutPage>
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <p className="text-lg">Establishment not found</p>
          <Button onClick={() => navigate('/explore')}>
            Back to Establishments
          </Button>
        </div>
      </LayoutPage>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">{`${establishment.comments.length} Reviews`}</h2>
      {establishment.comments.map(comment => (
        <Card key={comment.id} className="p-6">
          <div className="flex gap-4">
            <div className="shrink-0">
              <div className="w-12 h-12 rounded-full flex items-center justify-center font-semibold">
                avatar
              </div>
            </div>

            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold">username</h3>
                  <p className="text-xs text-gray-500">{establishment.name}</p>
                </div>
                <span className="text-sm text-gray-500">
                  {comment.createdAt}
                </span>
              </div>
              <div className="flex gap-1 mb-3">
                <Star />
              </div>
              <p className="text-gray-300 leading-relaxed">{comment.text}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default CommentComponent;
