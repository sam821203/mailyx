import { IsString, IsNotEmpty } from 'class-validator';

export class CreateEmailDto {
  @IsString()
  @IsNotEmpty()
  subject!: string;

  @IsString()
  @IsNotEmpty()
  text!: string;

  @IsString()
  @IsNotEmpty()
  to!: string;

  @IsString()
  @IsNotEmpty()
  from!: string;

  @IsNotEmpty()
  @IsString()
  html!: string;
}
