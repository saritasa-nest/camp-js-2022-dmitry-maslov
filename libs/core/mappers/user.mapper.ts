import { UserDto } from '../dtos/user.dto';
import { User } from '../models/user';

export namespace UserMapper {

  /**
   * From dto user to user model.
   * @param dto UserDto.
   */
  export function fromDto(dto: UserDto): User {
    return new User({
      avatar: dto.avatar,
      email: dto.email,
      firstName: dto.first_name,
      lastName: dto.last_name,
    });
  }
}
