import { UserRole } from "../dto/user.dto";
import { SetMetadata } from "@nestjs/common/decorators";
export const UserRoles = (...roles: UserRole[]) => SetMetadata("roles", roles);
