import { Course } from 'src/courses/entities/course.entity';
import { Hometask } from 'src/hometasks/entities/hometask.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Lesson {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  content: string;

  @Column({ type: 'int' })
  count: number;

  @ManyToOne(() => Course, (course) => course.lessons)
  course: Course;

  @OneToOne(() => Hometask, (hometask) => hometask.lesson)
  hometask: Hometask;
}
