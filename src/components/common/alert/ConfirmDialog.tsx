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
} from '@components/ui/alert-dialog';
import { Button } from '@components/ui/button';

type Props = {
  triggerText: string;
  triggerClassName?: string;
  title: string;
  description: string;
  cancelText?: string;
  actionText: string;
  onAction?: () => void;
  onCancel?: () => void;
};

const AppDialogComponent = ({
  triggerText,
  triggerClassName = 'font-medium',
  title,
  description,
  cancelText = 'Cancel',
  actionText,
  onAction,
  onCancel,
}: Props) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className={triggerClassName} variant="secondary">
          {triggerText}
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>{cancelText}</AlertDialogCancel>

          <AlertDialogAction onClick={onAction}>{actionText}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AppDialogComponent;
