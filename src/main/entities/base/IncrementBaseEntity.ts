import { PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "./BaseEntity";

export abstract class IncrementBaseEntity extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id!: number;
}
