import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class SimulationsRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.simulation.create({ data });
  }

  async findByCompany(companyId: string) {
    return this.prisma.simulation.findMany({
      where: { companyId },
      orderBy: { createdAt: 'desc' },
    });
  }
}
