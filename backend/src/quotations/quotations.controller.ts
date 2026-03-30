import { Body, Controller, Post } from '@nestjs/common';
import { QuotationsService } from './quotations.service';
import { CreateQuotationDto } from './dto/create-quotation.dto';

@Controller('quotations')
export class QuotationsController {
  constructor(private service: QuotationsService) {}

  @Post('simulate')
  simulate(@Body() dto: CreateQuotationDto) {
    return this.service.simulate(dto);
  }

  @Post()
  create(@Body() dto: CreateQuotationDto) {
    return this.service.create(dto);
  }
}
