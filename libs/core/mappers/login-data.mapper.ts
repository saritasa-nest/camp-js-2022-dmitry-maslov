import { LoginDto } from '../dtos/login.dto';
import { Login } from '../models/login';

export namespace loginMapper {

  /**
   * Maps login to dto.
   * @param login Login.
   */
  export function toDto(login: Login): LoginDto {
    return {
      email: login.email,
      password: login.password,
    };
  }
}
