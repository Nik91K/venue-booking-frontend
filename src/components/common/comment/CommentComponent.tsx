import { useAppDispatch, useAppSelector } from '@api/hooks';
import { Card } from '@components/ui/card';
import { useCallback, useEffect, useRef } from 'react';
import { getUserById } from '@api/slices/userSlice';
import { Skeleton } from '@components/ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import type { EstablishmentType } from '@/types/establishment';
import { numToStars } from '@hooks/useNumToStars';
import { Star } from 'lucide-react';
import { getCommentsByEstablishment } from '@api/slices/commentSlice';
import { addError } from '@api/slices/errorSlice';
import { convertError } from '@hooks/logger/errorConverter';

type CommentProps = {
  establishment: EstablishmentType;
  establishmentId: number;
};

const CommentComponent = ({ establishment, establishmentId }: CommentProps) => {
  const dispatch = useAppDispatch();
  const sentinelRef = useRef<HTMLDivElement>(null);

  const {
    comment: comments,
    loading,
    error,
    meta,
  } = useAppSelector(state => state.comment);
  const { selectedUser } = useAppSelector(state => state.users);

  useEffect(() => {
    dispatch(getCommentsByEstablishment({ establishmentId, page: 1, take: 5 }));
  }, [establishmentId, dispatch]);

  useEffect(() => {
    comments.forEach(comment => {
      if (comment.user?.id && !selectedUser[comment.user.id]) {
        dispatch(getUserById(comment.user.id));
      }
    });
  }, [comments, selectedUser, dispatch]);

  const loadMore = useCallback(() => {
    if (!loading && meta?.hasNextPage) {
      dispatch(
        getCommentsByEstablishment({
          establishmentId,
          page: (meta?.page ?? 1) + 1,
          take: meta?.take ?? 5,
        })
      );
    }
  }, [loading, meta, dispatch, establishmentId]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) loadMore();
      },
      { threshold: 0.1 }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loadMore]);

  useEffect(() => {
    if (error) {
      dispatch(addError(convertError(error)));
    }
  }, [error, dispatch]);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">{`${meta?.itemCount ?? comments.length} Reviews`}</h2>

      {comments.length === 0 && !loading && (
        <p className="text-muted-foreground text-sm py-4">No reviews yet.</p>
      )}

      {establishment.comments?.map(comment => {
        const user = selectedUser[comment.user.id];
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
                    <div>
                      <h3 className="font-semibold">{user.name}</h3>
                      <div className="flex items-center">
                        {numToStars(comment.rating).map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 text-yellow-300 fill-amber-300"
                          />
                        ))}
                      </div>
                    </div>
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

      <div ref={sentinelRef} className="h-1" />

      {!loading && !meta?.hasNextPage && comments.length > 0 && (
        <p className="text-center text-xs text-muted-foreground py-2">
          All reviews loaded
        </p>
      )}
    </div>
  );
};

export default CommentComponent;
