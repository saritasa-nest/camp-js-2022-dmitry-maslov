import { PaginationParamsDto } from '../dtos/paginationParams.dto';

import { PaginationParams } from '../models/paginationParams';

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
