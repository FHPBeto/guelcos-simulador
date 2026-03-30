import { Injectable } from '@nestjs/common';
import { QuotationsRepository } from './quotations.repository';
import { CreateQuotationDto } from './dto/create-quotation.dto';

@Injectable()
export class QuotationsService {
  constructor(private repo: QuotationsRepository) {}

  async simulate(data: CreateQuotationDto) {
    const interestRate = 0.02; 

    const interest = data.amount * interestRate;
    const total = data.amount + interest;
    const installmentValue = total / data.installments;

    return {
      total,
      interest,
      installmentValue,
    };
  }

  async create(data: CreateQuotationDto) {
    const simulation = await this.simulate(data);

    return this.repo.create({
      ...data,
      ...simulation,
    });
  }
}
