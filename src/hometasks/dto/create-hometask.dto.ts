import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateHometaskDto {
  @IsNotEmpty()
  @IsString()
  desc: string;

  @IsNotEmpty()
  @IsNumber()
  lessonId: number;
}
