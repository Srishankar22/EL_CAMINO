import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS to allow requests from different origins
  app.enableCors();

  const port = process.env.PORT || 3000; // Use PORT provided by Railway or default to 3000
  await app.listen(port, '0.0.0.0'); // Listen on provided port and '0.0.0.0'
  //await app.listen(3000); //to check in the local machine
}

bootstrap();
