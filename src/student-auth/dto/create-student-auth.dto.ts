import { IsNotEmpty, IsString } from 'class-validator';

export class CreateStudentAuthDto {
  @IsNotEmpty()
  @IsString()
  fullname: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
