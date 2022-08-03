import { UserSecretDto } from '../dtos/user-secret.dto';
import { UserSecret } from '../models/user-secret';

export namespace UserSecretDataMapper {

  /** @inheritdoc */
  export function toDto(data: UserSecret): UserSecretDto {
    return {
      access: data.access,
      refresh: data.refresh,
    };
  }

  /** @inheritdoc */
  export function fromDto(dto: UserSecretDto): UserSecret {
    return {
      access: dto.access,
      refresh: dto.refresh,
    };
  }
}
