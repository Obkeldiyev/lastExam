import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
} from '@nestjs/common';
import { HometasksService } from './hometasks.service';
import { CreateHometaskDto } from './dto/create-hometask.dto';
import { UpdateHometaskDto } from './dto/update-hometask.dto';
import { VerifyTokenInterceptor } from 'src/middlewares/verifyToken';
import { VerifyTeacherTokenInterceptor } from 'src/middlewares/verifyTeacher';

@Controller('hometasks')
export class HometasksController {
  constructor(private readonly hometasksService: HometasksService) {}

  @Post()
  @UseInterceptors(VerifyTokenInterceptor)
  @UseInterceptors(VerifyTeacherTokenInterceptor)
  create(@Body() createHometaskDto: CreateHometaskDto) {
    return this.hometasksService.create(createHometaskDto);
  }

  @Get()
  @UseInterceptors(VerifyTokenInterceptor)
  findAll() {
    return this.hometasksService.findAll();
  }

  @Get(':id')
  @UseInterceptors(VerifyTokenInterceptor)
  findOne(@Param('id') id: string) {
    return this.hometasksService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(VerifyTokenInterceptor)
  @UseInterceptors(VerifyTeacherTokenInterceptor)
  update(
    @Param('id') id: string,
    @Body() updateHometaskDto: UpdateHometaskDto,
  ) {
    return this.hometasksService.update(+id, updateHometaskDto);
  }

  @Delete(':id')
  @UseInterceptors(VerifyTokenInterceptor)
  @UseInterceptors(VerifyTeacherTokenInterceptor)
  remove(@Param('id') id: string) {
    return this.hometasksService.remove(+id);
  }
}
