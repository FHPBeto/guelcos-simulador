import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module'; // Importante!

@Module({
  imports: [UserModule], // Aqui o Auth ganha acesso ao seu trabalho no User
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}