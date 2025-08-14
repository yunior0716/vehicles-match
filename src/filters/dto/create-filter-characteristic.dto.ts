import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateFilterCharacteristicDto {
  @IsNumber()
  characteristicId: number;

  @IsOptional()
  @IsString()
  minValue?: string;

  @IsOptional()
  @IsString()
  maxValue?: string;

  @IsOptional()
  @IsString()
  exactValue?: string;
}
