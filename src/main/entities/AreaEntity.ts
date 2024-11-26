import { Entity, ManyToOne } from "typeorm";
import { UniversityEntity } from "./UniversityEntity";
import { AcademyBaseEntity } from "./base/AcademyBaseEntity";

@Entity({ name: "areas" })
export class AreaEntity extends AcademyBaseEntity {
  @ManyToOne(() => UniversityEntity)
  university!: UniversityEntity;
}
