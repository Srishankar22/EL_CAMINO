// enrollment.service.ts

import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Enrollment } from "@prisma/client";
import { EnrollmentDto } from "./dtos/enrollment.dto";

@Injectable()
export class EnrollmentService {
    constructor(private readonly prisma: PrismaService) {}

    async checkEnrollment(userId: number, courseId: number): Promise<boolean> {
        const enrollment = await this.prisma.enrollment.findUnique({
            where: {
                userId_courseId: {
                    userId,
                    courseId,
                },
            },
        });
        return !!enrollment;
    }

    async createEnrollment(createEnrollmentDto: EnrollmentDto): Promise<void> {
        const { userId, courseId } = createEnrollmentDto;
        await this.prisma.enrollment.create({
            data: {
                userId,
                courseId,
            },
        });
    }

    async getEnrollmentLikedStatus(userId: number, courseId: number): Promise<boolean> {
        const enrollment = await this.prisma.enrollment.findUnique({
            where: {
                userId_courseId: {
                    userId,
                    courseId,
                },
            },
            select: {
                liked: true, // Select the liked column only
            },
        });
        return enrollment?.liked || false; // Return liked value if it exists, otherwise return false
    }

    async toggleEnrollmentLike(userId: number, courseId: number): Promise<boolean> {
        
        const enrollment = await this.prisma.enrollment.findUnique({
            where: {
                userId_courseId: {
                    userId,
                    courseId,
                },
            },
        });
        if (!enrollment) {
            throw new Error("Enrollment not found");
        }
        const updatedEnrollment = await this.prisma.enrollment.update({
            where: {
                userId_courseId: {
                    userId,
                    courseId,
                },
            },
            data: {
                liked: !enrollment.liked, // Toggle the value
            },
        });
        return updatedEnrollment.liked;
    }

}
