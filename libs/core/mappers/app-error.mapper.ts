import { AxiosError } from 'axios';

import { ValidationErrorDto } from '../dtos/validation-error-dto';

import { AppError, AppValidationError } from '../models/app-error';

import { ValidationErrorMapper } from './mappers';

/**
 * Error mapper type declaration.
 * Could be a simple function to transform errors from DTO to errors of domain model
 * or implementation of IMapper with implemented validationErrorFromDto method.
 */
export type ErrorMapper<TDto, TModel extends object> = ValidationErrorMapper<TDto, TModel> |
ValidationErrorMapper<TDto, TModel>['validationErrorFromDto'];

/** App error mapper. */
export class AppErrorMapper {
  /**
   * Converts default HttpErrorResponse object to custom application error.
   * @param httpError Http error response.
   */
  public static fromDto(httpError: AxiosError): AppError {
    const { message } = httpError;
    return new AppError(message);
  }

  /**
   * Maps HTTP API error response to the appropriate API error model.
   * @param httpError HTTP error.
   * @param mapper Mapper function that transform validation DTO errors to the application validation model.
   * @returns AppError if httpError is not "Bad Request" error or AppValidationError if it is "Bad Request".
   */
  public static fromDtoWithValidationSupport<TErrorDto, TEntity extends object>(
    httpError: AxiosError<TErrorDto>,
    mapper: ErrorMapper<TErrorDto, TEntity>,
  ): AppError | AppValidationError<TEntity> {
    if (httpError.response?.status !== 400) {
      // It is not a validation error. Return simple AppError.
      return this.fromDto(httpError);
    }

    if (mapper == null) {
      throw new Error('Provide mapper for API errors.');
    }

    if (typeof mapper !== 'function' && mapper.validationErrorFromDto == null) {
      throw new Error('Provided mapper does not have implementation of validationErrorFromDto');
    }

    // This is a validation error => create AppValidationError.
    const errorData = httpError.response.data as ValidationErrorDto<TErrorDto>;

    const validationData = typeof mapper === 'function' ?
      mapper(errorData) :
      mapper.validationErrorFromDto(errorData);

    return new AppValidationError<TEntity>(httpError.message, validationData);
  }
}
