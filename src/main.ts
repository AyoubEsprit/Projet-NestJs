// src/main.ts
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Validation globale : transforme et valide les DTOs
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,          // supprime les propriétés non définies dans le DTO
    forbidNonWhitelisted: true, // renvoie une erreur si des props inconnues sont présentes
    transform: true,          // transforme les payloads vers les types attendus
  }));

  await app.listen(3000);
  console.log('Server running on http://localhost:3000');
}
bootstrap();
