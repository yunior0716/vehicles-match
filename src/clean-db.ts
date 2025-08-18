import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataSource } from 'typeorm';

async function cleanDatabase() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const dataSource = app.get(DataSource);

  console.log('🧹 Limpiando base de datos...');

  try {
    // Limpiar en orden correcto usando TRUNCATE (respetando foreign keys)
    await dataSource.query(
      'TRUNCATE TABLE filter_characteristics RESTART IDENTITY CASCADE',
    );
    console.log('✅ Filter characteristics eliminadas');

    await dataSource.query('TRUNCATE TABLE filters RESTART IDENTITY CASCADE');
    console.log('✅ Filters eliminados');

    await dataSource.query(
      'TRUNCATE TABLE vehicle_characteristics RESTART IDENTITY CASCADE',
    );
    console.log('✅ Vehicle characteristics eliminadas');

    await dataSource.query('TRUNCATE TABLE vehicles RESTART IDENTITY CASCADE');
    console.log('✅ Vehicles eliminados');

    await dataSource.query(
      'TRUNCATE TABLE characteristics RESTART IDENTITY CASCADE',
    );
    console.log('✅ Characteristics eliminadas');

    console.log('🎉 Base de datos limpiada correctamente');
  } catch (error) {
    console.error('❌ Error limpiando base de datos:', error);
  }

  await app.close();
}

cleanDatabase()
  .then(() => {
    console.log('Proceso de limpieza completado');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error en proceso de limpieza:', error);
    process.exit(1);
  });
