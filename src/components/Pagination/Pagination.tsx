import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PaginationComponent = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const firstPages = [1, 2, 3].filter((page) => page <= totalPages); // Ensure pages exist
  const lastPages = [totalPages - 2, totalPages - 1, totalPages].filter(
    (page) => page > 3
  ); // Avoid overlap
  const middleRange = 3; // Number of pages in the middle
  let middleStart = Math.max(4, currentPage - Math.floor(middleRange / 2));
  const middleEnd = Math.min(totalPages - 3, middleStart + middleRange - 1);

  if (middleEnd - middleStart < middleRange - 1) {
    middleStart = Math.max(4, middleEnd - middleRange + 1);
  }

  const middlePages: number[] = [];

  for (let i = middleStart; i <= middleEnd; i++) {
    middlePages.push(i);
  }

  return (
    <div className="flex mt-2 md:w-full">
      <Pagination>
        <PaginationContent>
          {/* Previous Button */}
          {currentPage === 1 ? (
            <></>
          ) : (
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => onPageChange(currentPage - 1)}
              />
            </PaginationItem>
          )}

          {/* First Pages */}
          {firstPages.map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                href="#"
                onClick={() => onPageChange(page)}
                isActive={page === currentPage}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}

          {/* Ellipsis if needed */}
          {middleStart > 4 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          {/* Middle Pages */}
          <div className="hidden md:flex">
            {middlePages.map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  href="#"
                  onClick={() => onPageChange(page)}
                  isActive={page === currentPage}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
          </div>

          {/* Ellipsis if needed */}
          {middleEnd < totalPages - 3 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          {/* Last Pages */}
          {lastPages.map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                href="#"
                onClick={() => onPageChange(page)}
                isActive={page === currentPage}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}

          {/* Next Button */}
          {currentPage === totalPages ? (
            <></>
          ) : (
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={() => onPageChange(currentPage + 1)}
              />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default PaginationComponent;
