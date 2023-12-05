import mongoose from "mongoose";

export class BlogDto{
    title:string;
    author:mongoose.Types.ObjectId;
    genre:string;
    sum:string;
}