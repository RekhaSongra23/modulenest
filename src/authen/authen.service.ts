import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { AuthenRegisterDto } from './authenregister.dto';
import { Auth } from './auth.schema';
import { find } from 'rxjs';
@Injectable()
export class authenService {
  finduserbyusername: any;
  constructor(
    private jwtService: JwtService,
    @InjectModel(Auth.name) private authModel: Model<Auth>,
  ) {}

  async signin(username: string, password: string) {
    const user = await this.findbyusername(username);
    if (!user) {
      throw new UnauthorizedException('User not Found');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid Credentials');
    }
    const payload = { sub: user.id, role: user.role };
    const acessToken = this.jwtService.sign(payload, {
      secret: `${process.env.JWT_SECRET}`,
    });
    return { acessToken };
  }

  async createUser(createUserDto: AuthenRegisterDto){
    const { username, password, role } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.authModel.create({
      username,
      password: hashedPassword,
      role,
    });
    const userdata = {
      sub: username
    };
    const accessToken = this.jwtService.sign(userdata, {
      secret: `${process.env.JWT_SECRET}`,
    });

    const data = {user,accessToken}
    return data;
  }


  async findbyusername(username:string){
    const findusername = await this.authModel.findOne({username});
    return findusername
  }
}
