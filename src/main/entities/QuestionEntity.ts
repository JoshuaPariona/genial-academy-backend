import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { IncrementBaseEntity } from "./base/IncrementBaseEntity";
import { TopicEntity } from "./TopicEntity";
import { LevelEntity } from "./LevelEntity";
import { OptionEntity } from "./OptionEntity";

@Entity({ name: "questions" })
export class QuestionEntity extends IncrementBaseEntity {
  @Column({ length: 500 })
  statement!: string;

  @Column({ length: 20, nullable: true })
  admissionProcess?: string;

  @OneToMany(() => OptionEntity, (option) => option.question)
  options!: OptionEntity[];

  @ManyToOne(() => TopicEntity)
  topic!: TopicEntity;

  @ManyToOne(() => LevelEntity)
  level!: LevelEntity;
}
