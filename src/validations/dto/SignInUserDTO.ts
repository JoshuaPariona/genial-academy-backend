import {
  IsString,
  IsEmail,
  Matches,
  MaxLength,
  Length,
  ValidateIf,
  IsNotEmpty,
} from "class-validator";

export class SignInUserDTO {
  constructor({ username, email, password }: any) {
    this.username = username;
    this.email = email;
    this.password = password;
  }

  @ValidateIf((o) => o.username || !o.email)
  @IsString({ message: "El nombre de usuario debe ser un texto" })
  @Length(8, 100, {
    message: "El nombre de usuario debe tener entre 8 - 100 caracteres",
  })
  username?: string;

  @ValidateIf((o) => o.email || !o.username)
  @IsEmail({}, { message: "El correo electrónico debe ser válido" })
  @MaxLength(254, {
    message: "El correo electrónico no puede exceder los 254 caracteres",
  })
  email?: string;

  @IsNotEmpty({ message: "El campo contraseña es obligatorio" })
  @IsString({ message: "La contraseña debe ser un texto" })
  @Length(8, 100, { message: "La contraseña debe tener al menos 8 caracteres" })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, {
    message:
      "La contraseña debe contener al menos una letra minúscula, una letra mayúscula y un número",
  })
  password!: string;
}
