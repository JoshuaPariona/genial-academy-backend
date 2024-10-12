import { Column, Entity, ManyToOne } from "typeorm";
import { IncrementBaseEntity } from "./base/IncrementBaseEntity";
import { TopicEntity } from "./TopicEntity";

@Entity({ name: "materials" })
export class MaterialEntity extends IncrementBaseEntity {
  @Column()
  title!: string;

  @Column({ length: 500 })
  description!: string;

  @Column({
    type: "enum",
    enum: ["document", "image", "video"],
    default: "document",
  })
  type!: string;

  @Column({ length: 2048 })
  link!: string;

  @ManyToOne(() => TopicEntity)
  topic!: TopicEntity;
}
