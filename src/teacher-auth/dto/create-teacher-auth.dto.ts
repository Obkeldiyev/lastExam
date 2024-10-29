import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTeacherAuthDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
