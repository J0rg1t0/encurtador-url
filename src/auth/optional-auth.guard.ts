import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class OptionalAuthGuard extends AuthGuard('jwt') {

    handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const authorization = request.headers.authorization;
        if (!authorization) {
            throw new UnauthorizedException();
        }
        const [bearer, token] = authorization.split(' ');

        if (bearer !== 'Bearer' || !token || (err || info)) {
            return null;
        }

        console.log('user', user);
        return user;
    }
}