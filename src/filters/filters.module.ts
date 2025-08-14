import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FiltersService } from './filters.service';
import { FiltersController } from './filters.controller';
import { Filter } from './entities/filter.entity';
import { FilterCharacteristic } from './entities/filter-characteristic.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Filter, FilterCharacteristic])],
  controllers: [FiltersController],
  providers: [FiltersService],
  exports: [FiltersService],
})
export class FiltersModule {}
