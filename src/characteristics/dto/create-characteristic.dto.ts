import { IsIn, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateCharacteristicDto {
  @IsString()
  @MinLength(1)
  name: string;

  @IsIn(['text', 'number', 'decimal', 'boolean', 'date'])
  data_type: string;

  @IsOptional()
  @IsString()
  unit?: string;

  @IsOptional()
  @IsString()
  description?: string;
}
