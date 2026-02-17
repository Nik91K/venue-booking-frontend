import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@components/ui/dropdown-menu';
import { Button } from '@components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import PaginationComponent from '@components/common/PaginationComponent';

export type DataTableColumn<T> = {
  header: string;
  render: ((row: T) => React.ReactNode) | keyof T;
};

type PaginationProps = {
  page: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  pageCount: number;
  onPageChange: (page: number) => void;
};

type TableProps<T extends { id: number | string }> = {
  data: T[];
  loading?: boolean;
  columns: DataTableColumn<T>[];
  rowActions?: ((row: T) => React.ReactNode) | null;
  emptyMessage?: string;
  pagination?: PaginationProps;
};

const DataTable = <T extends { id: number | string }>({
  data,
  loading = false,
  columns,
  rowActions,
  emptyMessage = 'No results found.',
  pagination,
}: TableProps<T>) => {
  const hasActions = rowActions !== null && rowActions !== undefined;
  const totalCols = columns.length + (hasActions ? 1 : 0);

  const renderCell = (row: T, col: DataTableColumn<T>) => {
    if (typeof col.render === 'function') {
      return col.render(row);
    }
    const value = row[col.render];
    return value !== null && value !== undefined ? String(value) : '—';
  };

  return (
    <div className="rounded-md border border-border">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map(col => (
              <TableHead key={col.header}>{col.header}</TableHead>
            ))}
            {hasActions && <TableHead>Actions</TableHead>}
          </TableRow>
        </TableHeader>

        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell
                colSpan={totalCols}
                className="text-center py-8 text-muted-foreground"
              >
                Loading...
              </TableCell>
            </TableRow>
          ) : data.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={totalCols}
                className="text-center py-8 text-muted-foreground"
              >
                {emptyMessage}
              </TableCell>
            </TableRow>
          ) : (
            data.map(row => (
              <TableRow key={row.id}>
                {columns.map(col => (
                  <TableCell key={col.header}>{renderCell(row, col)}</TableCell>
                ))}

                {hasActions && rowActions && (
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="flex flex-col gap-2"
                      >
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        {rowActions(row)}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                )}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {!loading && data.length > 0 && pagination && (
        <PaginationComponent
          page={pagination.page}
          handlePageChange={pagination.onPageChange}
          hasNextPage={pagination.hasNextPage}
          hasPreviousPage={pagination.hasPreviousPage}
          pageCount={pagination.pageCount}
        />
      )}
    </div>
  );
};

export default DataTable;
