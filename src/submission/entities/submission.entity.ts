import { Hometask } from 'src/hometasks/entities/hometask.entity';
import { Student } from 'src/students/entities/student.entity';
import {
  Column,
  Entity,
  JoinTable,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Submission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  content: string;

  @OneToOne(() => Hometask)
  @JoinTable()
  hometask: Hometask;

  @OneToOne(() => Student)
  @JoinTable()
  student: Student;
}
