import { Entity, ManyToOne } from "typeorm";
import { AcademyBaseEntity } from "../base/entities/AcademyBaseEntity";
import { CourseEntity } from "./CourseEntity";

@Entity({ name: "topics" })
export class TopicEntity extends AcademyBaseEntity {
  @ManyToOne(() => CourseEntity, {eager: true})
  course!: CourseEntity;
}
