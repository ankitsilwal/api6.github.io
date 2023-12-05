import {
  Controller,
  Post,
  Body,
  HttpException,
  UseGuards,
  Get,
  Param,
  Put,
  Delete,
  BadRequestException,
  Request,
} from "@nestjs/common";
import { BlogService } from "./blog.service";
import { BlogDto } from "./dto/blog.dto";
import { AuthGuard } from "src/auth/auth.guard";
import mongoose from "mongoose";
import { Blog } from "./blog.schema";
import { UpdateBlogDto } from "./dto/updateblog.dto";
import { RolesGuard } from "src/auth/roles/roles.guard";
import { UserRole } from "src/auth/dto/user.dto";
import { UserRoles } from "src/auth/roles/roles.decorator";

@UseGuards(AuthGuard, RolesGuard)
@Controller("blog")
export class BlogController {
  constructor(private blogService: BlogService) {}

  @UserRoles(UserRole.ADMIN,UserRole.USER)
  @Post("add")
  async createblog(@Body() createblogDto: BlogDto, @Request() req: any) {
    try {
      const authorid = req.user.sub;
      const blogcreation = await this.blogService.createblog(
        createblogDto,
        authorid
      );

      return blogcreation;
    } catch (error) {
      throw new HttpException(error.message, error.statuscode ?? 400);
    }
  }

  @UserRoles(UserRole.ADMIN,UserRole.USER)
  @Get()
  async getallblogs(): Promise<Blog[]> {
    const getblogs = await this.blogService.getallblogs();
    return getblogs;
  }


  @UserRoles(UserRole.ADMIN)
  @Get(":id")
  async getbyid(
    @Param("id") blogid: mongoose.Types.ObjectId,
    @Request() req: any
  ) {
    try {
      const author: mongoose.Types.ObjectId = req.user.sub;
      return await this.blogService.getbyid(blogid, author);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Put(":id")
  async updatebyid(
    @Param("id") blogid: mongoose.Types.ObjectId,
    @Body() updateblogdto: UpdateBlogDto,
    @Request() req: any
  ) {
    try {
      const author = req.user.sub;
      return await this.blogService.updatebyid(blogid, updateblogdto, author);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Delete(":id")
  async deletebyid(
    @Param("id") blogid: mongoose.Types.ObjectId,
    @Request() req: any
  ) {
    try {
      const authorid = req.user.sub;
      const deleteblog = await this.blogService.deletebyid(blogid, authorid);
      return { message: "Blog Deleted" };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
