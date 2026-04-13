import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  console.log("================ STARTING SERVER ================");
  console.log("MONGO_URI:", process.env.MONGO_URI);
  console.log("PORT:", process.env.PORT);

  const app = await NestFactory.create(AppModule);

  // Allow frontend to access backend
  app.enableCors({
    origin: process.env.FRONTEND_URL || "http://localhost:3001",
  });

  await app.listen(process.env.PORT || 3000, '0.0.0.0');
}
bootstrap();
