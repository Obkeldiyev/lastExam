import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { VerifyTokenInterceptor } from 'src/middlewares/verifyToken';
import { VerifyTeacherTokenInterceptor } from 'src/middlewares/verifyTeacher';

@Controller('lessons')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @Post()
  @UseInterceptors(VerifyTokenInterceptor)
  @UseInterceptors(VerifyTeacherTokenInterceptor)
  create(@Body() createLessonDto: CreateLessonDto) {
    return this.lessonsService.create(createLessonDto);
  }

  @Get()
  @UseInterceptors(VerifyTokenInterceptor)
  findAll() {
    return this.lessonsService.findAll();
  }

  @Get(':id')
  @UseInterceptors(VerifyTokenInterceptor)
  findOne(@Param('id') id: string) {
    return this.lessonsService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(VerifyTokenInterceptor)
  @UseInterceptors(VerifyTeacherTokenInterceptor)
  update(@Param('id') id: string, @Body() updateLessonDto: UpdateLessonDto) {
    return this.lessonsService.update(+id, updateLessonDto);
  }
}
