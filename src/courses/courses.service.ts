import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { Repository } from 'typeorm';
import { Teacher } from 'src/teachers/entities/teacher.entity';
import { Student } from 'src/students/entities/student.entity';
import * as dotenv from 'dotenv';
import { verify } from 'jsonwebtoken';
dotenv.config();

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
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
        data: courses,
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
      const course = await this.courseRepository.findOneBy({ id });

      if (course) {
        return {
          status: 200,
          success: true,
          message: 'Found it',
          data: course,
        };
      } else {
        return {
          status: 404,
          success: 'This course does not exists',
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

  async update(id: number, updateCourseDto: UpdateCourseDto) {
    try {
      const checkCourse = await this.courseRepository.findOneBy({ id });

      if (checkCourse) {
        const checkTeacher = await this.teacherRepository.findOneBy({
          id: updateCourseDto.teacherId,
        });

        if (checkTeacher) {
          await this.courseRepository.update(id, updateCourseDto);

          return {
            status: 200,
            success: true,
            message: 'Course updated successfully',
          };
        } else {
          return {
            status: 404,
            success: false,
            message: 'This teacher does note exists',
          };
        }
      } else {
        return {
          status: 404,
          success: false,
          message: 'This course does not exists',
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

  async remove(id: number) {
    try {
      const checkCourse = await this.courseRepository.findOneBy({ id });

      if (checkCourse) {
        await this.courseRepository.delete({ id: checkCourse.id });

        return {
          status: 200,
          success: true,
          message: 'Course deleted successfully',
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
        status: error.status || 500,
        success: false,
        message: error.message,
      };
    }
  }

  async studentsJoin(token: string, id: number) {
    try {
      const data: any = verify(token, process.env.SECRET_KEY);

      const checkCourse = await this.courseRepository.findOneBy({ id });

      if (checkCourse) {
        const checkUser = await this.studentRepository.findOneBy({
          id: data.id,
        });

        if (checkUser) {
          const isAlreadyEnrolled = checkCourse.students.some(
            (s) => s.id === checkUser.id,
          );
          if (isAlreadyEnrolled) {
            return {
              status: 409,
              success: false,
              message: 'You are already enrolled in this course',
            };
          }

          checkCourse.students.push(checkUser);
          await this.courseRepository.save(checkCourse);

          checkUser.courses.push(checkCourse);
          await this.studentRepository.save(checkUser);

          return {
            status: 200,
            success: true,
            message: 'You are joined successfully',
          };
        } else {
          return {
            status: 403,
            success: false,
            message: 'You are not existing please login or register again',
          };
        }
      } else {
        return {
          status: 404,
          success: false,
          message: 'THeres no this course',
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

  async myCourses(token: string) {
    try {
      const data: any = await verify(token, process.env.SECRET_KEY as string);

      const checkStudent = await this.studentRepository.findOneBy({
        id: data.id,
      });

      if (checkStudent) {
        const courses = checkStudent.courses;

        return {
          status: 200,
          success: true,
          message: courses,
        };
      } else {
        return {
          status: 404,
          success: false,
          message: 'This student does not exists',
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
