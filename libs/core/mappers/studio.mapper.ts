import { StudioDto } from '../dtos/studio.dto';
import { Studio } from '../models/studio';

export namespace StudioMapper {

  /**
   * Maps dto to model.
   * @param dto Genre dto.
   */
  export function fromDto(dto: StudioDto): Studio {
    return new Studio({
      id: dto.id,
      name: dto.name,
    });
  }
}
