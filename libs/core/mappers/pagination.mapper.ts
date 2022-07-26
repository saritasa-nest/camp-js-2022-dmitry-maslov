import { PaginatedData } from '../models/pagination';
import { PaginationParams } from '../interfaces/paginationParams';

import { PaginatedDataDto } from './../dtos/pagination.dto';
import { PaginationParamsMapper } from './paginationParams.mapper';

export namespace PaginatedDataMapper {

  /**
   * Converted pagination dto to pagination model.
   * @param params {PaginatedDataFromDtoParams}.
   */
  export function fromDto<T, TDto>({
    dto,
    paginationParams,
    resultMapper,
  }: PaginatedDataFromDtoParams<T, TDto>): PaginatedData<T> {
    return new PaginatedData<T>({
      total: dto.count,
      paginationParams: PaginationParamsMapper.fromDto(dto, paginationParams),
      items: dto.results.map(res => resultMapper(res)),
    });
  }
}

interface PaginatedDataFromDtoParams<T, TDto> {

  /** Paginated data dto.*/
  dto: PaginatedDataDto<TDto>;

  /** Pagination params. */
  paginationParams: PaginationParams;

  /** Mapper function that converted the DTO. Result to model result. */
  resultMapper: (resultDto: TDto) => T;
}
