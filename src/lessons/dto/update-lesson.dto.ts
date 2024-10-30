import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateLessonDto {
  @IsNotEmpty()
  @IsString()
  content: string;
}
