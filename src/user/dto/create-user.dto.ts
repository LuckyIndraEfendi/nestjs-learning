import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
export class createUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsEnum(['ADMIN', 'USER'], {
    message: 'Valid Role Required',
  })
  role: 'ADMIN' | 'USER';
}
