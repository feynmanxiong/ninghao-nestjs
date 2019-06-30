import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { User } from '../../modules/user/user.entity';
import { PermissionInterface } from '../../interceptors/permission.interface';
import { Possession } from '../../core/interfaces/enums/possession.enum';
import { UserService } from '../../modules/user/user.service';

@Injectable()
export class AccessGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly userService: UserService
  ){}

  async validatePermissions(
    permissions: PermissionInterface[],
    user: User,
    resourceId: number
    ){
      const results = permissions.map(async permission => {
        const { role, resource, possesion } = permission;
        let hasRole: boolean = true;
        let hasPossession: boolean = true;

        if(possesion === Possession.OWN){
          hasPossession = await this.userService.possess(user.id, resource, resourceId);
        }

        if(role){
          hasRole = user.roles.some(userRole => userRole.name === role)
        }

        return hasRole && hasPossession;
      });
      return Promise.all(results);
    }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const permissions = this.reflector.get(
      'permissions',
      context.getHandler()
    )

    const results = await this.validatePermissions(
      permissions,
      request.user,
      parseInt(request.params.id)
    )

    
    return results.includes(true);
  }
}