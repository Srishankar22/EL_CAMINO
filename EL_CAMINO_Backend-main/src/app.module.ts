import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoursesModule } from './courses/courses.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './authentication/auth.module';
import { RatingModule } from './rating/rating.module';
import { UploadModule } from './upload/upload.module';
import { ConfigModule } from '@nestjs/config';
import { EnrollmentModule } from './Enrollment/enrollment.module';
import { CorsMiddleware } from './middleware/cors.middleware'; // Import the CorsMiddleware

@Module({
  imports: [
    CoursesModule,
    UsersModule,
    AuthModule,
    UploadModule,
    RatingModule,
    EnrollmentModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  // Implement the configure method of NestModule to apply middleware
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorsMiddleware).forRoutes('*'); // Apply CorsMiddleware to all routes
  }
}
