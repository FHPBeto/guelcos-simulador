import { IsNotEmpty, IsNumber } from 'class-validator';

export class ResponseQuotationDto {
  @IsNumber()
  @IsNotEmpty()
  id: number | undefined;

  @IsNumber()
  @IsNotEmpty()
  interest: number | undefined;

  @IsNumber()
  @IsNotEmpty()
  installments: number | undefined;
}
