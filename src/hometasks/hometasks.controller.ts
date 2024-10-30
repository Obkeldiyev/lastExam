import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { HometasksService } from './hometasks.service';
import { CreateHometaskDto } from './dto/create-hometask.dto';
import { UpdateHometaskDto } from './dto/update-hometask.dto';

@Controller('hometasks')
export class HometasksController {
  constructor(private readonly hometasksService: HometasksService) {}

  @Post()
  create(@Body() createHometaskDto: CreateHometaskDto) {
    return this.hometasksService.create(createHometaskDto);
  }

  @Get()
  findAll() {
    return this.hometasksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hometasksService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateHometaskDto: UpdateHometaskDto,
  ) {
    return this.hometasksService.update(+id, updateHometaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hometasksService.remove(+id);
  }
}
