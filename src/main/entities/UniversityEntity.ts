import { Column, Entity, OneToMany } from "typeorm";
import { AcademyBaseEntity } from "./base/AcademyBaseEntity";
import { StepEntity } from "./StepEntity";

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

  @OneToMany(() => StepEntity, (step) => step.university, { eager: true })
  steps!: StepEntity[];
}
