import { Pagination } from '../models/pagination';

import { PaginationDto } from './../dtos/pagination.dto';

export namespace PaginationMapper {

  /**
   * Converted pagination dto to pagination model.
   * @param resultMapper Mapper function that converted the DTO
  result to model result.
   * @param dto Pagination dto.
   */
  export function fromDto<T, TDto>(resultMapper: (resultDto: TDto) => T, dto: PaginationDto<TDto>): Pagination<T> {
    return new Pagination<T>({
      count: dto.count,
      results: dto.results.map(res => resultMapper(res)),
    });
  }
}
