import { Column, Entity } from "typeorm";
import { AcademyBaseEntity } from "../base/entities/AcademyBaseEntity";

@Entity({ name: "universities" })
export class UniversityEntity extends AcademyBaseEntity {
  @Column({ length: 10 })
  acronym!: string;

  @Column({ length: 100 })
  areasName!: string;

  @Column({ length: 500 })
  discoverName!: string;

  @Column({ length: 2048 })
  admissionImg!: string;
}
