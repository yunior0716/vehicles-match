import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CharacteristicsService } from './characteristics.service';
import { CharacteristicsController } from './characteristics.controller';
import { Characteristic } from './entities/characteristic.entity';
import { VehicleCharacteristic } from '../vehicles/entities/vehicle-characteristic.entity';
import { FilterCharacteristic } from '../filters/entities/filter-characteristic.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Characteristic,
      VehicleCharacteristic,
      FilterCharacteristic,
    ]),
  ],
  controllers: [CharacteristicsController],
  providers: [CharacteristicsService],
  exports: [CharacteristicsService, TypeOrmModule],
})
export class CharacteristicsModule {}
