import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "../auth.service";

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private authService: AuthService) {}

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();

        const authHeader = request.headers['authorization'];

        if (!authHeader) {
            throw new UnauthorizedException('No token provided');
        }

        const token = authHeader.split('')[1];

        if (!token) {
            throw new UnauthorizedException('Invalid token format');
        }

        const decoded = this.authService.verifyToken(token);

        request.user = decoded;

        return true;
    }
}