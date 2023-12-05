import mongoose from "mongoose";
import { IsEnum } from "@nestjs/class-validator";

export enum UserRole{
    USER="user",
    ADMIN="admin",
}
export class UserDto{
    id:mongoose.Types.ObjectId;
    username :string;
    password:string;
    @IsEnum(UserRole)
    role:UserRole;
    pnumber:number;
}

