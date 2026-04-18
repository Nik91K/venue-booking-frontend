import { Button } from '@components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@components/ui/dialog';
import type React from 'react';

type Props = {
  triggerText: string;
  children: React.ReactNode;
  headerTitle: string;
  headerDescription?: string;
  cancelText: string;
  submitText?: string;
  open?: boolean;
  contentClassName?: string;
  triggerClassName?: string;
  loading?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSubmit?: () => void;
};

export const DialogComponent = ({
  triggerText,
  children,
  headerTitle,
  headerDescription,
  cancelText = 'Cancel',
  submitText,
  open,
  onOpenChange,
  onSubmit,
  contentClassName,
  triggerClassName,
  loading = false,
}: Props) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          className={triggerClassName ?? 'w-full text-center'}
        >
          {triggerText}
        </Button>
      </DialogTrigger>

      <DialogContent className={contentClassName ?? 'sm:max-w-sm'}>
        <DialogHeader>
          <DialogTitle>{headerTitle}</DialogTitle>

          {headerDescription && (
            <DialogDescription>{headerDescription}</DialogDescription>
          )}
        </DialogHeader>

        {children}

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">{cancelText}</Button>
          </DialogClose>

          {submitText && (
            <Button
              onClick={() => {
                onSubmit?.();
                onOpenChange?.(false);
              }}
              type="button"
            >
              {loading ? 'Loading...' : submitText}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogComponent;
