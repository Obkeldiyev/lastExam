import { Module } from '@nestjs/common';
import { HometasksService } from './hometasks.service';
import { HometasksController } from './hometasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hometask } from './entities/hometask.entity';
import { Lesson } from 'src/lessons/entities/lesson.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Hometask, Lesson])],
  controllers: [HometasksController],
  providers: [HometasksService],
})
export class HometasksModule {}
