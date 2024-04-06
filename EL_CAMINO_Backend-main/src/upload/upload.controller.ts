import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('video')
  @UseInterceptors(FileInterceptor('file'))
  async uploadVideo(@UploadedFile() file: Express.Multer.File): Promise<string> {
    try {
      const url = await this.uploadService.uploadVideo(file.originalname, file.buffer);
      return url;
    } catch (error) {
      console.error('Error uploading video file:', error);
      throw new Error('Failed to upload video file');
    }
  }

  @Post('image')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@UploadedFile() file: Express.Multer.File): Promise<string> {
    try {
      const url = await this.uploadService.uploadImage(file.originalname, file.buffer);
      return url;
    } catch (error) {
      console.error('Error uploading image file:', error);
      throw new Error('Failed to upload image file');
    }
  }
}
