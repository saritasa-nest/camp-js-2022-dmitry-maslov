import { Pagination } from '../models/pagination';

import { PaginationDto } from './../dtos/pagination.dto';

export namespace PaginationMapper {

  /**
   * FromDTO.
   * @param resultMapper ResultMapper.
   * @param dto Dto.
   */
  export function fromDto<T, TDto>(resultMapper: (resultDto: TDto) => T, dto: PaginationDto<TDto>): Pagination<T> {
    return new Pagination<T>({
      count: dto.count,
      results: dto.results.map(res => resultMapper(res)),
    });
  }
}
