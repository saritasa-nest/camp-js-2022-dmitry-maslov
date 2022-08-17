import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppError, AppValidationError } from '@js-camp/core/models/app-error';
import { MonoTypeOperatorFunction, throwError } from 'rxjs';

import { catchHttpErrorResponse } from '../utils/rxjs/catch-http-error-response';

import { IValidationErrorMapper } from './mappers';

/**
 * Error mapper type declaration.
 * Could be a simple function to transform errors from DTO to errors of domain model
 * or implementation of IMapper with implemented validationErrorFromDto method.
 */
export type ErrorMapper<TDto, TEntity extends Record<string, unknown>> =
  | IValidationErrorMapper<TDto, TEntity>
  | IValidationErrorMapper<TDto, TEntity>['validationErrorFromDto'];

/**
 * API errors mapper.
 */
@Injectable({ providedIn: 'root' })
export class AppErrorMapper {
  /**
   * Convert default HttpErrorResponse object to custom application error.
   * @param httpError Http error response.
   */
  public fromDto(httpError: HttpErrorResponse): AppError {
    const { message } = httpError;
    return new AppError(message);
  }

  /**
   * Map HTTP API error response to the appropriate Api error model.
   * @param httpError Http error.
   * @param mapper Mapper function that transform validation DTO errors to the application validation model.
   * @returns AppError if httpError is not "Bad Request" error or AppValidationError if it is "Bad Request"/.
   */
  public fromDtoWithValidationSupport<
    TDto,
    TEntity extends Record<string, unknown>,
  >(
    httpError: HttpErrorResponse,
    mapper: ErrorMapper<TDto, TEntity>,
  ): AppError | AppValidationError<TEntity> {
    if (httpError.status !== 400) {
      // It is not a validation error. Return simple AppError.
      return this.fromDto(httpError);
    }

    if (mapper == null) {
      throw new Error('Provide mapper for API errors.');
    }

    if (typeof mapper !== 'function' && mapper.validationErrorFromDto == null) {
      throw new Error(
        'Provided mapper does not have implementation of validationErrorFromDto',
      );
    }

    // This is a validation error => create AppValidationError.
    const message = httpError.error.detail;
    const validationData =
      typeof mapper === 'function' ?
        mapper(httpError.error.data) :
        mapper.validationErrorFromDto(httpError.error.data);
    return new AppValidationError<TEntity>(message, validationData);
  }

  /**
   * Catch Api Validation Error RxJS operator.
   * Catches only AppValidationError<T> errors.
   */
  public catchHttpErrorToAppError<T>(): MonoTypeOperatorFunction<T> {
    return catchHttpErrorResponse(error => {
      const appError = this.fromDto(error);
      return throwError(() => appError);
    });
  }

  /**
   * RxJS operator to catch and map HTTP API error response to the appropriate Api error model.
   * @param mapper Mapper function that transform validation DTO errors to the application validation model.
   * @returns AppError if httpError is not "Bad Request" error or AppValidationError if it is "Bad Request".
   */
  public catchHttpErrorToAppErrorWithValidationSupport<T, TDto, TEntity extends Record<string, unknown>>(
    mapper: ErrorMapper<TDto, TEntity>,
  ): MonoTypeOperatorFunction<T> {
    return catchHttpErrorResponse(error => {
      const appError = this.fromDtoWithValidationSupport<TDto, TEntity>(
        error,
        mapper,
      );
      return throwError(() => appError);
    });
  }
}

export namespace AppErrorMapper {

  /**
   * Convert default HttpErrorResponse object to custom application error.
   * @param httpError Http error response.
   */
  export function fromDto(httpError: HttpErrorResponse): AppError {
    const { message } = httpError;
    return new AppError(message);
  }

  /**
   * Map HTTP API error response to the appropriate Api error model.
   * @param httpError Http error.
   * @param mapper Mapper function that transform validation DTO errors to the application validation model.
   * @returns AppError if httpError is not "Bad Request" error or AppValidationError if it is "Bad Request"/.
   */
  export function fromDtoWithValidationSupport<
    TDto,
    TEntity extends Record<string, unknown>,
  >(
    httpError: HttpErrorResponse,
    mapper: ErrorMapper<TDto, TEntity>,
  ): AppError | AppValidationError<TEntity> {
    if (httpError.status !== 400) {
      // It is not a validation error. Return simple AppError.
      return fromDto(httpError);
    }

    if (mapper == null) {
      throw new Error('Provide mapper for API errors.');
    }

    if (typeof mapper !== 'function' && mapper.validationErrorFromDto == null) {
      throw new Error(
        'Provided mapper does not have implementation of validationErrorFromDto',
      );
    }

    // This is a validation error => create AppValidationError.
    const message = httpError.error.detail;
    const validationData =
      typeof mapper === 'function' ?
        mapper(httpError.error.data) :
        mapper.validationErrorFromDto(httpError.error.data);
    return new AppValidationError<TEntity>(message, validationData);
  }

  /**
   * RxJS operator to catch and map HTTP API error response to the appropriate Api error model.
   * @param mapper Mapper function that transform validation DTO errors to the application validation model.
   * @returns AppError if httpError is not "Bad Request" error or AppValidationError if it is "Bad Request".
   */
  export function catchHttpErrorToAppErrorWithValidationSupport<
    T,
    TDto,
    TEntity extends Record<string, unknown>,
  >(mapper: ErrorMapper<TDto, TEntity>): MonoTypeOperatorFunction<T> {
    return catchHttpErrorResponse(error => {
      const appError = fromDtoWithValidationSupport<TDto, TEntity>(
        error,
        mapper,
      );
      return throwError(() => appError);
    });
  }
}
