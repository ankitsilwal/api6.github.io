import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Blog } from "./blog.schema";
import mongoose, { Model } from "mongoose";
import { BlogDto } from "./dto/blog.dto";
import { UpdateBlogDto } from "./dto/updateblog.dto";

@Injectable()
export class BlogService {
  constructor(@InjectModel(Blog.name) private blogModel: Model<Blog>) {}

  async createblog(createblogdto: BlogDto, blogid: string): Promise<Blog> {
    const blogcreation = await this.blogModel.create({
      ...createblogdto,
      author: new mongoose.Types.ObjectId(blogid),
    });
    if (!blogcreation) {
      throw new BadRequestException(`Enter correct details`);
    }
    return blogcreation;
  }

  async getallblogs(): Promise<Blog[]> {
    const getblogs = await this.blogModel
      .find()
      .populate("author", { password: 0, role: 0 });
    return getblogs;
  }

  async getbyid(
    blogid: mongoose.Types.ObjectId,
    userId: mongoose.Types.ObjectId
  ): Promise<Blog> {
    const getblog = (
      await this.blogModel.findOne({
        _id: blogid,
        author: new mongoose.Types.ObjectId(userId),
      })
    ).populate("author", { password: 0, role: 0 });
    if (!getblog) {
      throw new NotFoundException(`Blog not found`);
    }
    return getblog;
  }

  async updatebyid(
    blogid: mongoose.Types.ObjectId,
    updatedto: UpdateBlogDto,
    userId: mongoose.Types.ObjectId
  ) {
    const updateblog = await this.blogModel.findOneAndUpdate(
      {
        _id: blogid,
        author: new mongoose.Types.ObjectId(userId),
      },
      updatedto,
      { new: true }
    );
    if (!updateblog) {
      throw new BadRequestException(`Enter correct details`);
    }
    return updateblog;
  }

  async deletebyid(
    blogid: mongoose.Types.ObjectId,
    userId: mongoose.Types.ObjectId
  ) {
    const deleteblog = await this.blogModel.findOneAndDelete({
      _id: blogid,
      author: new mongoose.Types.ObjectId(userId),
    });
    if (!deleteblog) {
      throw new BadRequestException(`Please enter correct details`);
    }
    return deleteblog;
  }
}
