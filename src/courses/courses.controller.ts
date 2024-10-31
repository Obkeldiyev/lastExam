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
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { VerifyTokenInterceptor } from 'src/middlewares/verifyToken';
import { VerifyAdminTokenInterceptor } from 'src/middlewares/verifyAdmin';
import { VerifyStudentTokenInterceptor } from 'src/middlewares/verifyStudent';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post('create')
  @UseInterceptors(VerifyTokenInterceptor)
  @UseInterceptors(VerifyAdminTokenInterceptor)
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.coursesService.create(createCourseDto);
  }

  @Get('all')
  @UseInterceptors(VerifyTokenInterceptor)
  findAll() {
    return this.coursesService.findAll();
  }

  @Get(':id')
  @UseInterceptors(VerifyTokenInterceptor)
  findOne(@Param('id') id: string) {
    return this.coursesService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(VerifyTokenInterceptor)
  @UseInterceptors(VerifyAdminTokenInterceptor)
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.coursesService.update(+id, updateCourseDto);
  }

  @Delete(':id')
  @UseInterceptors(VerifyTokenInterceptor)
  @UseInterceptors(VerifyAdminTokenInterceptor)
  remove(@Param('id') id: string) {
    return this.coursesService.remove(+id);
  }

  @Post('joining/:id')
  @UseInterceptors(VerifyTokenInterceptor)
  @UseInterceptors(VerifyStudentTokenInterceptor)
  joiningCourse(
    @Headers('Authorization') token: string,
    @Param('id') id: string,
  ) {
    return this.coursesService.studentsJoin(token, +id);
  }

  @Get()
  @UseInterceptors(VerifyTokenInterceptor)
  @UseInterceptors(VerifyStudentTokenInterceptor)
  getMyCourses(@Headers('Authorization') token: string) {
    return this.coursesService.myCourses(token);
  }
}
