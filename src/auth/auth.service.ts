import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "src/user/user.schema";
import { UserDto } from "./dto/user.dto";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService
  ) {}

  async createuser(userdto: UserDto) {
    const { username, password, role, pnumber } = userdto;
    const hashedpassword = await bcrypt.hash(password, 10);
    const usercreation = await this.userModel.create({
      username,
      password: hashedpassword,
      role,
      pnumber,
    });
    if (!usercreation) {
      throw new BadRequestException(`Enter valid details`);
    }
    return usercreation;
  }

  async findbyusername(username: string) {
    return await this.userModel.findOne({ username });
  }

  async signin(username: string, password: string) {
    const byusername = await this.findbyusername(username);
    if (!byusername) {
      throw new UnauthorizedException(`User not Found`);
    }

    const validPassword = await bcrypt.compare(password, byusername.password);
    if (!validPassword) {
      throw new UnauthorizedException(`Password doesnot matched`);
    }

    const payload = { sub: byusername.id,role:byusername.role };

    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
    });

    return {accessToken};
  }
}
