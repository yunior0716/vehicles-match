import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CharacteristicsSeed } from './seeds/characteristics.seed';

async function runSeed() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const characteristicsSeed = app.get(CharacteristicsSeed);
  await characteristicsSeed.seed();

  await app.close();
}

runSeed()
  .then(() => {
    console.log('Seed ejecutado exitosamente');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error ejecutando seed:', error);
    process.exit(1);
  });
