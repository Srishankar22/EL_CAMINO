// app.module.ts

import { Module } from '@nestjs/common';
import { RatingController } from './rating.controller';
import { RatingService } from './rating.service';
import { CoursesModule } from 'src/courses/courses.module';

@Module({
  imports: [CoursesModule],
  controllers: [RatingController],
  providers: [RatingService],
})
export class RatingModule {}
