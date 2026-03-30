import { Body, Controller, Post } from '@nestjs/common';
import { SimulationsService } from './simulations.service';
import { SimulateDto } from './dto/simulate.dto';

@Controller('simulations')
export class SimulationsController {
  constructor(private service: SimulationsService) {}

  @Post()
  simulate(@Body() dto: SimulateDto) {
    return this.service.simulate(dto);
  }
}