import { Injectable } from '@nestjs/common';
import { CreateHometaskDto } from './dto/create-hometask.dto';
import { UpdateHometaskDto } from './dto/update-hometask.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Hometask } from './entities/hometask.entity';
import { Repository } from 'typeorm';
import { Lesson } from 'src/lessons/entities/lesson.entity';

@Injectable()
export class HometasksService {
  constructor(
    @InjectRepository(Hometask)
    private readonly hometaskRepository: Repository<Hometask>,
    @InjectRepository(Lesson)
    private readonly lessonRepository: Repository<Lesson>,
  ) {}

  create(createHometaskDto: CreateHometaskDto) {
    return 'This action adds a new hometask';
  }

  findAll() {
    return `This action returns all hometasks`;
  }

  findOne(id: number) {
    return `This action returns a #${id} hometask`;
  }

  update(id: number, updateHometaskDto: UpdateHometaskDto) {
    return `This action updates a #${id} hometask`;
  }

  remove(id: number) {
    return `This action removes a #${id} hometask`;
  }
}
