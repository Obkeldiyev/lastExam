import { InjectRepository } from '@nestjs/typeorm';
import { Course } from 'src/courses/entities/course.entity';
import { Hometask } from 'src/hometasks/entities/hometask.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  Repository,
} from 'typeorm';

@Entity()
export class Lesson {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  content: string;

  @Column({ type: 'int', default: 0 })
  count: number;

  @ManyToOne(() => Course, (course) => course.lessons)
  course: Course;

  @OneToOne(() => Hometask, (hometask) => hometask.lesson)
  hometask: Hometask;

  constructor(
    @InjectRepository(Lesson)
    private readonly lessonRepository: Repository<Lesson>,
  ) {}

  @BeforeInsert()
  async incrementCount() {
    if (this.course) {
      const maxCount = await this.lessonRepository
        .createQueryBuilder('lesson')
        .select('MAX(lesson.count)', 'max')
        .where('lesson.courseId = :courseId', { courseId: this.course.id })
        .getRawOne();

      this.count = (maxCount?.max ?? 0) + 1;
    }
  }
}
