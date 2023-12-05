import mongoose from "mongoose";


export class UpdateBlogDto{
    title:string;
    author:mongoose.Types.ObjectId;
    genre:string;
    sum:string;
}