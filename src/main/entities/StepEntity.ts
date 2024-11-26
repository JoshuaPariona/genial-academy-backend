import { Column, Entity, ManyToOne } from "typeorm";
import { IncrementBaseEntity } from "./base/IncrementBaseEntity";
import { UniversityEntity } from "./UniversityEntity";

@Entity({ name: "steps" })
export class StepEntity extends IncrementBaseEntity {
  @Column({ length: 400 })
  statement!: string;

  @Column()
  index!: number;

  @ManyToOne(() => UniversityEntity, (university) => university.steps)
  university!: UniversityEntity;
}
