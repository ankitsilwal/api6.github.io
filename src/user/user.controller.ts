import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Put,
  Delete,
  Body,
} from "@nestjs/common";
import { UserService } from "./user.service";
import mongoose from "mongoose";
import { UpdateUserDto } from "./dto/updateuser.dto";

@Controller("user")
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getall() {
    try {
      const getallusers = await this.userService.getallusers();
      return getallusers;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get(":id")
  async getbyid(@Param("id") userID: mongoose.Types.ObjectId) {
    try {
      const getuserbyid = await this.userService.getbyid(userID);
      return getuserbyid;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Put(":id")
  async updatebyid(
    @Param("id") userId: mongoose.Types.ObjectId,
    @Body() updatedto: UpdateUserDto
  ) {
    try {
      const updateuserbyid = await this.userService.updatebyid(
        userId,
        updatedto
      );
      return updateuserbyid;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Delete(":id")
  async deletebyid(@Param("id") userId: mongoose.Types.ObjectId) {
    try {
      const deleteuserbyid = await this.userService.deletebyid(userId);
      return { message: `User Deleted with id ${userId}` };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
