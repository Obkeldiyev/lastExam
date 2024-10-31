import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
  UseInterceptors,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { VerifyTokenInterceptor } from 'src/middlewares/verifyToken';
import { VerifyAdminTokenInterceptor } from 'src/middlewares/verifyAdmin';
import { VerifyStudentTokenInterceptor } from 'src/middlewares/verifyStudent';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  @UseInterceptors(VerifyTokenInterceptor)
  @UseInterceptors(VerifyAdminTokenInterceptor)
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentsService.create(createStudentDto);
  }

  @Get('all')
  @UseInterceptors(VerifyTokenInterceptor)
  @UseInterceptors(VerifyAdminTokenInterceptor)
  findAll() {
    return this.studentsService.findAll();
  }

  @Get(':id')
  @UseInterceptors(VerifyTokenInterceptor)
  @UseInterceptors(VerifyAdminTokenInterceptor)
  findOne(@Param('id') id: string) {
    return this.studentsService.findOne(id);
  }

  @Patch('update')
  @UseInterceptors(VerifyTokenInterceptor)
  @UseInterceptors(VerifyStudentTokenInterceptor)
  update(
    @Headers('Authorization') token: string,
    @Body() updateStudentDto: UpdateStudentDto,
  ) {
    return this.studentsService.update(token, updateStudentDto);
  }

  @Delete('delete')
  @UseInterceptors(VerifyTokenInterceptor)
  @UseInterceptors(VerifyStudentTokenInterceptor)
  remove(@Headers('Authorization') token: string) {
    return this.studentsService.remove(token);
  }

  @Get()
  @UseInterceptors(VerifyTokenInterceptor)
  @UseInterceptors(VerifyStudentTokenInterceptor)
  getProfile(@Headers('Authorization') token: string) {
    return this.studentsService.getStudentProfile(token);
  }
}
