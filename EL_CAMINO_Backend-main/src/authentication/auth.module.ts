import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AuthController } from './auth.controllers';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtStrategy } from './jwt.strategy';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtMiddleware } from './jwt.middleware';

@Module({
     controllers: [AuthController],
     providers:[AuthService, PrismaService, JwtStrategy, UsersService],
     imports:[
          UsersModule,
          PassportModule,
          JwtModule.register({
               secret: process.env.JWT_SECRET,
               signOptions: {
                    expiresIn: process.env.JWT_EXPIRES_IN
               }
          })
     ],
     exports: [AuthService] // Add AuthService here
})
export class AuthModule{
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(JwtMiddleware)
            .forRoutes({ path: '*', method: RequestMethod.ALL }); // Apply the JwtMiddleware to all routes
    }
}