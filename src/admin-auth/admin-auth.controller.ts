import { Controller, Post, Body } from '@nestjs/common';
import { AdminAuthService } from './admin-auth.service';
import { CreateAdminAuthDto } from './dto/create-admin-auth.dto';

@Controller('admin-auth')
export class AdminAuthController {
  constructor(private readonly adminAuthService: AdminAuthService) {}

  @Post('login')
  login(@Body() createAdminAuthDto: CreateAdminAuthDto) {
    return this.adminAuthService.login(createAdminAuthDto);
  }
}
