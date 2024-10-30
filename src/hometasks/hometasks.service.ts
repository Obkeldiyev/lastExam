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

  async create(createHometaskDto: CreateHometaskDto) {
    try {
      const checkHometask = await this.lessonRepository.findOneBy({
        id: createHometaskDto.lessonId,
      });

      if (checkHometask) {
        const newHometask =
          await this.hometaskRepository.create(createHometaskDto);
        await this.hometaskRepository.save(newHometask);

        return {
          status: 202,
          success: true,
          message: 'created successfully',
        };
      } else {
      }
    } catch (error) {
      return {
        status: error.status || 500,
        success: false,
        message: error.message,
      };
    }
  }

  async findAll() {
    try {
      const hometasks = await this.hometaskRepository.find();

      return {
        status: 200,
        success: true,
        message: 'All hometasks',
        data: hometasks,
      };
    } catch (error) {
      return {
        status: error.status || 500,
        success: false,
        message: error.message,
      };
    }
  }

  async findOne(id: number) {
    try {
      const hometask = await this.hometaskRepository.findOneBy({ id });

      if (hometask) {
        return {
          status: 200,
          success: true,
          message: 'Found it',
          data: hometask,
        };
      } else {
        return {
          status: 404,
          success: false,
          message: 'This hometask does not exists',
        };
      }
    } catch (error) {
      return {
        status: error.status || 500,
        success: false,
        message: error.message,
      };
    }
  }

  async update(id: number, updateHometaskDto: UpdateHometaskDto) {
    try {
      const checkHometask = await this.hometaskRepository.findOneBy({ id });

      if (checkHometask) {
        await this.hometaskRepository.update(id, updateHometaskDto);

        return {
          status: 201,
          success: true,
          message: 'Updated successfully',
        };
      } else {
        return {
          status: 404,
          success: false,
          message: 'This hometask does not exists',
        };
      }
    } catch (error) {
      return {
        status: error.status || 500,
        success: true,
        message: error.message,
      };
    }
  }

  async remove(id: number) {
    try {
      const checkHometask = await this.hometaskRepository.findOneBy({ id });

      if (checkHometask) {
        await this.hometaskRepository.delete({ id });

        return {
          status: 200,
          success: true,
          message: 'Hometask deleted successfully',
        };
      } else {
        return {
          status: 404,
          success: false,
          message: 'This hometask does not exists',
        };
      }
    } catch (error) {
      return {
        status: error.status || 500,
        success: false,
        message: error.message,
      };
    }
  }
}
