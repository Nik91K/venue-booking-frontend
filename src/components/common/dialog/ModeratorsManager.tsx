import type { EstablishmentType } from '@/types/establishment';
import type { UserType } from '@/types/user';
import { Button } from '@components/ui/button';
import { DialogComponent } from '@components/common/dialog/DialogComponent';

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
    <DialogComponent
      onOpenChange={open => {
        if (open) onOpen();
      }}
      triggerText="View moderators"
      headerTitle={`Moderators for ${establishment.name}`}
      headerDescription="View and manage moderators for this establishment"
      cancelText="Close"
    >
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
    </DialogComponent>
  );
};

export default ModeratorManagement;
