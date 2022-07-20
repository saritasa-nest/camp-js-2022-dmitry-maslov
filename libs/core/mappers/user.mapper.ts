import { UserDto } from '../dtos/user.dto';
import { User } from '../models/user/user';

export namespace UserMapper {

  /**
   * Maps userDto to User model.
   * @param dto User dto.
   */
  export function fromDto(dto: UserDto): User {
    return new User({
      email: dto.email,
      firstName: dto.first_name,
      lastName: dto.last_name,
      avatar: dto.avatar,
    });
  }
}
