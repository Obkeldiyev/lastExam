import { Module } from '@nestjs/common';
import { HometasksService } from './hometasks.service';
import { HometasksController } from './hometasks.controller';

@Module({
  controllers: [HometasksController],
  providers: [HometasksService],
})
export class HometasksModule {}
