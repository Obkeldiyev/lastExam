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
import { TeachersService } from './teachers.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { VerifyTokenInterceptor } from 'src/middlewares/verifyToken';
import { VerifyAdminTokenInterceptor } from 'src/middlewares/verifyAdmin';
import { VerifyTeacherTokenInterceptor } from 'src/middlewares/verifyTeacher';

@Controller('teachers')
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) {}

  @Post()
  @UseInterceptors(VerifyTokenInterceptor)
  @UseInterceptors(VerifyAdminTokenInterceptor)
  create(@Body() createTeacherDto: CreateTeacherDto) {
    return this.teachersService.create(createTeacherDto);
  }

  @Get('all')
  @UseInterceptors(VerifyTokenInterceptor)
  @UseInterceptors(VerifyAdminTokenInterceptor)
  findAll() {
    return this.teachersService.findAll();
  }

  @Get(':id')
  @UseInterceptors(VerifyTokenInterceptor)
  @UseInterceptors(VerifyAdminTokenInterceptor)
  findOne(@Param('id') id: string) {
    return this.teachersService.findOne(id);
  }

  @Patch('update')
  @UseInterceptors(VerifyTokenInterceptor)
  @UseInterceptors(VerifyTeacherTokenInterceptor)
  update(
    @Headers('Authorization') token: string,
    @Body() updateTeacherDto: UpdateTeacherDto,
  ) {
    return this.teachersService.update(token, updateTeacherDto);
  }

  @Delete('delete')
  @UseInterceptors(VerifyTokenInterceptor)
  @UseInterceptors(VerifyTeacherTokenInterceptor)
  remove(@Headers('Authorization') token: string) {
    return this.teachersService.remove(token);
  }

  @Get()
  @UseInterceptors(VerifyTokenInterceptor)
  @UseInterceptors(VerifyTeacherTokenInterceptor)
  getProfile(@Headers('Authorization') token: string) {
    return this.teachersService.getTeacherProfile(token);
  }

  @Get()
  @UseInterceptors(VerifyTokenInterceptor)
  @UseInterceptors(VerifyTeacherTokenInterceptor)
  getCourses(@Headers('Authorization') token: string) {
    return this.teachersService.getTeacherCourses(token);
  }
}
