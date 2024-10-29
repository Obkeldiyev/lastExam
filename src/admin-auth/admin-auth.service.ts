import { Injectable } from '@nestjs/common';
import { CreateAdminAuthDto } from './dto/create-admin-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from 'src/admins/entities/admin.entity';
import { Repository } from 'typeorm';
import * as dotenv from 'dotenv';
import { sign } from 'jsonwebtoken';
dotenv.config();

@Injectable()
export class AdminAuthService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
  ) {}

  async login(createAdminAuthDto: CreateAdminAuthDto) {
    try {
      const adminCheck = await this.adminRepository.findOneBy({
        username: createAdminAuthDto.username,
      });

      if (adminCheck) {
        if (adminCheck.password === createAdminAuthDto.password) {
          const access_token = sign(
            { id: adminCheck.id, role: adminCheck.role },
            process.env.SECRET_KEY as string,
            { expiresIn: 1000000 },
          );

          const refresh_token = sign(
            { id: adminCheck.id, role: adminCheck.role },
            process.env.SECRET_KEY as string,
          );

          return {
            status: 200,
            success: true,
            message: 'Welcome back admin',
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
        status: error.message || 500,
        success: false,
        message: error.message,
      };
    }
  }
}
