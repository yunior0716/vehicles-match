import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Characteristic } from './entities/characteristic.entity';
import { CreateCharacteristicDto } from './dto/create-characteristic.dto';
import { UpdateCharacteristicDto } from './dto/update-characteristic.dto';
import { VehicleCharacteristic } from '../vehicles/entities/vehicle-characteristic.entity';
import { FilterCharacteristic } from '../filters/entities/filter-characteristic.entity';

@Injectable()
export class CharacteristicsService {
  constructor(
    @InjectRepository(Characteristic)
    private readonly characteristicsRepository: Repository<Characteristic>,
    @InjectRepository(VehicleCharacteristic)
    private readonly vehicleCharacteristicsRepository: Repository<VehicleCharacteristic>,
    @InjectRepository(FilterCharacteristic)
    private readonly filterCharacteristicsRepository: Repository<FilterCharacteristic>,
  ) {}

  async create(
    createCharacteristicDto: CreateCharacteristicDto,
  ): Promise<Characteristic> {
    const characteristic = this.characteristicsRepository.create(
      createCharacteristicDto as Partial<Characteristic>,
    );
    return this.characteristicsRepository.save(characteristic);
  }

  async findAll(): Promise<Characteristic[]> {
    return this.characteristicsRepository.find();
  }

  async findOne(id: number): Promise<Characteristic> {
    const characteristic = await this.characteristicsRepository.findOneBy({
      id,
    });

    if (!characteristic) {
      throw new NotFoundException(`Characteristic with ID ${id} not found`);
    }

    return characteristic;
  }

  async update(
    id: number,
    updateCharacteristicDto: UpdateCharacteristicDto,
  ): Promise<Characteristic> {
    const result = await this.characteristicsRepository.update(
      id,
      updateCharacteristicDto as Partial<Characteristic>,
    );

    if (result.affected === 0) {
      throw new NotFoundException(`Characteristic with ID ${id} not found`);
    }

    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    // Verificar que la característica existe
    const characteristic = await this.characteristicsRepository.findOneBy({
      id,
    });
    if (!characteristic) {
      throw new NotFoundException(`Characteristic with ID ${id} not found`);
    }

    // Eliminar todas las referencias en vehicle_characteristics
    const vehicleCharacteristics =
      await this.vehicleCharacteristicsRepository.find({
        where: { characteristicId: id },
      });

    if (vehicleCharacteristics.length > 0) {
      await this.vehicleCharacteristicsRepository.remove(
        vehicleCharacteristics,
      );
      console.log(
        `Eliminadas ${vehicleCharacteristics.length} referencias en vehicle_characteristics para la característica ID ${id}`,
      );
    }

    // Eliminar todas las referencias en filter_characteristics
    const filterCharacteristics =
      await this.filterCharacteristicsRepository.find({
        where: { characteristicId: id },
      });

    if (filterCharacteristics.length > 0) {
      await this.filterCharacteristicsRepository.remove(filterCharacteristics);
      console.log(
        `Eliminadas ${filterCharacteristics.length} referencias en filter_characteristics para la característica ID ${id}`,
      );
    }

    // Finalmente eliminar la característica
    const result = await this.characteristicsRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Characteristic with ID ${id} not found`);
    }

    console.log(
      `Característica con ID ${id} eliminada exitosamente junto con todas sus referencias`,
    );
  }
}
