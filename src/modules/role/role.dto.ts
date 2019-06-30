import { UserRole } from '../../core/interfaces/enums/user-role.enum';

export class RoleDto {
    readonly name: UserRole;
    readonly alias: string;
}