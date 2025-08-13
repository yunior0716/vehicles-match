import { IsNumber, IsString, MinLength } from 'class-validator';

export class CreateVehicleCharacteristicDto {
  @IsNumber()
  vehicleId: number;

  @IsNumber()
  characteristicId: number;

  @IsString()
  @MinLength(1)
  value: string;
}
