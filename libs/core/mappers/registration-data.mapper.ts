/* eslint-disable @typescript-eslint/naming-convention */
import { RegistrationDataDto } from '@js-camp/core/dtos/registration.dto';
import { Registration } from '@js-camp/core/models/registration';

export namespace RegistrationMapper {

  /**
   * Maps model to dto.
   * @param registrationData User registration params model.
   */
  export function toDto(registrationData: Registration): RegistrationDataDto {
    return {
      email: registrationData.email,
      first_name: registrationData.firstName,
      last_name: registrationData.lastName,
      password: registrationData.password,
    } as RegistrationDataDto;
  }
}