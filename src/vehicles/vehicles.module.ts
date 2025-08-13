import { Module } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { VehiclesController } from './vehicles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehicle } from './entities/vehicle.entity';
import { VehicleCharacteristic } from './entities/vehicle-characteristic.entity';

@Module({
  controllers: [VehiclesController],
  providers: [VehiclesService],
  imports: [TypeOrmModule.forFeature([Vehicle, VehicleCharacteristic])],
  exports: [VehiclesService],
})
export class VehiclesModule {}
