import { PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "./BaseEntity";

export abstract class UuidBaseEntity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;
}
