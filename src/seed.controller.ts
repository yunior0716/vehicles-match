import { Controller, Post } from '@nestjs/common';
import { CharacteristicsSeed } from './seeds/characteristics.seed';

@Controller('seed')
export class SeedController {
  constructor(private readonly characteristicsSeed: CharacteristicsSeed) {}

  @Post('characteristics')
  async seedCharacteristics() {
    await this.characteristicsSeed.seed();
    return { message: 'Características sembradas exitosamente' };
  }
}
