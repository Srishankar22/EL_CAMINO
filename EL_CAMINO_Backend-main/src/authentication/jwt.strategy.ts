import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  
  constructor(private readonly prismaService: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: { username: string, sessionId: string }) {
    const user = await this.prismaService.users.findUnique({
      where: {
        username: payload.username,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }

    // Store the session data in the database
    await this.prismaService.sessions.create({
      data: {
        userId: user.id,
        sessionId: payload.sessionId,
        // other session-related data
      },
    });

    return user;
  }
}