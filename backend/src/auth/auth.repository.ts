import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AuthRepository {
  constructor(private prisma: PrismaService) {}

  async findAdminByEmail(email: string) {
    return this.prisma.admin.findUnique({
      where: { email },
    });
  }

  async findUserByEEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }
}
