import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";

@Schema({ timestamps: true })
export class User {
    
  id:mongoose.Types.ObjectId;

  @Prop({ unique: true })
  username: string;

  @Prop()
  password: string;

  @Prop()
  role: string;

  @Prop()
  pnumber: number;
}

export const UserDocument = User && Document;
export const UserSchema = SchemaFactory.createForClass(User);
