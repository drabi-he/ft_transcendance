import { JwtService } from '@nestjs/jwt';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  canActivate(context: ExecutionContext) {
    try {
      const request = context.switchToHttp().getRequest();
      const token = request.cookies['jwt'];
      return this.jwtService.verify(token);
    } catch (error) {
      return true;
    }
  }
}
