import type { DataTableColumn } from '@components/common/DataTable';
import type { EstablishmentType } from '@/types/establishment';
type EstablishmentColumn = DataTableColumn<EstablishmentType>;

const EstablishmentColumns: EstablishmentColumn[] = [
  { header: 'Id', render: 'id' },
  { header: 'Name', render: 'name' },
  { header: 'Rating', render: 'rating' },
  { header: 'Owner', render: 'ownerId' },
  {
    header: 'Comments',
    render: est => <div className="text-center">{est.commentsCount ?? 0}</div>,
  },
];

export default EstablishmentColumns;
