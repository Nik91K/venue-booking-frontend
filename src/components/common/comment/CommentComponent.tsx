import { useAppDispatch, useAppSelector } from '@/api/hooks';
import { Card } from '@/components/ui/card';
import { useEffect } from 'react';
import { getUserById } from '@/api/slices/authSlice';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { EstablishmentType } from '@/types/establishmentCard';

type CommentProps = {
  establishment: EstablishmentType;
};

const CommentComponent = ({ establishment }: CommentProps) => {
  const dispatch = useAppDispatch();

  const { selectedUser } = useAppSelector(state => state.auth);

  useEffect(() => {
    if (establishment?.comments.length) {
      establishment?.comments.forEach(comment => {
        if (!selectedUser[comment.userId]) {
          dispatch(getUserById(comment.userId));
        }
      });
    }
  }, [establishment?.comments, selectedUser, dispatch]);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">{`${establishment.comments.length} Reviews`}</h2>
      {establishment.comments?.map(comment => {
        const user = selectedUser[comment.userId];
        return (
          <Card className="p-6">
            <div className="flex gap-4">
              <Avatar className="w-10 h-10">
                <AvatarImage src={user?.avatarUrl} />
                <AvatarFallback>
                  <Skeleton className="w-full h-full rounded-full" />
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 space-y-2">
                <div className="flex justify-between">
                  {user ? (
                    <h3 className="font-semibold">{user.name}</h3>
                  ) : (
                    <Skeleton className="h-4 w-24" />
                  )}

                  {comment ? (
                    <span className="text-xs text-muted-foreground">
                      {new Date(comment.createdAt).toLocaleDateString('uk-UA')}
                    </span>
                  ) : (
                    <Skeleton className="h-3 w-20" />
                  )}
                </div>

                <div className="space-y-2">
                  {comment ? (
                    <p className="text-sm leading-relaxed">{comment.text}</p>
                  ) : (
                    <Skeleton className="h-4 w-full" />
                  )}
                </div>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default CommentComponent;
