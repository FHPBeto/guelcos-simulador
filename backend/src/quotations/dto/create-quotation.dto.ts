import { IsString, IsNotEmpty } from "class-validator";

export class CreateQuotationDto {
    @IsString()
    @IsNotEmpty()
    companyId!: string;

    @IsString()
    @IsNotEmpty()
    amount!: number;

    @IsString()
    @IsNotEmpty()
    installments!: number;
}