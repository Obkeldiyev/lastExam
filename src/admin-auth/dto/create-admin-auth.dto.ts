import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAdminAuthDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
