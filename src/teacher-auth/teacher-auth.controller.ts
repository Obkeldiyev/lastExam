import { Controller, Post, Body } from '@nestjs/common';
import { TeacherAuthService } from './teacher-auth.service';
import { CreateTeacherAuthDto } from './dto/create-teacher-auth.dto';

@Controller('teacher-auth')
export class TeacherAuthController {
  constructor(private readonly teacherAuthService: TeacherAuthService) {}

  @Post()
  create(@Body() createTeacherAuthDto: CreateTeacherAuthDto) {
    return this.teacherAuthService.create(createTeacherAuthDto);
  }
}
