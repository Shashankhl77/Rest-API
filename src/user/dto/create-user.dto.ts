import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  age: string;

  @IsEnum(['Sofware developer', 'intern', 'admin'], {
    message: 'valid role required',
  })
  role: 'Sofware developer' | 'intern' | 'admin';
}
