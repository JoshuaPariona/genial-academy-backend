import { Column, Entity } from "typeorm";
import { IncrementBaseEntity } from "./base/IncrementBaseEntity";

@Entity({ name: "levels" })
export class LevelEntity extends IncrementBaseEntity {
  @Column({
    type: "enum",
    enum: ["basic", "intermediate", "advanced"]
  })
  level!: string;

  @Column()
  coinMultiplier!: number;
}
