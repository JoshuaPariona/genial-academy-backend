import { Entity, ManyToOne } from "typeorm";
import { AreaEntity } from "./AreaEntity";
import { AcademyBaseEntity } from "./base/AcademyBaseEntity";

@Entity({ name: "courses" })
export class CourseEntity extends AcademyBaseEntity {
  @ManyToOne(() => AreaEntity)
  area!: AreaEntity;
}
