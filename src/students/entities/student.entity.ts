import { Course } from 'src/courses/entities/course.entity';
import { Submission } from 'src/submission/entities/submission.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Student {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  fullname: string;

  @Column({ type: 'varchar', unique: true })
  username: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar' })
  role: string;

  @ManyToMany(() => Course, (courses) => courses.students)
  @JoinTable()
  courses: Course[];

  @OneToMany(() => Submission, (submissions) => submissions.student)
  submissions: Submission[];
}
