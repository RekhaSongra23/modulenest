import { IsNotEmpty, IsString ,IsEnum} from 'class-validator';
   export enum UserRole{
    ADMIN ='admin',
    DEVELOPER ='developer',

   }
export class AuthenRegisterDto {
  @IsNotEmpty()
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @IsString()
   password: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(UserRole)
  role :UserRole;
  
}
