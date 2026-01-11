import { useAppDispatch } from '@/api/hooks';
import { createComment } from '@/api/slices/commentSlice';
import { Card } from '@/components/ui/card';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group';
import type { Role } from '@/types/common';
import { ArrowUpIcon, MessageCircle, Star } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

type CommentFormProps = {
  establishmentId: number;
  role: Role;
};

const CommentForm = ({ establishmentId, role }: CommentFormProps) => {
  const dispatch = useAppDispatch();
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    text: '',
    rating: 0,
  });

  const handleRatingClick = (value: number) => {
    setFormData(prev => ({ ...prev, rating: value }));
  };

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    if (role === 'GUEST') {
      setError('You must be logged in to leave a comment');
      return;
    }

    if (formData.rating < 1) {
      setError('Select rating');
      return;
    }

    if (formData.text.trim().length < 10) {
      setError('Enter more than 10 characters');
      return;
    }

    try {
      await dispatch(
        createComment({
          text: formData.text,
          rating: formData.rating,
          establishmentId: Number(establishmentId),
        })
      ).unwrap();
      setFormData({ text: '', rating: 0 });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="w-full py-6" onSubmit={handleSubmit}>
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-1">Write a Review</h2>
        <div>
          <label className="text-sm text-gray-400 mb-2 block">Rating</label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map(star => (
              <Star
                key={star}
                className={`w-4 h-4 ${
                  role === 'GUEST'
                    ? 'cursor-not-allowed text-gray-300'
                    : 'cursor-pointer text-gray-300'
                } ${
                  formData.rating >= star
                    ? 'text-yellow-300 fill-amber-300'
                    : ''
                }`}
                onClick={() => {
                  if (role === 'GUEST') return;
                  handleRatingClick(star);
                }}
              />
            ))}
          </div>

          {role === 'GUEST' && (
            <Link to={'/login'} className="link text-xs">
              Log in to rate
            </Link>
          )}
        </div>
        <div className="mb-3">
          <InputGroup>
            <InputGroupInput
              type="text"
              placeholder={
                role === 'GUEST'
                  ? 'Log in to write comments'
                  : 'Type your text here...'
              }
              value={role === 'GUEST' ? '' : formData.text}
              disabled={role === 'GUEST'}
              onChange={event =>
                role !== 'GUEST' && handleChange('text', event.target.value)
              }
            />
            <InputGroupAddon>
              <MessageCircle />
            </InputGroupAddon>
            <InputGroupAddon align="inline-end">
              <InputGroupButton
                variant="default"
                className="rounded-full"
                size="icon-xs"
                type="submit"
                disabled={role === 'GUEST'}
              >
                <ArrowUpIcon />
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </div>
        {error && <p className="text-sm text-destructive">{error}</p>}
      </Card>
    </form>
  );
};

export default CommentForm;
