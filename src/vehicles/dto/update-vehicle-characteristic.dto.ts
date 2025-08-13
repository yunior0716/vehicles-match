import { PartialType } from '@nestjs/mapped-types';
import { CreateVehicleCharacteristicDto } from './create-vehicle-characteristic.dto';

export class UpdateVehicleCharacteristicDto extends PartialType(
  CreateVehicleCharacteristicDto,
) {}
