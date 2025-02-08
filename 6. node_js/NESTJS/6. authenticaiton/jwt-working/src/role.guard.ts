import { CanActivate, ExecutionContext } from '@nestjs/common';

export class RoleGuard implements CanActivate {
  private rolePassed: string;

  constructor(private readonly role: string) {
    this.rolePassed = role;
  }

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    // return request.user.roles.includes(this.role);
    return this.rolePassed == request.user.role;
  }
}
