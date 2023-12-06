import { BadRequestException, Injectable, NotFoundException} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./user.schema";
import mongoose from "mongoose";
 import { CreateUserDto } from "./dto/createuserdto";
import { UpdateCreateUserDto } from "./dto/updateUserdto";

@Injectable()
export class usersServices {
  create: any;
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>, //Model mean schema name
  ) {}

 // createuser---------------------------------------------------------------------

   async createUser(createUserDto: CreateUserDto): Promise<User> {
  
     const res = await this.userModel.create(createUserDto);
     return res;
   }
 // finduser-------------------------------------------------------------------------
  async findAllUsers(): Promise<User[]> {
    const findusers = await this.userModel.find(); //usermodel is database in userschema
    return findusers;
  }

  //finduserbyid--------------------------------------------------------------------

  async getUserById(id: mongoose.Types.ObjectId): Promise<User> {
    const getUserById = await this.userModel.findById(id);
    return getUserById;
  }

  //update user-----------------------------------------------------------------

  async updateById(
    Id: mongoose.Types.ObjectId,
    updateUserDto: UpdateCreateUserDto,
  ): Promise<User> {
    const existsUser = await this.userModel.findByIdAndUpdate(
      Id,
      updateUserDto,
      {new:true}
    );
    if (!existsUser) {
      throw new NotFoundException(`User with ${Id} not found`);
    }
    return existsUser;
  }

  //delete by id----------------------------------------------------------------

  async deleteUserById(Id: mongoose.Types.ObjectId) {
    const deleteUserById = await this.userModel.findByIdAndDelete(Id);

    if (!deleteUserById) {
      throw new NotFoundException(`User with #${Id} not found`);
    }
    return deleteUserById;
  }

  
}