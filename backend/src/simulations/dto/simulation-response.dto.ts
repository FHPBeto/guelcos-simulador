import { IsNumber, IsString, IsBoolean, IsNotEmpty } from 'class-validator';

export class SimulationResponseDto {
  @IsBoolean()
  @IsNotEmpty()
  approved!: boolean;

  @IsNumber()
  @IsNotEmpty()
  interestRate!: number;

  @IsNumber()
  @IsNotEmpty()
  total!: number;

  @IsNumber()
  @IsNotEmpty()
  installmentValue!: number;

  @IsString()
  reason?: string;
}
