import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // 1. Habilita o CORS primeiro
  app.enableCors(); 
  
  // 2. Liga APENAS na porta 3000 (remova a linha do listen(300))
  await app.listen(process.env.PORT ?? 3000);
  
  console.log("🚀 Backend rodando em: http://localhost:3000");
}
bootstrap();
