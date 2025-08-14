import { Module } from '@nestjs/common';
import { VehiclesModule } from './vehicles/vehicles.module';
import { CharacteristicsModule } from './characteristics/characteristics.module';
import { FiltersModule } from './filters/filters.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CharacteristicsSeed } from './seeds/characteristics.seed';
import { SeedController } from './seed.controller';
import { Characteristic } from './characteristics/entities/characteristic.entity';

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
    TypeOrmModule.forFeature([Characteristic]),
    VehiclesModule,
    CharacteristicsModule,
    FiltersModule,
  ],
  controllers: [SeedController],
  providers: [CharacteristicsSeed],
})
export class AppModule {}
