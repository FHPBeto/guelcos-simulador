import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository'; // 1. Importa o novo repositório
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [
    UserService, 
    UserRepository // 2. Adiciona aqui para o NestJS reconhecer
  ],
  exports: [UserRepository], // 3. Exporta para que Credits e Payments possam usar depois
})
export class UserModule {}