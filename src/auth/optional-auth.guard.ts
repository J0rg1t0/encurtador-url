import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './auth.constants';

@Injectable()
export class OptionalAuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    request.user = null;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return true;
    }

    const token = authHeader.substring(7);
    if (!token) {
      return true;
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
      
      request.user = payload;
      
    } catch (error) {
      return true;
    }
    return true;
  }
}