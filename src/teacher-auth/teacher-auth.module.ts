import { Module } from '@nestjs/common';
import { TeacherAuthService } from './teacher-auth.service';
import { TeacherAuthController } from './teacher-auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teacher } from 'src/teachers/entities/teacher.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Teacher])],
  controllers: [TeacherAuthController],
  providers: [TeacherAuthService],
})
export class TeacherAuthModule {}
