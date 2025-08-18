import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehicle } from '../vehicles/entities/vehicle.entity';
import { VehicleCharacteristic } from '../vehicles/entities/vehicle-characteristic.entity';
import { Characteristic } from '../characteristics/entities/characteristic.entity';

interface VehicleCharacteristicData {
  characteristicId: number;
  value: string;
}

interface VehicleData {
  brand: string;
  model: string;
  year: number;
  fuel: string;
  transmission: string;
  seats: number;
  doors: number;
  carrocery: string;
  price: number;
  image: string;
  description: string;
  characteristics?: VehicleCharacteristicData[];
}

@Injectable()
export class VehiclesSeedService {
  constructor(
    @InjectRepository(Vehicle)
    private vehicleRepository: Repository<Vehicle>,
    @InjectRepository(VehicleCharacteristic)
    private vehicleCharacteristicRepository: Repository<VehicleCharacteristic>,
    @InjectRepository(Characteristic)
    private characteristicRepository: Repository<Characteristic>,
  ) {}

  async seed(): Promise<void> {
    console.log('🚗 Iniciando seed de vehículos...');

    // Verificar si ya existen vehículos
    const existingVehicles = await this.vehicleRepository.count();
    if (existingVehicles > 0) {
      console.log(
        '⚠️ Ya existen vehículos en la base de datos. Saltando seed...',
      );
      return;
    }

    try {
      // Importar datos desde el dataset
      const dataset = (await import('../../dataset.js')) as {
        vehiclesData: VehicleData[];
      };
      const { vehiclesData } = dataset;

      let vehicleCount = 0;
      let characteristicCount = 0;

      for (const vehicleData of vehiclesData) {
        try {
          // Extraer características del vehículo
          const { characteristics, ...vehicleInfo } = vehicleData;

          // Crear el vehículo
          const vehicle = this.vehicleRepository.create(vehicleInfo);
          const savedVehicle = await this.vehicleRepository.save(vehicle);
          vehicleCount++;

          // Crear las características del vehículo si existen
          if (characteristics) {
            for (const char of characteristics) {
              // Verificar que la característica existe
              const characteristic =
                await this.characteristicRepository.findOne({
                  where: { id: char.characteristicId },
                });

              if (characteristic) {
                const vehicleCharacteristic =
                  this.vehicleCharacteristicRepository.create({
                    vehicleId: savedVehicle.id,
                    characteristicId: char.characteristicId,
                    value: char.value,
                  });
                await this.vehicleCharacteristicRepository.save(
                  vehicleCharacteristic,
                );
                characteristicCount++;
              } else {
                console.warn(
                  `⚠️ Característica ${char.characteristicId} no encontrada para ${vehicleInfo.brand} ${vehicleInfo.model}`,
                );
              }
            }
          }

          console.log(`✅ Creado: ${vehicleInfo.brand} ${vehicleInfo.model}`);
        } catch (error) {
          console.error(
            `❌ Error creando vehículo ${vehicleData.brand} ${vehicleData.model}:`,
            error,
          );
        }
      }

      console.log(
        `🎉 Seed de vehículos completado: ${vehicleCount} vehículos y ${characteristicCount} características creadas`,
      );
    } catch (error) {
      console.error('❌ Error importando dataset:', error);
    }
  }
}
