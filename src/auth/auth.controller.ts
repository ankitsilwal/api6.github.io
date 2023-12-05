import {
  Body,
  Controller,
  HttpException,
  Post,
  UnauthorizedException,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserDto } from "./dto/user.dto";
import { AuthDto } from "./dto/auth.dto";

@Controller("user")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("add")
  async createuser(@Body() userdto: UserDto) {
    try {
      const usercreation = await this.authService.createuser(userdto);
      return usercreation;
    } catch (err) {
      throw new HttpException(err.message, err.statuscode ?? 400);
    }
  }

  @Post("auth")
  async login(@Body() logindto: AuthDto) {
    try {
      const loginn = await this.authService.signin(
        logindto.username,
        logindto.password
      );
      return loginn;
    } catch (err) {
      throw new UnauthorizedException(err.message, err.statuscode ?? 400);
    }
  }
}
