import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { authenService } from './authen.service';
import { AuthenLoginDto } from './authenLogin.dto';
import { AuthenRegisterDto } from './authenregister.dto';

@Controller('/authen')
export class AuthenController {
  constructor(private authenService: authenService) {}

  @Post('/signup')
  async createUser(@Body() createUserDto: AuthenRegisterDto) {
    try {
      const usercreation = await this.authenService.createUser(createUserDto);
      return usercreation;
    } catch (err) {
      throw new HttpException(err.message, err.statuscode ?? 400);
    }
  }

  @Post('/signin')
  async signin(
    username: string,
    password: string,
    @Body() usersign: AuthenLoginDto,
  ) {
    const userssign = await this.authenService.signin(
      usersign.username,
      usersign.password,
    );
    return userssign;
  }
}
