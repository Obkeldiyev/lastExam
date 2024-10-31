import { Module } from '@nestjs/common';
import { SubmissionService } from './submission.service';
import { SubmissionController } from './submission.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Submission } from './entities/submission.entity';
import { Student } from 'src/students/entities/student.entity';
import { Hometask } from 'src/hometasks/entities/hometask.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Submission, Student, Hometask])],
  controllers: [SubmissionController],
  providers: [SubmissionService],
})
export class SubmissionModule {}
