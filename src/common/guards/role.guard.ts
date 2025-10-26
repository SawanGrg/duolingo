import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSION_KEY } from '../decorators/require.decorator';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    console.log('Second layer guards executing...\n');
    const requiredPermissions = this.reflector.get<string[]>(
      PERMISSION_KEY,
      context.getHandler(),
    );
    console.log(requiredPermissions);
    if (!requiredPermissions || requiredPermissions.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    console.log('🌐 Request Headers:', request.headers);
    console.log('🔑 Authorization Header:', authHeader || 'NOT PROVIDED');

    if (!authHeader) {
      console.log('❌ No Authorization header found\n');
      throw new UnauthorizedException('Authorization header is required');
    }

    // Check if auth header matches any required permission
    const hasPermission = requiredPermissions.includes(authHeader);
    if (hasPermission) {
      return true;
    } else {
      throw new UnauthorizedException(
        `Invalid permission. Required one of: ${requiredPermissions.join(', ')}`,
      );
    }
  }
}
