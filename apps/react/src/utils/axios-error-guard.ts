import { GeneralApiError } from '../core/dtos/api-error-dto';

/**
 * Type guard for AxiosError.
 * @param error Source object.
 *
 * @returns GeneralApiError type predicate.
 */
export function isApiError(error: unknown): error is GeneralApiError {
  return (error as GeneralApiError).isAxiosError === true;
}
