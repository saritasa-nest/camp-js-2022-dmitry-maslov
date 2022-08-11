import { UserSecretDto } from '../dtos/user-secret.dto';
import { UserSecret } from '../models/user-secret';

export namespace UserSecretDataMapper {

  /** @inheritdoc */
  export function toDto(data: UserSecret): UserSecretDto {
    return {
      access: data.accessToken,
      refresh: data.refreshToken,
    };
  }

  /** @inheritdoc */
  export function fromDto(dto: UserSecretDto): UserSecret {
    return {
      accessToken: dto.access,
      refreshToken: dto.refresh,
    };
  }
}
