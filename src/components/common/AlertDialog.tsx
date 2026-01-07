import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';

type AlertDialogProps = {
  triggerText: string;
  triggerClassName?: string;
  title: string;
  description: string;
  children?: React.ReactNode;
  cancelText?: string;
  actionText: string;
  onAction?: () => void;
  onCancel?: () => void;
};
const AlertDialogConponent = ({
  triggerText,
  triggerClassName = 'font-medium',
  title,
  description,
  cancelText = 'Cancel',
  actionText,
  children,
  onAction,
  onCancel,
}: AlertDialogProps) => {
  const [open, setOpen] = useState(false);

  const handleAction = () => {
    if (onAction) {
      onAction();
    }
    setOpen(false);
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
    setOpen(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button className={triggerClassName} variant={'secondary'}>
          {triggerText}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <div>{children}</div>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCancel}>
            {cancelText}
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleAction}>
            {actionText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertDialogConponent;
