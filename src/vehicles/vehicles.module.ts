import { Module } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { VehiclesController } from './vehicles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehicle } from './entities/vehicle.entity';
import { VehicleCharacteristic } from './entities/vehicle-characteristic.entity';
import { FilterCharacteristic } from '../filters/entities/filter-characteristic.entity';
import { Filter } from '../filters/entities/filter.entity';

@Module({
  controllers: [VehiclesController],
  providers: [VehiclesService],
  imports: [
    TypeOrmModule.forFeature([
      Vehicle,
      VehicleCharacteristic,
      FilterCharacteristic,
      Filter,
    ]),
  ],
  exports: [VehiclesService],
})
export class VehiclesModule {}
