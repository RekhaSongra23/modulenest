import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

import { Document } from "mongoose";

@Schema({
    timestamps :true
})
export class User{

  id :mongoose.Types.ObjectId;
    @Prop()
    name :string;

    @Prop()
    fname :string;

    @Prop()
    age :string;

    @Prop()
    address: string;

    @Prop()
    department :string;



    
}

export const UserDocument = User && Document
export const UserSchema=SchemaFactory.createForClass(User)