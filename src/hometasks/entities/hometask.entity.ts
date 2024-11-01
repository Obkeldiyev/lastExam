import { Lesson } from 'src/lessons/entities/lesson.entity';
import { Submission } from 'src/submission/entities/submission.entity';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Hometask {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  desc: string;

  @OneToOne(() => Lesson, (lesson) => lesson.hometask)
  lesson: Lesson;

  @OneToMany(() => Submission, (submissions) => submissions.hometask)
  submissions: Submission[];
}
