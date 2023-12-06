import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

import { Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Auth {
  id: mongoose.Types.ObjectId;
  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop()
  role: string;

}

export const AuthDocument = Auth && Document;
export const AuthSchema = SchemaFactory.createForClass(Auth);
