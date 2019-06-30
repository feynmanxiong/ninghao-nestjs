import { PermissionInterface } from "../../interceptors/permission.interface";
import { SetMetadata } from "@nestjs/common";

export const Permissions = 
    (...Permissions: Partial<PermissionInterface>[]) => SetMetadata('permissions', Permissions);