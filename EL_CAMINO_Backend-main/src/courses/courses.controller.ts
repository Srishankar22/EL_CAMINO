import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Put, UsePipes, ValidationPipe } from "@nestjs/common";
import { CoursesService } from "./courses.service";
import { CreateCourseDto } from "./dtos/CreateCourse.dto";

import { JwtAuthGuard } from "src/authentication/auth.guard";
import { UseGuards } from '@nestjs/common';
import { Users } from "src/users/users.model";


import { UpdateCourseDto } from "./dtos/UpdateCourseDto";


//import { Users } from "src/users/users.model";
@Controller('courses')
export class CoursesController {
    constructor(private coursesService: CoursesService) {}

    @Post()
    @UsePipes(ValidationPipe)
    createCourse(@Body() createCourseDto: CreateCourseDto, @Body('username') username: string): Promise<any> {
        return this.coursesService.createCourse(createCourseDto, username);
    }

    @Get()
    getCourse(){
        console.log('hits the endpoint')
        
        return this.coursesService.getCourse()
    }

    @Get(':courseId')
    getCourseById(@Param('courseId', ParseIntPipe) courseId: number){
        return this.coursesService.getCourseById(courseId)
    }

    @Put(':courseid')
    updateCourse(
        @Param('courseid') courseId: string, // Change ParseIntPipe to regular string
        @Body() updateCourseDto: UpdateCourseDto,
    ) {
        return this.coursesService.updateCourse(parseInt(courseId), updateCourseDto); // Parse courseId as number here
    }
    

// @Post(':id/like')
//   async likeCourse(@Param('id') courseId: number): Promise<void> {
//     await this.coursesService.likeCourse(courseId);
//   }
//   @Post(':id/unlike')
//   async unlikeCourse(@Param('id') courseId: number): Promise<void> {
//     await this.coursesService.unlikeCourse(courseId);
//   }

//   @Get(':id')
//   @UseGuards(JwtAuthGuard)
//   async getCourseDetails(@Req() req): Promise<void> {
//     const userId = req.user.id;

    // Logic to fetch video details and check if the user has liked the video
    // Return response
//   }

//     @UseGuards(JwtAuthGuard)
//     @Post(':courseId/unlock')
//     async unlockCourse(@Param('courseId', ParseIntPipe) courseId: number, @Users() user: Users): Promise<void> {
//         await this.coursesService.unlockCourse(usersId, courseId);
//     }
 }

