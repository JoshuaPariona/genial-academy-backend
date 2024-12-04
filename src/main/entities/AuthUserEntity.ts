import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { UuidBaseEntity } from "../base/entities/UuidBaseEntity";
import { UserEntity } from "./UserEntity";

@Entity({ name: "auth_users" })
export class AuthUserEntity extends UuidBaseEntity {
  @Column({ nullable: false, unique: true })
  email!: string;

  @Column({ nullable: false, length: 100, unique: true })
  username!: string;

  @Column({ nullable: false })
  passwordHash!: string;

  @Column({ type: "enum", enum: ["user", "admin"], default: "user" })
  role!: string;

  @Column({ type: "enum", enum: ["active", "suspended"], default: "active" })
  status!: string;

  @OneToOne(() => UserEntity, { cascade: true, eager: true })
  @JoinColumn({ name: "user_id" })
  user!: UserEntity;
}
