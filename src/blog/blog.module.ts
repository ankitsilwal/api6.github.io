import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Blog, BlogSchema } from "./blog.schema";
import { AuthModule } from "src/auth/auth.module";
import { JwtService } from "@nestjs/jwt";
import { BlogController } from "./blog.controller";
import { BlogService } from "./blog.service";
import { RolesGuard } from "src/auth/roles/roles.guard";
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Blog.name, schema: BlogSchema }]),
    AuthModule,
  ],
  controllers: [BlogController],
  providers: [BlogService, JwtService, RolesGuard],
})
export class BlogModule {}
