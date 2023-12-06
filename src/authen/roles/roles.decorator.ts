import { SetMetadata } from "@nestjs/common";
import { UserRole } from "../authenregister.dto";

export const UerRoles =(...roles :UserRole[]) =>SetMetadata('roles' ,roles);