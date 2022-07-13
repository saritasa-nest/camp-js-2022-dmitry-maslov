import { JWTDto } from '../dtos/jwt.dto';
import { JWT } from '../models/jwt';

export namespace JWTMapper {

  /**
   * Maps dto to model.
   * @param dto Anime dto.
   */
  export function fromDto(dto: JWTDto): JWT {
    return new JWT({
      access: dto.access,
      refresh: dto.refresh,
    });
  }
}
