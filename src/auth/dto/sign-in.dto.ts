import { IsString, IsUUID } from 'class-validator';

export class SignInDto {
  @IsUUID()
  id: string;

  @IsString()
  username: string;
}
