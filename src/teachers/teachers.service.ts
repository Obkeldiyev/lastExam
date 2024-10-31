import { Injectable } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Teacher } from './entities/teacher.entity';
import { Repository } from 'typeorm';
import { verify } from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class TeachersService {
  constructor(
    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,
  ) {}

  async create(createTeacherDto: CreateTeacherDto) {
    try {
      const checkUsername = await this.teacherRepository.findOneBy({
        username: createTeacherDto.username,
      });

      if (checkUsername) {
        return {
          status: 409,
          success: false,
          message: 'This username has been taken',
        };
      } else {
        const newTeacher =
          await this.teacherRepository.create(createTeacherDto);
        newTeacher.role = 'teacher';
        await this.teacherRepository.save(newTeacher);

        return {
          status: 202,
          success: true,
          message: 'Teacher created successfully',
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
      const teachers = await this.teacherRepository.find();

      return {
        status: 200,
        success: true,
        message: 'All teachers',
        data: teachers,
      };
    } catch (error) {
      return {
        status: error.status || 500,
        success: false,
        message: error.message,
      };
    }
  }

  async findOne(id: string) {
    try {
      const teacher = await this.teacherRepository.findOneBy({ id });

      if (teacher) {
        return {
          status: 200,
          success: true,
          message: 'Found it',
          data: teacher,
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

  async update(token: string, updateTeacherDto: UpdateTeacherDto) {
    try {
      const data: any = await verify(token, process.env.SECRET_KEY as string);

      const teacher = await this.teacherRepository.findOneBy({ id: data.id });

      if (teacher) {
        const checkUsername = await this.teacherRepository.findOneBy({
          username: updateTeacherDto.username,
        });

        if (checkUsername) {
          return {
            status: 409,
            success: false,
            message: 'This username has been taken',
          };
        } else {
          await this.teacherRepository.update(teacher.id, updateTeacherDto);

          return {
            status: 200,
            success: true,
            message: 'Updated successfully',
          };
        }
      } else {
        return {
          status: 404,
          success: false,
          message: 'Not exists',
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

  async remove(token: string) {
    try {
      const data: any = await verify(token, process.env.SECRET_KEY as string);

      const teacher = await this.teacherRepository.findOneBy({ id: data.id });

      if (teacher) {
        await this.teacherRepository.delete({ id: teacher.id });

        return {
          status: 200,
          success: true,
          message: 'Deleted successfully',
        };
      } else {
        return {
          status: 404,
          success: false,
          message: 'Not exists',
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

  async getTeacherProfile(token: string) {
    try {
      const data: any = await verify(token, process.env.SECRET_KEY as string);

      const teacher = await this.teacherRepository.findOneBy({ id: data.id });

      if (teacher) {
        return {
          status: 200,
          success: true,
          message: 'Your profile',
          data: teacher,
        };
      } else {
        return {
          status: 403,
          success: false,
          message: 'Does not exists',
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

  async getTeacherCourses(token: string) {
    try {
      const data: any = verify(token, process.env.SECRET_KEY);

      const check = await this.teacherRepository.findOneBy({ id: data.id });

      if (check) {
        const courses = await check.courses;

        return {
          status: 200,
          success: true,
          message: 'Your courses',
          data: courses,
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
        status: error.message || 500,
        success: false,
        message: error.message,
      };
    }
  }
}
