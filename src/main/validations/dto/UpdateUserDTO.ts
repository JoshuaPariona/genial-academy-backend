import {
  IsString,
  IsEmail,
  MaxLength,
  IsOptional,
  IsNotEmpty,
  IsInt,
  IsPositive,
  ValidateIf,
} from "class-validator";

export class UpdateUserDTO {
  @IsString({ message: "Los nombres debe ser un texto válido." })
  @IsOptional()
  @IsNotEmpty({
    message: "Los nombres no puede estar vacío si se proporciona.",
  })
  @MaxLength(255, {
    message: "Los nombres no puede exceder los 255 caracteres.",
  })
  names?: string;

  @IsString({ message: "Los apellidos debe ser un texto válido." })
  @IsOptional()
  @IsNotEmpty({
    message: "Los apellidos no puede estar vacío si se proporciona.",
  })
  @MaxLength(255, {
    message: "Los apellidos no puede exceder los 255 caracteres.",
  })
  surnames?: string;

  @IsEmail(
    {},
    { message: "El correo publico debe ser un correo electrónico válido." }
  )
  @IsOptional()
  @MaxLength(255, {
    message: "El correo publico no puede exceder los 255 caracteres.",
  })
  publicEmail?: string;

  @IsString({ message: "La direccion de la imagen debe ser un texto válido." })
  @IsOptional()
  @MaxLength(2048, {
    message: "La direccion de la imagen no puede exceder los 2048 caracteres.",
  })
  imageUrl?: string;

  @IsInt()
  @IsOptional()
  @IsPositive({ message: "Phone number must be positive." })
  @ValidateIf((obj) => obj.phone?.toString().length === 9)
  phone?: number;

  @IsString({ message: "El departamento debe ser un texto válido." })
  @IsOptional()
  @MaxLength(255, {
    message: "El departamento no puede exceder los 255 caracteres.",
  })
  department?: string;

  @IsString({ message: "La provicia debe ser un texto válido." })
  @IsOptional()
  @MaxLength(255, {
    message: "La provicia no puede exceder los 255 caracteres.",
  })
  province?: string;

  @IsString({ message: "El distrito debe ser un texto válido." })
  @IsOptional()
  @MaxLength(255, {
    message: "El distrito no puede exceder los 255 caracteres.",
  })
  district?: string;

  @IsString({ message: "La universidad debe ser un texto válido." })
  @IsOptional()
  @MaxLength(255, {
    message: "La universidad no puede exceder los 255 caracteres.",
  })
  university?: string;

  @IsString({ message: "La carrera debe ser un texto válido." })
  @IsOptional()
  @MaxLength(255, {
    message: "La carrera no puede exceder los 255 caracteres.",
  })
  career?: string;

  constructor(data: Partial<UpdateUserDTO>) {
    Object.assign(this, data);
  }
}
