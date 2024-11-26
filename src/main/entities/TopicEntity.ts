import { Entity, ManyToOne } from "typeorm";
import { AcademyBaseEntity } from "./base/AcademyBaseEntity";
import { CourseEntity } from "./CourseEntity";

@Entity({ name: "topics" })
export class TopicEntity extends AcademyBaseEntity {
  @ManyToOne(() => CourseEntity)
  course!: CourseEntity;
}
