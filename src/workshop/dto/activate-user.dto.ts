import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ActivateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

