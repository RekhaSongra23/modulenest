import { IsNotEmpty, IsString } from "class-validator";



export class AuthenLoginDto {
  @IsNotEmpty()
  @IsNotEmpty()
  readonly username: string;

  

  @IsNotEmpty()
  @IsString()
  readonly password: string;
}

