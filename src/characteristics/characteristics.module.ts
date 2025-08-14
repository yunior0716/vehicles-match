import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CharacteristicsService } from './characteristics.service';
import { CharacteristicsController } from './characteristics.controller';
import { Characteristic } from './entities/characteristic.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Characteristic])],
  controllers: [CharacteristicsController],
  providers: [CharacteristicsService],
  exports: [CharacteristicsService, TypeOrmModule],
})
export class CharacteristicsModule {}
