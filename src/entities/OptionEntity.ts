import { Column, Entity, ManyToOne } from "typeorm";
import { IncrementBaseEntity } from "./base/IncrementBaseEntity";
import { QuestionEntity } from "./QuestionEntity";

@Entity({ name: "options" })
export class OptionEntity extends IncrementBaseEntity {
  @Column()
  option!: string;

  @Column({ type: "boolean", default: false })
  isCorrect!: boolean;

  @ManyToOne(() => QuestionEntity, (question) => question.options)
  question!: QuestionEntity;
}
