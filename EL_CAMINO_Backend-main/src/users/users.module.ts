import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtMiddleware } from 'src/authentication/jwt.middleware'; // Import your JwtMiddleware
import { AuthService } from 'src/authentication/auth.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
    controllers: [UsersController],
    providers: [UsersService, PrismaService, AuthService],
    imports: [
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: {
                expiresIn: process.env.JWT_EXPIRES_IN
            }
        })
    ]
})
export class UsersModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(JwtMiddleware)
            .forRoutes({ path: '*', method: RequestMethod.ALL }); // Apply the JwtMiddleware to all routes
    }
}
