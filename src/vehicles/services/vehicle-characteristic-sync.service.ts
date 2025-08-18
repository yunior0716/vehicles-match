import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehicle } from '../entities/vehicle.entity';
import { VehicleCharacteristic } from '../entities/vehicle-characteristic.entity';
import { Characteristic } from '../../characteristics/entities/characteristic.entity';

// Tipo para los campos mapeables del vehículo
type VehicleField = keyof Pick<
  Vehicle,
  'year' | 'price' | 'fuel' | 'transmission' | 'seats' | 'doors' | 'carrocery'
>;

@Injectable()
export class VehicleCharacteristicSyncService {
  constructor(
    @InjectRepository(Vehicle)
    private vehicleRepository: Repository<Vehicle>,
    @InjectRepository(VehicleCharacteristic)
    private vehicleCharacteristicRepository: Repository<VehicleCharacteristic>,
    @InjectRepository(Characteristic)
    private characteristicRepository: Repository<Characteristic>,
  ) {}

  // Mapeo de campos nativos a nombres de características
  private readonly fieldToCharacteristicMap: Record<VehicleField, string> = {
    year: 'Año',
    price: 'Precio',
    fuel: 'Combustible',
    transmission: 'Transmisión',
    seats: 'Asientos',
    doors: 'Puertas',
    carrocery: 'Carrocería',
  };

  async syncVehicleToCharacteristics(vehicleId: number): Promise<void> {
    const vehicle = await this.vehicleRepository.findOne({
      where: { id: vehicleId },
    });

    if (!vehicle) {
      console.warn(`Vehicle with ID ${vehicleId} not found`);
      return;
    }

    console.log(
      `🔄 Syncing vehicle ${vehicle.brand} ${vehicle.model} to characteristics...`,
    );

    // Para cada campo nativo, crear/actualizar la característica correspondiente
    for (const [field, characteristicName] of Object.entries(
      this.fieldToCharacteristicMap,
    ) as [VehicleField, string][]) {
      const characteristic = await this.characteristicRepository.findOne({
        where: { name: characteristicName },
      });

      if (!characteristic) {
        console.warn(
          `Characteristic '${characteristicName}' not found in database`,
        );
        continue;
      }

      const nativeValue = vehicle[field];
      if (nativeValue !== null && nativeValue !== undefined) {
        // Verificar si ya existe la relación
        let vehicleChar = await this.vehicleCharacteristicRepository.findOne({
          where: {
            vehicleId: vehicleId,
            characteristicId: characteristic.id,
          },
        });

        const valueString = String(nativeValue);

        if (vehicleChar) {
          // Actualizar valor existente
          vehicleChar.value = valueString;
          await this.vehicleCharacteristicRepository.save(vehicleChar);
          console.log(`✅ Updated ${characteristicName}: ${valueString}`);
        } else {
          // Crear nueva relación
          vehicleChar = this.vehicleCharacteristicRepository.create({
            vehicleId: vehicleId,
            characteristicId: characteristic.id,
            value: valueString,
          });
          await this.vehicleCharacteristicRepository.save(vehicleChar);
          console.log(`✅ Created ${characteristicName}: ${valueString}`);
        }
      }
    }
  }

  async syncAllVehicles(): Promise<void> {
    console.log('🔄 Starting sync for all vehicles...');

    const vehicles = await this.vehicleRepository.find();
    console.log(`📋 Found ${vehicles.length} vehicles to sync`);

    for (const vehicle of vehicles) {
      try {
        await this.syncVehicleToCharacteristics(vehicle.id);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : String(error);
        console.error(`❌ Error syncing vehicle ${vehicle.id}:`, errorMessage);
      }
    }

    console.log('🎉 Sync completed for all vehicles');
  }
}
