import { Decimal } from "@prisma/client/runtime/library";
import { IsDecimal, IsInt, IsString } from "class-validator";

export class CreateCourseDto {

    @IsString()
    courseDomain: string;
    
    @IsString()
    courseName: string;
    
    @IsString()
    description: string;
    
    @IsInt()
    value: number;

    @IsInt()
    rating: Decimal;
    
    @IsInt()
    ownerId: number;
    
    @IsString()
    thumbnail: string;
    
    @IsString()
    video: string;
    
    @IsInt()
    views: number;
    
    @IsInt()
    likes: number;
    
    @IsString()
    comments: string;
    
    @IsString()
    keywords: string;
}