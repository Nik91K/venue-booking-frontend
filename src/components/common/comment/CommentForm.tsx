import { useAppDispatch } from '@/api/hooks';
import { createComment } from '@/api/slices/commentSlice';
import { Card } from '@/components/ui/card';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group';
import { ArrowUpIcon, MessageCircle, Star } from 'lucide-react';
import { useState } from 'react';

type CommentFormProps = {
  establishmentId: number;
};

const CommentForm = ({ establishmentId }: CommentFormProps) => {
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
                className={`w-4 h-4 cursor-pointer text-gray-300 ${
                  formData.rating >= star
                    ? 'text-yellow-300 fill-amber-300'
                    : 'text-gray-300'
                }`}
                onClick={() => handleRatingClick(star)}
              />
            ))}
          </div>
        </div>
        <div className="mb-3">
          <InputGroup>
            <InputGroupInput
              placeholder="Type your text here..."
              type="text"
              value={formData.text}
              onChange={event => handleChange('text', event.target.value)}
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
