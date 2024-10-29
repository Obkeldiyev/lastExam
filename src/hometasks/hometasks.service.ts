import { Injectable } from '@nestjs/common';
import { CreateHometaskDto } from './dto/create-hometask.dto';
import { UpdateHometaskDto } from './dto/update-hometask.dto';

@Injectable()
export class HometasksService {
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
