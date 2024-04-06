import { ExecutionContext, UnauthorizedException } from "@nestjs/common"
import { AuthGuard } from "@nestjs/passport"
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt'){

     canActivate(context: ExecutionContext){
          return super.canActivate(context)
     }

     handleRequest(err, user, info, context) {
          if (err || !user) {
              console.error(err || 'User not found in JWT token');
              throw err || new UnauthorizedException('Unauthorized');
          }

          // Attach the session data to the user object
          const request = context.switchToHttp().getRequest();
          user.sessionData = request.sessionData;

          return user;
     }
}