// enrollment.controller.ts

import { Controller, Get, Query, Post, Body, Put } from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';
import { EnrollmentDto } from './dtos/enrollment.dto';

@Controller('api/enrollment')
export class EnrollmentController {
    constructor(private readonly enrollmentService: EnrollmentService) {}

    @Get('check')
    async checkEnrollment(
        @Query('userId') userId: string,
        @Query('courseId') courseId: string,
    ): Promise<{ enrolled: boolean }> {
        const enrolled = await this.enrollmentService.checkEnrollment(
            parseInt(userId, 10),
            parseInt(courseId, 10),
        );
        return { enrolled };
    }


    @Post()
    async createEnrollment(
        @Body() createEnrollmentDto: EnrollmentDto, // Use the DTO to handle request body
    ): Promise<{ success: boolean }> {
        await this.enrollmentService.createEnrollment(createEnrollmentDto);
        return { success: true };
    }


    @Get('liked-status') // Define a new endpoint for liked status
    async getEnrollmentLikedStatus(
        @Query('userId') userId: string,
        @Query('courseId') courseId: string,
    ): Promise<{ liked: boolean }> {
        const liked = await this.enrollmentService.getEnrollmentLikedStatus(
            parseInt(userId, 10),
            parseInt(courseId, 10),
        );
        return { liked };
    }

    @Put('toggle-like') // Use PUT method for updating the liked status
    async toggleEnrollmentLike(
        @Body() enrollmentDto: EnrollmentDto,
    ): Promise<{ liked: boolean }> {
        const { userId, courseId } = enrollmentDto;
        const liked = await this.enrollmentService.toggleEnrollmentLike(userId, courseId);
        return { liked };
    }

}
