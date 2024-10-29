import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { Repository } from 'typeorm';
import { Teacher } from 'src/teachers/entities/teacher.entity';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,
  ) {}

  async create(createCourseDto: CreateCourseDto) {
    try {
      const checkTeacher = await this.teacherRepository.findOneBy({
        id: createCourseDto.teacherId,
      });

      if (checkTeacher) {
        const newCourse = await this.courseRepository.create(createCourseDto);
        await this.courseRepository.save(newCourse);

        return {
          status: 202,
          success: true,
          message: 'Course created successfully',
        };
      } else {
        return {
          status: 404,
          success: false,
          message: 'This teacher does not exists',
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

  async findAll() {
    try {
      const courses = await this.courseRepository.find();

      return {
        status: 200,
        success: true,
        message: 'All courses',
      };
    } catch (error) {
      return {
        status: error.status || 500,
        success: false,
        message: error.message,
      };
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} course`;
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return `This action updates a #${id} course`;
  }

  remove(id: number) {
    return `This action removes a #${id} course`;
  }
}
