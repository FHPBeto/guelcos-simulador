import { IsString, IsNotEmpty, IsNumber } from "class-validator";

export class SimulateDto {
    @IsString()
    @IsNotEmpty()
    companyId!: string

    @IsNumber()
    @IsNotEmpty()
    amount!: number

    @IsNumber()
    @IsNotEmpty()
    installments!: number
}