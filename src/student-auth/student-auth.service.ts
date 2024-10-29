import { Injectable } from '@nestjs/common';
import { CreateStudentAuthDto } from './dto/create-student-auth.dto';
import { UpdateStudentAuthDto } from './dto/update-student-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from 'src/students/entities/student.entity';
import { Repository } from 'typeorm';
import * as dotenv from 'dotenv';
import { sign } from 'jsonwebtoken';
dotenv.config();

@Injectable()
export class StudentAuthService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}

  async register(createStudentAuthDto: CreateStudentAuthDto) {
    try {
      const checkUsername = await this.studentRepository.findOneBy({
        username: createStudentAuthDto.username,
      });

      if (checkUsername) {
        return {
          status: 409,
          success: false,
          message: 'This username has been taken',
        };
      } else {
        const newUser =
          await this.studentRepository.create(createStudentAuthDto);
        newUser.role = 'student';
        await this.studentRepository.save(newUser);

        const access_token = sign(
          { id: newUser.id, role: newUser.role },
          process.env.SECRET_KEY as string,
          { expiresIn: 10000000000 },
        );

        const refresh_token = sign(
          { id: newUser.id, role: newUser.role },
          process.env.SECRET_KEY as string,
        );

        return {
          status: 202,
          success: true,
          message: 'Welcome new user',
          tokens: {
            access_token,
            refresh_token,
          },
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

  async login(updateStudentAuthDto: UpdateStudentAuthDto) {
    try {
      const checkUser = await this.studentRepository.findOneBy({
        username: updateStudentAuthDto.username,
      });

      if (checkUser) {
        if (checkUser.password === updateStudentAuthDto.password) {
          const access_token = sign(
            { id: checkUser.id, role: checkUser.role },
            process.env.SECRET_KEY as string,
            { expiresIn: 10000000000 },
          );

          const refresh_token = sign(
            { id: checkUser.id, role: checkUser.role },
            process.env.SECRET_KEY as string,
          );

          return {
            status: 200,
            success: true,
            message: 'Welcome back',
            tokens: {
              access_token,
              refresh_token,
            },
          };
        } else {
          return {
            status: 400,
            success: false,
            message: 'Wrong password',
          };
        }
      } else {
        return {
          status: 404,
          success: false,
          message: 'This user does not exists',
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
