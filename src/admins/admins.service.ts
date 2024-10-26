import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { Repository } from 'typeorm';
import { verify } from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class AdminsService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
  ) {}

  async create(createAdminDto: CreateAdminDto) {
    try {
      const checkUsername = await this.adminRepository.findOneBy({
        username: createAdminDto.username,
      });

      if (checkUsername) {
        return {
          status: 409,
          success: false,
          message: 'This username has been taken',
        };
      } else {
        const newAdmin = await this.adminRepository.create(createAdminDto);
        newAdmin.role = 'admin';
        await this.adminRepository.save(newAdmin);

        return {
          status: 202,
          success: true,
          message: 'Admin created successfully',
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
      const admins = await this.adminRepository.find();

      return {
        status: 200,
        success: true,
        message: 'All admins',
        data: admins,
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
      const admin = await this.adminRepository.findOneBy({ id });

      if (admin) {
        return {
          status: 200,
          success: true,
          message: 'Found it',
          data: admin,
        };
      } else {
        return {
          status: 200,
          success: false,
          message: 'This admin does not exists',
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

  async update(token: string, updateAdminDto: UpdateAdminDto) {
    try {
      const data: any = verify(token, process.env.SECRET_KEY as string);

      const admin = await this.adminRepository.findOneBy({ id: data.id });

      if (admin) {
        await this.adminRepository.update(admin.id, updateAdminDto);

        return {
          status: 200,
          success: true,
          message: 'Profile updated successfully',
        };
      } else {
        return {
          status: 404,
          success: false,
          message: 'Wrong token or token expired login again',
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

      const admin = await this.adminRepository.findOneBy({ id: data.id });

      if (admin) {
        await this.adminRepository.delete({ id: admin.id });

        return {
          status: 200,
          success: true,
          message: 'Deleted successfully',
        };
      } else {
        return {
          status: 404,
          success: false,
          message: 'No exists',
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

  async getProfile(token: string) {
    try {
      const data: any = await verify(token, process.env.SECRET_KEY as string);

      const admin = await this.adminRepository.findOneBy({ id: data.id });

      if (admin) {
        return {
          status: 200,
          success: true,
          message: 'Your profile',
          data: admin,
        };
      } else {
        return {
          status: 403,
          success: false,
          message: 'No access',
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
