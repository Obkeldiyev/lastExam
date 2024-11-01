import { Injectable } from '@nestjs/common';
import { CreateSubmissionDto } from './dto/create-submission.dto';
import { UpdateSubmissionDto } from './dto/update-submission.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Submission } from './entities/submission.entity';
import { Repository } from 'typeorm';
import { Hometask } from 'src/hometasks/entities/hometask.entity';
import { Student } from 'src/students/entities/student.entity';
import { verify } from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class SubmissionService {
  constructor(
    @InjectRepository(Submission)
    private readonly submissionRepository: Repository<Submission>,
    @InjectRepository(Hometask)
    private readonly hometaskRepository: Repository<Hometask>,
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Hometask>,
  ) {}

  async create(createSubmissionDto: CreateSubmissionDto, token: string) {
    try {
      const data: any = await verify(token, process.env.SECRET_KEY);

      const checkStudent = await this.studentRepository.findOneBy({
        id: data.id,
      });

      if (checkStudent) {
        const checkSubmission = await this.submissionRepository.findOne({
          where: {
            hometask: { id: createSubmissionDto.hometaskId },
            student: { id: checkStudent.id.toString() },
          },
        });

        if (checkSubmission) {
          return {
            status: 409,
            success: false,
            message: 'This hometask done if you wanna change update it',
          };
        } else {
          const newSubmission = this.submissionRepository.create({
            content: createSubmissionDto.content,
          });

          newSubmission.student = checkStudent as unknown as Student;
          newSubmission.hometask = {
            id: createSubmissionDto.hometaskId,
          } as Hometask;

          await this.submissionRepository.save(newSubmission);

          return {
            status: 202,
            success: true,
            message: 'Submission added successfully',
          };
        }
      } else {
        return {
          status: 404,
          success: false,
          message: 'This student does not exists',
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

  async findAll() {
    try {
      const submissions = await this.submissionRepository.find();

      return {
        status: 200,
        success: true,
        message: 'All submissions',
        data: submissions,
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
      const submission = await this.submissionRepository.findOneBy({ id });

      if (submission) {
        return {
          status: 200,
          success: true,
          message: 'Found it',
          data: submission,
        };
      } else {
        return {
          status: 404,
          success: false,
          message: 'This submission does not exists',
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

  async update(
    id: number,
    updateSubmissionDto: UpdateSubmissionDto,
    token: string,
  ) {
    try {
      const checkSubmission = await this.submissionRepository.findOne({
        where: { id },
        relations: ['student'],
      });
      const data: any = verify(token, process.env.SECRET_KEY);

      if (checkSubmission) {
        const checkStudent = await this.studentRepository.findOneBy({
          id: data.id,
        });

        if (checkStudent) {
          if (
            (checkSubmission.student.id as unknown as string) ==
            (checkStudent.id as unknown as string)
          ) {
            await this.submissionRepository.update(id, updateSubmissionDto);

            return {
              status: 201,
              success: true,
              message: 'Submission updated',
            };
          } else {
            return {
              status: 403,
              success: false,
              message: 'It is not your hometask',
            };
          }
        } else {
          return {
            status: 404,
            success: false,
            message: 'You are not existing',
          };
        }
      } else {
        return {
          status: 404,
          success: false,
          message: 'This submission does not exists',
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

  async getMyHometasks(token: string) {
    try {
      const data: any = verify(token, process.env.SECRET_KEY);

      const studentCheck = await this.studentRepository.findOneBy({
        id: data.id,
      });

      if (studentCheck) {
        const myHometasks = await this.submissionRepository.find({
          where: { student: { id: studentCheck.id as unknown as string } },
        });

        return {
          status: 200,
          success: true,
          message: 'Your hometasks',
          data: myHometasks,
        };
      } else {
        return {
          status: 404,
          success: false,
          message: 'You are not in db',
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

  async acceptSubmission(id: number) {
    try {
      console.log(id);
      const checkSubmission = await this.submissionRepository.findOneBy({ id });

      if (checkSubmission) {
        checkSubmission.status = 'Accepted';
        await this.submissionRepository.update(id, checkSubmission);

        return {
          status: 200,
          success: true,
          message: 'Successfully accepted',
        };
      } else {
        return {
          status: 404,
          success: false,
          message: 'This submission does not exist',
        };
      }
    } catch (error) {
      console.log(error);
      return {
        status: error.status || 500,
        success: false,
        message: error.message,
      };
    }
  }

  async rejectSubmission(id: number) {
    try {
      console.log(id);
      const checkSubmission = await this.submissionRepository.findOneBy({ id });

      if (checkSubmission) {
        checkSubmission.status = 'Rejected';
        await this.submissionRepository.update(id, checkSubmission);

        return {
          status: 201,
          success: true,
          message: 'Successfully rejected',
        };
      } else {
        return {
          status: 404,
          success: false,
          message: 'This submission does not exist',
        };
      }
    } catch (error) {
      console.log(error);
      return {
        status: error.status || 500,
        success: false,
        message: error.message,
      };
    }
  }
}
