import {
  IsString,
  IsOptional,
  MinLength,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateFilterCharacteristicDto } from './create-filter-characteristic.dto';

export class CreateFilterDto {
  @IsString()
  @MinLength(1)
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateFilterCharacteristicDto)
  characteristics?: CreateFilterCharacteristicDto[];
}
