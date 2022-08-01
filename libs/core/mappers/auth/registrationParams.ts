/* eslint-disable @typescript-eslint/naming-convention */
import { RegistrationParamsDto } from '@js-camp/core/dtos/auth/registrationParams.dto';
import { RegistrationParams } from '@js-camp/core/models/auth/registrationParams';

export namespace RegistrationMapper {

  /**
   * Maps model to dto.
   * @param registrationParams User registration params model.
   */
  export function toDto(registrationParams: RegistrationParams): RegistrationParamsDto {
    return {
      email: registrationParams.email,
      first_name: registrationParams.firstName,
      last_name: registrationParams.lastName,
      password: registrationParams.password,
    } as RegistrationParamsDto;
  }
}
