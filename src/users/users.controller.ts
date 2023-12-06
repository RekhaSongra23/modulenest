import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { usersServices } from './users.service';
import { User } from './user.schema';
// import { CreateUserDto } from './dto/createuserdto';
import mongoose from 'mongoose';
import { UserRole } from 'src/authen/authenregister.dto';
import { UpdateCreateUserDto } from './dto/updateUserdto';
import { CreateUserDto } from './dto/createuserdto';



@Controller('users')
export class UsersController {
  // add(CreateUserDto: CreateUserDto) {
  //   throw new Error('Method not implemented.');
  // }
  constructor(private readonly userService: usersServices) {}

  // @UserRole(UserRole.ADMIN, UserRole.DEVELOPER)
  @Get()
  async findAllUsers() {
    const users1 = await this.userService.findAllUsers();
    return users1;
  }

   @Post()
   async creatuser(@Body() createUserDto: CreateUserDto):Promise<User>{
     const usercreation = await this.userService.createUser(createUserDto);
     return usercreation;
   }

  @Get(':id')
  async getUserById(@Param('id') id: mongoose.Types.ObjectId) {
    const findUser = await this.userService.getUserById(id);
    return findUser;
  }

  // @UserRole(UserRole.ADMIN)
  @Put(':id')
  async updateUserById(
    @Param('id') Id: mongoose.Types.ObjectId,
    @Body() updateUserDto: UpdateCreateUserDto,
  ) {
    try {
      const existsUser = await this.userService.updateById(Id, updateUserDto);
      return existsUser;
    } catch (err) {
      throw new NotFoundException(err);
    }
  }

  // @UserRole(UserRole.ADMIN)
  @Delete(':id')
  async deleteUserById(
    @Param('id') id: mongoose.Types.ObjectId,
  ){
    try {
      const deletedUser = await this.userService.deleteUserById(id);
      return deletedUser;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
