import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { Repository } from 'typeorm';
import { verify } from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}

  async create(createStudentDto: CreateStudentDto) {
    try {
      const checkUsername = await this.studentRepository.findOneBy({
        username: createStudentDto.username,
      });

      if (checkUsername) {
        return {
          status: 409,
          success: false,
          message: 'This username has been taken',
        };
      } else {
        const newStudent =
          await this.studentRepository.create(createStudentDto);
        newStudent.role = 'student';
        await this.studentRepository.save(newStudent);

        return {
          status: 202,
          success: true,
          message: 'Student created successfully',
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
      const students = await this.studentRepository.find();

      return {
        status: 200,
        success: true,
        message: 'All students',
        data: students,
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
      const student = await this.studentRepository.findOneBy({ id });

      if (student) {
        return {
          status: 200,
          success: true,
          message: 'Found it',
          data: student,
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

  async update(token: string, updateStudentDto: UpdateStudentDto) {
    try {
      const data: any = await verify(token, process.env.SECRET_KEY as string);

      const student = await this.studentRepository.findOneBy({ id: data.id });

      if (student) {
        const checkUsername = await this.studentRepository.findOneBy({
          username: updateStudentDto.username,
        });

        if (checkUsername) {
          return {
            status: 409,
            success: false,
            message: 'This username has been taken',
          };
        } else {
          await this.studentRepository.update(student.id, updateStudentDto);

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

  async remove(token: string) {
    try {
      const data: any = await verify(token, process.env.SECRET_KEY as string);

      const student = await this.studentRepository.findOneBy({ id: data.id });

      if (student) {
        await this.studentRepository.delete({ id: student.id });

        return {
          status: 200,
          success: true,
          message: 'Deleted successfully',
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

  async getStudentProfile(token: string) {
    try {
      const data: any = await verify(token, process.env.SECRET_KEY as string);

      const student = await this.studentRepository.findOneBy({ id: data.id });

      if (student) {
        return {
          status: 200,
          success: true,
          message: 'Your profile',
          data: student,
        };
      } else {
        return {
          status: 404,
          success: false,
          message: 'You are not exists please login or register',
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
