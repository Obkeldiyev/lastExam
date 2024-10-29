import { PartialType } from '@nestjs/mapped-types';
import { CreateTeacherAuthDto } from './create-teacher-auth.dto';

export class UpdateTeacherAuthDto extends PartialType(CreateTeacherAuthDto) {}
