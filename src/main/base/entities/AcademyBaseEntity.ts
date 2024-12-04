import { Column } from "typeorm";
import { IncrementBaseEntity } from "./IncrementBaseEntity";

export abstract class AcademyBaseEntity extends IncrementBaseEntity {
  @Column()
  name!: string;

  @Column({ unique: true, length: 20 })
  slug!: string;

  @Column({ length: 2048 })
  thumbnail!: string;

  @Column({ length: 800 })
  description!: string;

  @Column()
  title!: string;
}
