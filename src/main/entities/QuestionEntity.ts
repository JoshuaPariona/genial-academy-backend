import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { IncrementBaseEntity } from "../base/entities/IncrementBaseEntity";
import { TopicEntity } from "./TopicEntity";
import { LevelEntity } from "./LevelEntity";
import { OptionEntity } from "./OptionEntity";

@Entity({ name: "questions" })
export class QuestionEntity extends IncrementBaseEntity {
  @Column({ length: 1000 })
  statement!: string;

  @Column({ length: 20, nullable: true })
  admissionProcess?: string;

  @Column({ length: 2048, nullable: true })
  image?: string;

  @Column({ default: false })
  isMath!: boolean;

  @OneToMany(() => OptionEntity, (option) => option.question, { eager: true })
  options!: OptionEntity[];

  @ManyToOne(() => TopicEntity)
  topic!: TopicEntity;

  @ManyToOne(() => LevelEntity)
  level!: LevelEntity;
}
