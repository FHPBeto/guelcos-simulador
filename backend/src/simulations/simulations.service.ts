import { Injectable } from '@nestjs/common';
import { SimulateDto } from './dto/simulate.dto';

@Injectable()
export class SimulationsService {
  async simulate(data: SimulateDto) {
    const isHighRisk = data.amount > 10000;

    if (isHighRisk) {
      return {
        approved: false,
        interestRate: 0,
        total: 0,
        installmentValue: 0,
        reason: 'Amount too high for automatic approval',
      };
    }

    const interestRate = this.getInterestRate(data.installments);

    const interest = data.amount * interestRate;
    const total = data.amount + interest;
    const installmentValue = total / data.installments;

    return {
      approved: true,
      interestRate,
      total,
      installmentValue,
    };
  }

  private getInterestRate(installments: number): number {
    if (installments <= 6) return 0.015;
    if (installments <= 12) return 0.02;
    return 0.03;
  }
}
