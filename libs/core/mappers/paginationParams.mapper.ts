import { PaginatedDataDto } from '../dtos/pagination.dto';
import { PaginationParamsDto } from '../dtos/paginationParams.dto';

import { PaginationParams } from '../models/paginationParams';

export namespace PaginationParamsMapper {

  /**
   * Maps dto to model.
   * @param dto Pagination server data.
   * @param paginationParams Pagination Model with Query Parameters.
   */
  export function fromDto<T>(dto: PaginatedDataDto<T>, paginationParams: PaginationParams): PaginationParams {
    return {
      page: paginationParams.page,
      limit: paginationParams.limit,
    };
  }

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
