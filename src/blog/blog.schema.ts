import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Document } from "mongoose";
@Schema({ timestamps: true })
export class Blog {
  id: mongoose.Types.ObjectId;

  @Prop()
  title: string;

  @Prop({type:mongoose.Types.ObjectId, ref :"User"})
  author: mongoose.Types.ObjectId;

  @Prop()
  genre: string;

  @Prop()
  sum: string;
}

export const BlogDocument = Blog && Document;
export const BlogSchema = SchemaFactory.createForClass(Blog);
