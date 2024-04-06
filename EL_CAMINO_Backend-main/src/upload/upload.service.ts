import { Injectable } from '@nestjs/common';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UploadService {
  private readonly s3Client: S3Client;

  constructor(private readonly configService: ConfigService) {
    this.s3Client = new S3Client({
      region: this.configService.get('AWS_S3_REGION'),
    });
  }

  async uploadVideo(fileName: string, file: Buffer): Promise<string> {
    const params = {
      Bucket: 'video-upload-elcamino',
      Key: fileName,
      Body: file,
    };

    try {
      await this.s3Client.send(new PutObjectCommand(params));
      return `https://video-upload-elcamino.s3.amazonaws.com/${fileName}`;
    } catch (error) {
      console.error('Error uploading video file to S3:', error);
      throw new Error('Failed to upload video file to S3');
    }
  }

  async uploadImage(fileName: string, file: Buffer): Promise<string> {
    const params = {
      Bucket: 'content-upload-elcamino',
      Key: fileName,
      Body: file,
    };

    try {
      await this.s3Client.send(new PutObjectCommand(params));
      return `https://content-upload-elcamino.s3.amazonaws.com/${fileName}`;
    } catch (error) {
      console.error('Error uploading image file to S3:', error);
      throw new Error('Failed to upload image file to S3');
    }
  }
}
