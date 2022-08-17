/* eslint-disable @typescript-eslint/naming-convention */
import { RegistrationDataDto } from '../dtos/registration.dto';
import { extractErrorMessage, ValidationErrorDto } from '../dtos/validation-error-dto';
import { EntityValidationErrors } from '../models/app-error';
import { Registration } from '../models/registration';

export namespace RegistrationMapper {

  /** @inheritdoc */
  export function validationErrorFromDto(
    errorDto: ValidationErrorDto<RegistrationDataDto> | null | undefined,
  ): EntityValidationErrors<Registration> {
    return {
      email: extractErrorMessage(errorDto?.email),
      password:
        extractErrorMessage(errorDto?.password) ??
        extractErrorMessage(errorDto?.non_field_errors),
      avatarUrl: extractErrorMessage(errorDto?.avatar),
      firstName: extractErrorMessage(errorDto?.first_name),
      lastName: extractErrorMessage(errorDto?.last_name),
    };

  }

  /** @inheritdoc */
  export function toDto(registrationData: Registration): RegistrationDataDto {
    return {
      email: registrationData.email,
      first_name: registrationData.firstName,
      last_name: registrationData.lastName,
      password: registrationData.password,
    } as RegistrationDataDto;
  }
}
