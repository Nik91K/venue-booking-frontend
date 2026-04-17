import type { EstablishmentType } from '@/types/establishment';
import type { UserType } from '@/types/user';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@components/ui/dialog';
import { Button } from '@components/ui/button';

type Props = {
  establishment: EstablishmentType;
  moderators: UserType[];
  loading: boolean;
  onOpen: () => void;
  onAddModerator: (userId: number) => void;
  onRemoveModerator: (userId: number) => void;
};

const ModeratorManagement = ({
  establishment,
  moderators = [],
  loading,
  onOpen,
  onRemoveModerator,
}: Props) => {
  return (
    <Dialog
      onOpenChange={open => {
        if (open) onOpen();
      }}
    >
      <DialogTrigger asChild>
        <Button variant="secondary" className="w-full text-center">
          View moderators
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Moderators for {establishment.name}</DialogTitle>
          <DialogDescription>
            View and manage moderators for this establishment
          </DialogDescription>
        </DialogHeader>

        {loading ? (
          <p>Loading moderators...</p>
        ) : (
          <ul className="space-y-2">
            {!moderators.length && <p>No moderators assigned.</p>}
            {moderators.map(mod => (
              <li key={mod.id} className="flex items-center justify-between">
                <span>{mod.name}</span>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => onRemoveModerator(mod.id)}
                >
                  Remove
                </Button>
              </li>
            ))}
          </ul>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ModeratorManagement;
