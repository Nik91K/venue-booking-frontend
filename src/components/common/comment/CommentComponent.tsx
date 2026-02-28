import { useAppDispatch, useAppSelector } from '@api/hooks';
import { Card } from '@components/ui/card';
import { useCallback, useEffect, useRef } from 'react';
import { getUserById } from '@api/slices/userSlice';
import { Skeleton } from '@components/ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { numToStars } from '@hooks/useNumToStars';
import { EllipsisVertical, Star } from 'lucide-react';
import {
  getCommentsByEstablishment,
  deleteComment,
} from '@api/slices/commentSlice';
import { addError } from '@api/slices/errorSlice';
import { convertError } from '@hooks/logger/errorConverter';
import type { Role } from '@/types/common';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@components/ui/dropdown-menu';
import { Button } from '@components/ui/button';
import type { UserType } from '@/types/user';
import type { CommentType, EstablishmentType } from '@/types/establishment';

type CommentProps = {
  establishment: EstablishmentType;
  establishmentId: number;
  role: Role;
  user: UserType | null;
};

const CommentComponent = ({
  establishmentId,
  role,
  user,
  establishment,
}: CommentProps) => {
  const dispatch = useAppDispatch();
  const sentinelRef = useRef<HTMLDivElement>(null);

  const {
    comment: comments,
    loading,
    error,
    meta,
  } = useAppSelector(state => state.comment);
  const { selectedUser } = useAppSelector(state => state.users);

  const canDelete = (comment: CommentType): boolean => {
    if (!user) {
      return false;
    }

    return (
      role === 'SUPER_ADMIN' ||
      establishment.ownerId === user.id ||
      comment.user?.id === user.id
    );
  };

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

      {comments.map(comment => {
        const commentUser = selectedUser[comment.user?.id];

        return (
          <Card key={comment.id} className="p-6">
            <div className="flex gap-4">
              <Avatar className="w-10 h-10">
                <AvatarImage src={commentUser?.avatarUrl} />
                <AvatarFallback>
                  <Skeleton className="w-full h-full rounded-full" />
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 space-y-2">
                <div className="flex justify-between">
                  {commentUser ? (
                    <div>
                      <h3 className="font-semibold">{commentUser.name}</h3>
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

                  <div className="flex items-center gap-1">
                    <span className="text-xs text-muted-foreground">
                      {comment.createdAt &&
                        new Date(comment.createdAt).toLocaleDateString('uk-UA')}
                    </span>

                    {role !== 'GUEST' && canDelete(comment) && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <EllipsisVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="flex flex-col gap-2"
                        >
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() =>
                              comment.id && dispatch(deleteComment(comment.id))
                            }
                          >
                            Delete comment
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </div>
                </div>

                <p className="text-sm leading-relaxed">{comment.text}</p>
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
