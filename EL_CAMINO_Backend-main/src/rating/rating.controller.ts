import { Controller, Get, Query, Param, Body, Put } from '@nestjs/common';
import { RatingService } from './rating.service';

@Controller('ratings')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @Put('/:courseId/updateRating')
  async updateCourseRating(
    @Param('courseId') courseId: number,
    @Body() data: { likes: number, views: number }
  ): Promise<void> {
    const { likes, views } = data;
    await this.ratingService.updateCompositeScore(likes, views, courseId);
  }
  
}
