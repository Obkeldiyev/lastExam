import { Module } from '@nestjs/common';
import { AdminAuthService } from './admin-auth.service';
import { AdminAuthController } from './admin-auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from 'src/admins/entities/admin.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Admin])],
  controllers: [AdminAuthController],
  providers: [AdminAuthService],
})
export class AdminAuthModule {}
