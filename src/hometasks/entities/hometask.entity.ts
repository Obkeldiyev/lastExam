import { Lesson } from 'src/lessons/entities/lesson.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Hometask {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  desc: string;

  @OneToOne(() => Lesson, (lesson) => lesson.hometask)
  lesson: Lesson;
}
