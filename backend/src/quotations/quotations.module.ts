import { Module } from '@nestjs/common';
import { QuotationsService } from './quotations.service';
import { QuotationsController } from './quotations.controller';
import { QuotationsRepository } from './quotations.repository';
import { PrismaService } from '../../prisma/prisma.service'; 

@Module({
  controllers: [QuotationsController],
  providers: [QuotationsService, QuotationsRepository, PrismaService],
})
export class QuotationsModule {}