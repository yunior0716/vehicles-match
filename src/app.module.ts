import { Module } from '@nestjs/common';
import { VehiclesModule } from './vehicles/vehicles.module';
import { CharacteristicsModule } from './characteristics/characteristics.module';
import { FiltersModule } from './filters/filters.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CharacteristicsSeed } from './seeds/characteristics.seed';
import { FiltersSeedService } from './seeds/filters.seed';
import { VehiclesSeedService } from './seeds/vehicles.seed';
import { FilterDataSeedService } from './seeds/filter-data.seed';
import { SeedController } from './seed.controller';
import { Characteristic } from './characteristics/entities/characteristic.entity';
import { Vehicle } from './vehicles/entities/vehicle.entity';
import { VehicleCharacteristic } from './vehicles/entities/vehicle-characteristic.entity';
import { Filter } from './filters/entities/filter.entity';
import { FilterCharacteristic } from './filters/entities/filter-characteristic.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT!,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true,
    }),
    TypeOrmModule.forFeature([
      Characteristic,
      Vehicle,
      VehicleCharacteristic,
      Filter,
      FilterCharacteristic,
    ]),
    VehiclesModule,
    CharacteristicsModule,
    FiltersModule,
  ],
  controllers: [SeedController],
  providers: [
    CharacteristicsSeed,
    FiltersSeedService,
    VehiclesSeedService,
    FilterDataSeedService,
  ],
})
export class AppModule {}
