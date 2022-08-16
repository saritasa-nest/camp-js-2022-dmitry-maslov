import { ValidationErrorDto } from '../dtos/validation-error-dto';
import { EntityValidationErrors } from '../models/app-error';

/** Mapper of DTO to domain model. */
export interface IMapperFromDto<TDto, TModel> {

  /** Maps from DTO to domain model. */
  fromDto(dto: TDto): TModel;
}

/** Mapper of domain model to DTO. */
export interface IMapperToDto<TDto, TModel> {

  /** Maps from domain model to DTO. */
  toDto(data: TModel): TDto;
}

/** Mapper from DTO to domain model and vice versa. */
export interface IMapper<TDto, TModel> extends
  IMapperFromDto<TDto, TModel>,
  IMapperToDto<TDto, TModel> { }

/** Mapper of errors of DTO to domain model errors. */
export interface ValidationErrorMapper<TDto, TModel> {

  /**
   * Maps validation error DTO to error for domain model.
   * @param errorDto Error DTO.
   */
  validationErrorFromDto(errorDto?: ValidationErrorDto<TDto> | null): EntityValidationErrors<TModel>;
}
