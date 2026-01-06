import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

type PaginationProps = {
  page: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  pageCount: number;
  handlePageChange: (page: number) => void;
};

const PaginationComponent = ({
  page,
  handlePageChange,
  hasNextPage,
  hasPreviousPage,
  pageCount,
}: PaginationProps) => {
  const visibleItem = 5;

  const getVisiblePages = (page: number, pageCount: number) => {
    let start = Math.max(page - 1, 1);
    let end = start + visibleItem - 1;

    if (end > pageCount) {
      end = pageCount;
      start = Math.max(end - visibleItem + 1, 1);
    }

    return { start, end };
  };

  const { start, end } = getVisiblePages(page, pageCount);

  const visiblePages = Array.from(
    { length: end - start + 1 },
    (_, index) => start + index
  );

  return (
    <div className="mt-6">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => hasPreviousPage && handlePageChange(page - 1)}
              className={
                !hasPreviousPage
                  ? 'pointer-events-none opacity-50'
                  : 'cursor-pointer'
              }
            />
          </PaginationItem>

          {visiblePages.map(pageCount => (
            <PaginationItem key={pageCount}>
              <PaginationLink
                onClick={() => handlePageChange(pageCount)}
                isActive={pageCount === page}
                className="cursor-pointer"
              >
                {pageCount}
              </PaginationLink>
            </PaginationItem>
          ))}
          {end < pageCount && <PaginationEllipsis />}

          <PaginationItem>
            <PaginationNext
              onClick={() => handlePageChange(page + 1)}
              className={
                !hasNextPage
                  ? 'pointer-events-none opacity-50'
                  : 'cursor-pointer'
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default PaginationComponent;
