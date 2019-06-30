import { UserRole } from "../core/interfaces/enums/user-role.enum";
import { Possession } from "../core/interfaces/enums/possession.enum";

export interface PermissionInterface {
    role: UserRole;
    resource: string;
    possesion: Possession
}