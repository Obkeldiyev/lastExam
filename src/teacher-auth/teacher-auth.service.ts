import { Injectable } from '@nestjs/common';
import { CreateTeacherAuthDto } from './dto/create-teacher-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Teacher } from 'src/teachers/entities/teacher.entity';
import { Repository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class TeacherAuthService {
  constructor(
    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,
  ) {}

  async create(createTeacherAuthDto: CreateTeacherAuthDto) {
    try {
      const checkUsername = await this.teacherRepository.findOneBy({
        username: createTeacherAuthDto.username,
      });

      if (checkUsername) {
        if (checkUsername.password === createTeacherAuthDto.password) {
          const access_token = sign(
            { id: checkUsername.id, role: checkUsername.role },
            process.env.SECRET_KEY as string,
            { expiresIn: 10000000 },
          );

          const refresh_token = sign(
            { id: checkUsername.id, role: checkUsername.role },
            process.env.SECRET_KEY as string,
          );

          return {
            status: 200,
            success: true,
            message: 'Welcome back teacher',
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
          status: 400,
          success: false,
          message: 'Wrong username',
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
