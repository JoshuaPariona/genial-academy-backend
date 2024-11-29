import { Column, Entity } from "typeorm";
import { IncrementBaseEntity } from "./base/IncrementBaseEntity";

@Entity({ name: "levels" })
export class LevelEntity extends IncrementBaseEntity {
  @Column({
    type: "enum",
    enum: ["basic", "intermediate", "advanced"],
  })
  level!: string;

  @Column({ length: 2048 })
  thumbnail!: string;

  @Column()
  coinMultiplier!: number;
}
