import { Module } from '@nestjs/common';
import { StudentAuthService } from './student-auth.service';
import { StudentAuthController } from './student-auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from 'src/students/entities/student.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Student])],
  controllers: [StudentAuthController],
  providers: [StudentAuthService],
})
export class StudentAuthModule {}
