import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AdminRepository {
  constructor(private prisma: PrismaService) {}

  create(email: string, password: string) {
    return this.prisma.admin.create({ data: { email, password } });
  }

  findByEmail(email: string) {
    return this.prisma.admin.findUnique({ where: { email } });
  }

  findAll() {
    return this.prisma.admin.findMany();
  }
}
