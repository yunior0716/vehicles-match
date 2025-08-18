import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CharacteristicsSeed } from './seeds/characteristics.seed';
import { FiltersSeedService } from './seeds/filters.seed';
import { VehiclesSeedService } from './seeds/vehicles.seed';
import { FilterDataSeedService } from './seeds/filter-data.seed';

async function runSeed() {
  const app = await NestFactory.createApplicationContext(AppModule);

  console.log('🌱 Iniciando proceso de seed...');

  // Primero ejecutar el seed de filtros (características con IDs específicos)
  const filtersSeed = app.get(FiltersSeedService);
  await filtersSeed.seed();

  // Luego ejecutar los seeds existentes (características adicionales)
  const characteristicsSeed = app.get(CharacteristicsSeed);
  await characteristicsSeed.seed();

  // Ejecutar el seed de vehículos
  const vehiclesSeed = app.get(VehiclesSeedService);
  await vehiclesSeed.seed();

  // Finalmente ejecutar el seed de filtros predefinidos
  const filterDataSeed = app.get(FilterDataSeedService);
  await filterDataSeed.seed();

  console.log('🎉 Proceso de seed completado');
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
