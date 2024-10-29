import { Injectable } from '@nestjs/common';
import { CreateAdminAuthDto } from './dto/create-admin-auth.dto';

@Injectable()
export class AdminAuthService {
  login(createAdminAuthDto: CreateAdminAuthDto) {
    try {
      return `Admin addes by ${createAdminAuthDto}`;
    } catch (error) {
      return {
        status: error.message || 500,
        success: false,
        message: error.message,
      };
    }
  }
}
