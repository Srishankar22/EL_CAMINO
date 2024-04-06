import { Inject, Injectable } from '@nestjs/common';
import { Course } from '@prisma/client'; // Import Course model
import { CoursesModule } from 'src/courses/courses.module';
import { CoursesService } from 'src/courses/courses.service';

@Injectable()
export class RatingService {

  constructor(
    @Inject(CoursesService)
    private readonly courseService: CoursesService,
  ){}

  async updateCompositeScore(likes: number, views: number, courseId: number) {
    courseId = typeof courseId === 'string' ? parseInt(courseId) : courseId;

    const courses: Course[] = await this.courseService.getCourse();
    console.log(courses);

    const likeWeight = 0.7000; 
    const viewWeight = 0.3000;

    let thisVideoRating: number = likes * likeWeight + views * viewWeight; // Initialize with 0
    let highestRating: number = 0;

    courses.forEach(item => {
      const videoLikes = item.likes
      const videoView = item.views

      const currentVideoRating = videoLikes * likeWeight + videoView * viewWeight
      
      if(highestRating < currentVideoRating){
        highestRating = currentVideoRating;
      }
    })

    if(highestRating < thisVideoRating){
      highestRating = thisVideoRating;
    }


    const normalizedRating = thisVideoRating / highestRating

    try{
      const updatedCourse = await this.courseService.updateCourse(courseId, {rating: normalizedRating});
      console.log('Course rating updated:', updatedCourse)
    } catch(error){
      console.log('Error updating course:', error)
    }

  }
}
