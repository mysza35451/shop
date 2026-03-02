import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    if (req.cookies?.admin_session === 'valid') {
      return true;
    }
    throw new UnauthorizedException('Not authenticated');
  }
}
