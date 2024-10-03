import { Column, Entity } from "typeorm";
import { BaseEntity } from "./BaseEntity";

@Entity({ name: "users" })
export class UserEntity extends BaseEntity {
  @Column()
  displayName!: string
}
