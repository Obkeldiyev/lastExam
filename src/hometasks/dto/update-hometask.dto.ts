import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateHometaskDto {
  @IsNotEmpty()
  @IsString()
  desc: string;
}
