import { useMemo } from 'react';

export function usePagination(items, currentPage, itemsPerPage) {
  const totalPages = Math.ceil(items.length / itemsPerPage);
  
  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return items.slice(start, start + itemsPerPage);
  }, [items, currentPage, itemsPerPage]);

  return { paginatedItems, totalPages };
}