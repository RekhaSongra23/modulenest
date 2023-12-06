import mongoose from "mongoose";


export class CreateUserDto {
  id:mongoose.Types.ObjectId;
   name: string;
    fname: string;
    age: string;
    address: string;
    department: string;
}