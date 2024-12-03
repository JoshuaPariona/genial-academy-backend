import { IsString, IsNotEmpty, IsInt, Min, Max, IsIn } from "class-validator";

export class UpdateUserCoinsDTO {
  @IsString({ message: "Nombre de la accion debe ser un texto válido." })
  @IsNotEmpty({
    message: "El nombre de la accion no puede estar vacío si se proporciona.",
  })
  @IsIn(["decrement", "increment"], {
    message: "El nombre de la accion no puede estar vacío si se proporciona.",
  })
  action!: "decrement" | "increment";

  @IsInt({ message: "El número  de monedas debe ser un entero válido." })
  @IsNotEmpty({
    message: "El número  de monedas no puede estar vacío si se proporciona.",
  })
  @Min(1, { message: "El número de monedas debe ser mayor o igual a 1." })
  @Max(500, { message: "El número de monedas debe ser menor o igual a 500." })
  coins!: number;

  constructor(data: Partial<UpdateUserCoinsDTO>) {
    Object.assign(this, data);
  }
}
