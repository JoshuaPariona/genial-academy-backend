import {
  IsString,
  IsEmail,
  Matches,
  MaxLength,
  Length,
  IsNotEmpty,
} from "class-validator";

export class SignUpUserDTO {
  constructor({ names, surNames, username, email, password }: any) {
    this.names = names;
    this.surNames = surNames;
    this.username = username;
    this.email = email;
    this.password = password;
  }

  @IsNotEmpty({ message: "El campo nombres es obligatorio" })
  @IsString({ message: "Los nombres deben ser un texto" })
  @Length(3, 255, {
    message: "Los nombres debe tener entre 3 - 255 caracteres",
  })
  names!: string;

  @IsNotEmpty({ message: "El campo apellidos es obligatorio" })
  @IsString({ message: "Los apellidos debe ser un texto" })
  @Length(3, 255, {
    message: "Los apellidos debe tener entre 3 - 255 caracteres",
  })
  surNames!: string;

  @IsNotEmpty({ message: "El campo nombre de usuario es obligatorio" })
  @IsString({ message: "El nombre de usuario debe ser un texto" })
  @Length(8, 100, {
    message: "El nombre de usuario debe tener entre 8 - 100 caracteres",
  })
  username!: string;

  @IsNotEmpty({ message: "El campo correo electrónico es obligatorio" })
  @IsEmail({}, { message: "El correo electrónico debe ser válido" })
  @MaxLength(254, {
    message: "El correo electrónico no puede exceder los 254 caracteres",
  })
  email!: string;

  @IsNotEmpty({ message: "El campo contraseña es obligatorio" })
  @IsString({ message: "La contraseña debe ser un texto" })
  @Length(8, 72, { message: "La contraseña debe tener al menos 8-72 caracteres" })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, {
    message:
      "La contraseña debe contener al menos una letra minúscula, una letra mayúscula y un número",
  })
  password!: string;
}
