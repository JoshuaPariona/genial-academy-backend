import { Column, Entity } from "typeorm";
import { UuidBaseEntity } from "./base/UuidBaseEntity";

@Entity({ name: "users" })
export class UserEntity extends UuidBaseEntity {
  @Column()
  displayName!: string;

  @Column()
  displaySurName!: string;

  @Column({ unique: true })
  username!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ nullable: true })
  imageUrl?: string;

  @Column({ nullable: true })
  phone?: number;

  @Column({ nullable: true })
  department?: string;

  @Column({ nullable: true })
  province?: string;

  @Column({ nullable: true })
  district?: string;

  @Column({ nullable: true })
  university?: string;

  @Column({ nullable: true })
  career?: string;

  @Column({ type: "enum", enum: ["user", "admin"], default: "user" })
  role!: string;
}
