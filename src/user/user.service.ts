import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./user.schema";
import mongoose, { Model } from "mongoose";
import { UpdateUserDto } from "./dto/updateuser.dto";
import * as bcrypt from "bcrypt";
@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async getallusers(): Promise<User[]> {
    const getall = await this.userModel.find({}, { password: 0 });
    if (!getall) {
      throw new BadRequestException(`Users not found`);
    }
    return getall;
  }

  async getbyid(userID: mongoose.Types.ObjectId): Promise<User> {
    const getuserbyid = await this.userModel.findById(userID, { password: 0 });
    if (!getuserbyid) {
      throw new BadRequestException(`User not found`);
    }
    return getuserbyid;
  }

  async updatebyid(userId: mongoose.Types.ObjectId, updatedto: UpdateUserDto) {
    const { username, password, role, pnumber } = updatedto;
    const hashedpassword = await bcrypt.hash(password, 10);
    const updateuserbyid = await this.userModel.findByIdAndUpdate(userId, {
      ...updatedto,
      password: hashedpassword,
    });
    if (!updateuserbyid) {
      throw new BadRequestException(`Enter correct details`);
    }
    return updateuserbyid;
  }

  async deletebyid(userId: mongoose.Types.ObjectId) {
    const deleteuserbyid = await this.userModel.findByIdAndDelete(userId);
    if (!deleteuserbyid) {
      throw new BadRequestException(`User not found`);
    }
    return deleteuserbyid;
  }
}
