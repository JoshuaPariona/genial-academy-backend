import { Column, Entity } from "typeorm";
import { UuidBaseEntity } from "../base/entities/UuidBaseEntity";

@Entity({ name: "users" })
export class UserEntity extends UuidBaseEntity {
  /*
  @Column({ nullable: false, length: 100 })
  username?: string;
  */

  @Column()
  names!: string;

  @Column()
  surNames!: string;

  @Column({ nullable: true })
  publicEmail?: string;

  @Column({ nullable: true, length: 2048 })
  imageUrl?: string;

  @Column({ nullable: true })
  phone?: number;

  @Column({ type: "int", default: 0 })
  coins!: number;

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
}
