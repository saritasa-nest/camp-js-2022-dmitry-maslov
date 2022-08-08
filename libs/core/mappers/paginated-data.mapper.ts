import { PaginatedData } from '../models/pagination';

import { PaginatedDataDto } from '../dtos/paginated-data.dto';

export namespace PaginatedDataMapper {

  /**
   * Converted pagination dto to pagination model.
   * @param params {PaginatedDataFromDtoParams}.
   */
  export function fromDto<T, TDto>({
    dto,
    resultMapper,
  }: PaginatedDataFromDtoParams<T, TDto>): PaginatedData<T> {
    return new PaginatedData<T>({
      total: dto.count,
      items: dto.results.map(res => resultMapper(res)),
    });
  }
}

interface PaginatedDataFromDtoParams<T, TDto> {

  /** Paginated data dto.*/
  readonly dto: PaginatedDataDto<TDto>;

  /** Mapper function that converted the DTO. Result to model result. */
  readonly resultMapper: (resultDto: TDto) => T;
}
