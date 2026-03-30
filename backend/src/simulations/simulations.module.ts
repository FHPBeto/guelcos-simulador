import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service'; 
import { SimulationsRepository } from './simulations.repository';
import { SimulationsService } from './simulations.service';
import { SimulationsController } from './simulations.controller';

@Module({
  controllers: [SimulationsController],
  providers: [SimulationsService, SimulationsRepository, PrismaService],
})
export class SimulationsModule {}