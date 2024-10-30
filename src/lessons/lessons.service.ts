import { Injectable } from '@nestjs/common';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Lesson } from './entities/lesson.entity';
import { Repository } from 'typeorm';
import { Course } from 'src/courses/entities/course.entity';

@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(Lesson)
    private readonly lessonRepository: Repository<Lesson>,
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}

  async create(createLessonDto: CreateLessonDto) {
    try {
      const checkCourse = await this.courseRepository.findOneBy({
        id: createLessonDto.courseId,
      });

      if (checkCourse) {
        const newLesson = await this.lessonRepository.create(createLessonDto);
        await this.lessonRepository.save(newLesson);

        return {
          status: 202,
          success: true,
          message: 'Lesson added successfully',
        };
      } else {
        return {
          status: 404,
          success: false,
          message: 'THis course does not exists',
        };
      }
    } catch (error) {
      return {
        status: error.status,
        success: false,
        message: error.message,
      };
    }
  }

  async findAll() {
    try {
      const lessons = await this.lessonRepository.find();

      return {
        status: 200,
        success: true,
        message: 'All lessons',
        data: lessons,
      };
    } catch (error) {
      return {
        status: error.status || 500,
        success: false,
        message: error.message,
      };
    }
  }

  async findOne(id: number) {
    try {
      const lesson = await this.lessonRepository.findOneBy({ id });

      if (lesson) {
        return {
          status: 200,
          success: true,
          message: 'Lesson added successfully',
        };
      } else {
        return {
          status: 404,
          success: false,
          message: 'This lesson does not exists',
        };
      }
    } catch (error) {
      return {
        status: error.status || 500,
        success: false,
        message: error.message,
      };
    }
  }

  async update(id: number, updateLessonDto: UpdateLessonDto) {
    try {
      const checkLesson = await this.lessonRepository.findOneBy({ id });

      if (checkLesson) {
        await this.lessonRepository.update(id, updateLessonDto);

        return {
          status: 200,
          success: true,
          message: 'Lesson updated successfully',
        };
      } else {
        return {
          status: 404,
          success: false,
          message: 'THis lesson does not exists',
        };
      }
    } catch (error) {
      return {
        status: error.status || 500,
        success: false,
        message: error.message,
      };
    }
  }
}
