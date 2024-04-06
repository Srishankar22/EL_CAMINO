import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma/prisma.service';

interface CustomRequest extends Request {
  user?: any; // Add this line to indicate that 'user' property may exist on Request
  sessionData?: any; // Add this line to indicate that 'sessionData' property may exist on Request
}

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService, private readonly prismaService: PrismaService) {}

  async use(req: CustomRequest, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];

    if (token) {
      const { user, sessionData } = await this.authService.validateUserByToken(token) as unknown as { user: any, sessionData: any };
      req.user = user;
      req.sessionData = sessionData;

      // Store the session data in the database
      await this.prismaService.sessions.create({
        data: {
          userId: user.id,
          sessionId: sessionData.sessionId,
          // other session-related data
        },
      });
    }

    next();
  }
}