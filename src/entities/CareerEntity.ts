import { Entity, ManyToOne } from "typeorm";
import { AreaEntity } from "./AreaEntity";
import { AcademyBaseEntity } from "./base/AcademyBaseEntity";

@Entity({ name: "careers" })
export class CareerEntity extends AcademyBaseEntity {
  @ManyToOne(() => AreaEntity)
  area!: AreaEntity;
}
