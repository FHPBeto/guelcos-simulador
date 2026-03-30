import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

export class QuotationsRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.quotation.create({
      data,
    });
  }
}
