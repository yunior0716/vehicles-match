import { PartialType } from '@nestjs/mapped-types';
import { CreateFilterCharacteristicDto } from './create-filter-characteristic.dto';

export class UpdateFilterCharacteristicDto extends PartialType(
  CreateFilterCharacteristicDto,
) {}
