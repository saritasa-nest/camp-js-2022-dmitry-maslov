import { PaginatedDataDto } from '../dtos/pagination.dto';

import { PaginationParamsDto } from './../dtos/paginationParams.dto';
import { PaginationParams } from './../models/paginationParams';

export namespace PaginationParamsMapper {

  /**
   * Maps dto to model.
   * @param dto Pagination server data.
   * @param model Pagination Model with Query Parameters.
   */
  export function fromDto<T>(dto: PaginatedDataDto<T>, model: PaginationParams): PaginationParams {
    return new PaginationParams({
      page: model.page,
      limit: model.limit,
    });
  }

  /**
   * Maps model to dto.
   * @param model Pagination params model.
   */
  export function toDto(model: PaginationParams): PaginationParamsDto {
    return {
      limit: model.limit,
      offset: (model.page * model.limit) - model.limit,
    };
  }
}
