import { Decimal } from "@prisma/client/runtime/library";
import { IsDecimal, IsInt, IsOptional, IsString } from "class-validator";

export class UpdateCourseDto {

    @IsString()
    @IsOptional()
    courseDomain?: string;
    
    @IsString()
    @IsOptional()
    courseName?: string;
    
    @IsString()
    @IsOptional()
    description?: string;
    
    @IsInt()
    @IsOptional()
    value?: number;

    @IsInt()
    @IsOptional()
    rating?: Decimal;
    
    @IsInt()
    @IsOptional()
    ownerId?: number;
    
    @IsString()
    @IsOptional()
    thumbnail?: string;
    
    @IsString()
    @IsOptional()
    video?: string;
    
    @IsInt()
    @IsOptional()
    views?: number;
    
    @IsInt()
    @IsOptional()
    likes?: number;
    
    @IsString()
    @IsOptional()
    comments?: string;
    
    @IsString()
    @IsOptional()
    keywords?: string;
}