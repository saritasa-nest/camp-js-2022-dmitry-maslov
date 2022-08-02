import { PaginationParamsDto } from '../dtos/pagination-params.dto';

import { PaginationParams } from '../models/pagination-params';

export namespace PaginationParamsMapper {

  /**
   * Maps model to dto.
   * @param paginationParams Pagination params model.
   */
  export function toDto(paginationParams: PaginationParams): PaginationParamsDto {
    return {
      limit: paginationParams.limit,
      offset: (paginationParams.page * paginationParams.limit) - paginationParams.limit,
    };
  }
}
