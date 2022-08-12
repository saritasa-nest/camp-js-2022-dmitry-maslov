import { DateRangeDto } from '../dtos/date-range.dto';
import { DateRange } from '../models/date-range';

export namespace DateRangeMapper {

  /**
   * To dto.
   * @param model Model.
   */
  export function toDto(model: DateRange): DateRangeDto {
    return {
      end: model.end,
      start: model.start,
    };
  }

  /**
   * From dto.
   * @param dto Dto.
   */
  export function fromDto(dto: DateRangeDto): DateRange {
    return {
      end: dto.end,
      start: dto.start,
    };
  }
}
