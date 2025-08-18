"use client";

const generatePagination = (page, totalPages) => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (page <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages];
  }

  if (page >= totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  return [1, "...", page - 1, page, page + 1, "...", totalPages];
};

export default function Pagination({ totalPages, page, setPage }) {
  const currentPage = page;

  const allPages = generatePagination(page, totalPages);

  return (
    <nav aria-label="Pagination">
      <ul className="flex items-center justify-center gap-2 text-sm flex-wrap">
        {/* Previous Button */}
        <PaginationLink
          onClick={() => setPage(page - 1)}
          isDisabled={page <= 1}
        >
          ←
        </PaginationLink>

        {/* Page Numbers */}
        {allPages.map((page, index) => (
          <li key={`${page}-${index}`}>
            {page === "..." ? (
              <span className="flex h-9 w-9 items-center justify-center">
                ...
              </span>
            ) : (
              <PaginationLink
                onClick={() => setPage(page)}
                isActive={currentPage === page}
              >
                {page}
              </PaginationLink>
            )}
          </li>
        ))}

        {/* Next Button */}
        <PaginationLink
          onClick={() => setPage(page + 1)}
          isDisabled={page >= totalPages}
        >
          →
        </PaginationLink>
      </ul>
    </nav>
  );
}

// Sub-component for individual pagination links for better styling and logic
function PaginationLink({ onClick, children, isActive, isDisabled }) {
  const baseClasses =
    "flex h-9 w-9 items-center justify-center rounded-md border transition-colors";

  const activeClasses =
    "border-purple-800/50 bg-purple-800/50 text-cyan-300 cursor-pointer";
  const inactiveClasses =
    " hover:bg-purple-900/30 hover border-purple-800/50 cursor-pointer";
  const disabledClasses =
    "pointer-events-none text-gray-400 dark:text-gray-600";

  const wideClasses = "px-4"; // For Previous/Next buttons

  const className = [
    baseClasses,
    isActive ? activeClasses : inactiveClasses,
    isDisabled ? disabledClasses : "",
    children?.toString().includes("Previous") ||
    children?.toString().includes("Next")
      ? wideClasses
      : "",
  ].join(" ");

  if (isDisabled) {
    return <span className={className}>{children}</span>;
  }

  return (
    <div
      onClick={onClick}
      aria-current={isActive ? "page" : undefined}
      className={className}
    >
      {children}
    </div>
  );
}
