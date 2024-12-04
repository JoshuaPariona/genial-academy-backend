import { Column, Entity, ManyToOne } from "typeorm";
import { UniversityEntity } from "./UniversityEntity";
import { AcademyBaseEntity } from "../base/entities/AcademyBaseEntity";

@Entity({ name: "areas" })
export class AreaEntity extends AcademyBaseEntity {
  @Column()
  largeName!: string;

  @ManyToOne(() => UniversityEntity, { eager: true })
  university!: UniversityEntity;
}
