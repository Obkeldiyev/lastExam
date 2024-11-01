import { Hometask } from 'src/hometasks/entities/hometask.entity';
import { Student } from 'src/students/entities/student.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Submission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  content: string;

  @Column({ type: 'varchar', default: 'Bajarilmagan' })
  status: string;

  @ManyToOne(() => Student, (student) => student.submissions)
  student: Student;

  @ManyToOne(() => Hometask, (hometask) => hometask.submissions)
  hometask: Hometask;
}
