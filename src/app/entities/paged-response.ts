export interface PagedResponse<T> {
  totalPages: number;
  currentPage: number;
  itemsPerPage: number;
  data: T[];
}
