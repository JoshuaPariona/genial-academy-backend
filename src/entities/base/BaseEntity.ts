import { CreateDateColumn } from "typeorm";

export abstract class BaseEntity {
  @CreateDateColumn({
    type: "timestamp",
  })
  createdAt!: Date;

  @CreateDateColumn({
    type: "timestamp",
  })
  updatedAt!: Date;
}
