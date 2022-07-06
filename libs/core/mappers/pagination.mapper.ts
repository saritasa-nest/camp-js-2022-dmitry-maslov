import { Pagination } from '../models/pagination';

import { PaginationDto } from './../dtos/pagination.dto';

export namespace PaginationMapper {

  /**
   * /TODO: JSDOC.
   * @param resultMapper
   * @param dto
   * @returns
   */
  export function fromDto<T, TDto>(resultMapper: (resultDto: TDto) => T, dto: PaginationDto<TDto>): Pagination<T> {
    return new Pagination<T>({
      count: dto.count,
      results: dto.results.map(res => resultMapper(res)),
    });
  }
}
