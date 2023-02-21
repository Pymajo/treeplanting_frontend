/**
 * Defines the structure of a paged api response.
 */
export class PagedResult<T> {

  count!: number;
  items!: T[];
  page!: number;
  pageSize!: number;

  static getPagesCount<T>(result: PagedResult<T>): number {
    return Math.ceil(result.count / result.pageSize);
  }
}
