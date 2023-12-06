import mongoose from 'mongoose';

export class UpdateCreateUserDto {
  id: mongoose.Types.ObjectId;
  name: string;
  fname: string;
  age: string;
  address: string;
  department: string;
}
