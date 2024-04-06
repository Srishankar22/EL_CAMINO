import { Inject, Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { UsersService } from "src/users/users.service"; // Import UsersService
import { CreateCourseDto } from "./dtos/CreateCourse.dto";

@Injectable()
export class CoursesService {
    constructor(
        private prisma: PrismaService,
        private readonly usersService: UsersService // Include UsersService in the constructor
    ) {}

    async createCourse(data: Prisma.CourseCreateInput, username: string): Promise<any> {

        const user = await this.usersService.findOne(username);

        const newPoints = user.points + 50
        // Update user points
        await this.usersService.updateUserPoints(username, newPoints);
        
        // Create the course
        return this.prisma.course.create({
            data: {
                courseDomain: data.courseDomain,
                courseName: data.courseName,
                description: data.description,
                value: data.value,
                rating: data.rating,
                ownerId: data.ownerId,
                thumbnail: data.thumbnail,
                video: data.video,
                views: data.views,
                likes: data.likes,
                comments: data.comments,
                keywords: data.keywords
            }
        });
    }

    getCourse() {
        return this.prisma.course.findMany();
    }

    getCourseById(courseId: number) {
        return this.prisma.course.findUnique({ where: { courseId: courseId } });
    }

    async updateCourse(courseId: number, data: Prisma.CourseUpdateInput) {
        return this.prisma.course.update({ where: { courseId }, data });
    }

}
