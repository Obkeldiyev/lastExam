import { PartialType } from '@nestjs/mapped-types';
import { CreateHometaskDto } from './create-hometask.dto';

export class UpdateHometaskDto extends PartialType(CreateHometaskDto) {}
