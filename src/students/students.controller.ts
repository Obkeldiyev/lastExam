import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentsService.create(createStudentDto);
  }

  @Get('all')
  findAll() {
    return this.studentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentsService.findOne(id);
  }

  @Patch('update')
  update(
    @Headers('Authorization') token: string,
    @Body() updateStudentDto: UpdateStudentDto,
  ) {
    return this.studentsService.update(token, updateStudentDto);
  }

  @Delete('delete')
  remove(@Headers('Authorization') token: string) {
    return this.studentsService.remove(token);
  }

  @Get()
  getProfile(@Headers('Authorization') token: string) {
    return this.studentsService.getStudentProfile(token);
  }
}
