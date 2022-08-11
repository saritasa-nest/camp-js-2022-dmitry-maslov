import { ValidationErrorDto } from '@js-camp/core/dtos/validation-error-dto';
import { EntityValidationErrors } from '@js-camp/core/models/app-error';

/** Mapper of DTO to domain model. */
export interface IMapperFromDto<TDto, TDomain> {

  /** Maps from DTO to Domain model. */
  fromDto(data: TDto): TDomain;
}

/** Mapper of domain model to DTO. */
export interface IMapperToDto<TDto, TDomain> {

  /** Maps from Domain to DTO model. */
  toDto(data: TDomain): TDto;
}

/** Mapper of errors of DTO to domain model errors. */
export interface IValidationErrorMapper<TDto, TDomain> {

  /**
   * Map validation error DTO to error for domain model.
   * @param errorDto Error DTO.
   */
  validationErrorFromDto(
    errorDto: ValidationErrorDto<TDto>
  ): EntityValidationErrors<TDomain>;
}

/** Mapper from DTO to Domain model and vice versa. */
export interface IMapper<TDto, TDomain>
  extends IMapperFromDto<TDto, TDomain>,
  IMapperToDto<TDto, TDomain> {}
