import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module'; // 1. Adicione este import
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    AuthModule, // 2. Adicione aqui na lista de imports
  ],

})
export class AppModule {}
