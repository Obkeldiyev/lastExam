import { Controller, Post, Body } from '@nestjs/common';
import { StudentAuthService } from './student-auth.service';
import { CreateStudentAuthDto } from './dto/create-student-auth.dto';
import { UpdateStudentAuthDto } from './dto/update-student-auth.dto';

@Controller('student-auth')
export class StudentAuthController {
  constructor(private readonly studentAuthService: StudentAuthService) {}

  @Post('register')
  register(@Body() createStudentAuthDto: CreateStudentAuthDto) {
    return this.studentAuthService.register(createStudentAuthDto);
  }

  @Post('login')
  login(@Body() updateStudentAuthDto: UpdateStudentAuthDto) {
    return this.studentAuthService.login(updateStudentAuthDto);
  }
}
