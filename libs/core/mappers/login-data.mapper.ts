import { LoginDto } from '../dtos/login.dto';
import { extractErrorMessage, ValidationErrorDto } from '../dtos/validation-error-dto';
import { EntityValidationErrors } from '../models/app-error';
import { Login } from '../models/login';

export namespace LoginMapper {

  /** @inheritdoc */
  export function validationErrorFromDto(
    errorDto: ValidationErrorDto<LoginDto> | null | undefined,
  ): EntityValidationErrors<Login> {
    return {
      email: extractErrorMessage(errorDto?.email),
      password:
        extractErrorMessage(errorDto?.password) ??
        extractErrorMessage(errorDto?.non_field_errors),
    };
  }

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
