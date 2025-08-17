import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { CreateVehicleCharacteristicDto } from './dto/create-vehicle-characteristic.dto';
import { UpdateVehicleCharacteristicDto } from './dto/update-vehicle-characteristic.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Vehicle } from './entities/vehicle.entity';
import { VehicleCharacteristic } from './entities/vehicle-characteristic.entity';
import { Repository } from 'typeorm';
import { FilterCharacteristic } from '../filters/entities/filter-characteristic.entity';
import { Filter } from '../filters/entities/filter.entity';

@Injectable()
export class VehiclesService {
  constructor(
    @InjectRepository(Vehicle)
    private vehiclesRepository: Repository<Vehicle>,
    @InjectRepository(VehicleCharacteristic)
    private vehicleCharacteristicsRepository: Repository<VehicleCharacteristic>,
    @InjectRepository(FilterCharacteristic)
    private filterCharacteristicsRepository: Repository<FilterCharacteristic>,
    @InjectRepository(Filter)
    private filtersRepository: Repository<Filter>,
  ) {}

  // Vehicle CRUD operations
  async create(createVehicleDto: CreateVehicleDto): Promise<Vehicle> {
    const vehicle = this.vehiclesRepository.create(createVehicleDto);
    return this.vehiclesRepository.save(vehicle);
  }

  async findAll(): Promise<Vehicle[]> {
    return this.vehiclesRepository.find({
      relations: [
        'vehicleCharacteristics',
        'vehicleCharacteristics.characteristic',
      ],
    });
  }

  async findOne(id: number): Promise<Vehicle> {
    const vehicle = await this.vehiclesRepository.findOne({
      where: { id },
      relations: [
        'vehicleCharacteristics',
        'vehicleCharacteristics.characteristic',
      ],
    });

    if (!vehicle) {
      throw new NotFoundException(`Vehicle with ID ${id} not found`);
    }

    return vehicle;
  }

  async update(
    id: number,
    updateVehicleDto: UpdateVehicleDto,
  ): Promise<Vehicle> {
    await this.vehiclesRepository.update(id, updateVehicleDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.vehiclesRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Vehicle with ID ${id} not found`);
    }
  }

  // Vehicle-Characteristic relationship operations (características específicas de cada vehículo)
  async addCharacteristicToVehicle(
    createVehicleCharacteristicDto: CreateVehicleCharacteristicDto,
  ): Promise<VehicleCharacteristic> {
    const vehicleCharacteristic = this.vehicleCharacteristicsRepository.create(
      createVehicleCharacteristicDto,
    );
    return this.vehicleCharacteristicsRepository.save(vehicleCharacteristic);
  }

  async findVehicleCharacteristics(
    vehicleId: number,
  ): Promise<VehicleCharacteristic[]> {
    return this.vehicleCharacteristicsRepository.find({
      where: { vehicleId },
      relations: ['characteristic'],
    });
  }

  async findOneVehicleCharacteristic(
    id: number,
  ): Promise<VehicleCharacteristic> {
    const vehicleCharacteristic =
      await this.vehicleCharacteristicsRepository.findOne({
        where: { id },
        relations: ['vehicle', 'characteristic'],
      });

    if (!vehicleCharacteristic) {
      throw new NotFoundException(
        `Vehicle characteristic with ID ${id} not found`,
      );
    }

    return vehicleCharacteristic;
  }

  async updateVehicleCharacteristic(
    id: number,
    updateVehicleCharacteristicDto: UpdateVehicleCharacteristicDto,
  ): Promise<VehicleCharacteristic> {
    await this.vehicleCharacteristicsRepository.update(
      id,
      updateVehicleCharacteristicDto,
    );
    return this.findOneVehicleCharacteristic(id);
  }

  async removeVehicleCharacteristic(id: number): Promise<void> {
    const result = await this.vehicleCharacteristicsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(
        `Vehicle characteristic with ID ${id} not found`,
      );
    }
  }

  // Método para filtrar vehículos usando múltiples filtros
  async findVehiclesByFilters(filterIds: string[]): Promise<Vehicle[]> {
    if (filterIds.length === 0) {
      return this.findAll();
    }

    // Obtener todas las características de los filtros
    const filterCharacteristics =
      await this.filterCharacteristicsRepository.find({
        where: filterIds.map((id) => ({ filterId: id })),
        relations: ['characteristic'],
      });

    if (filterCharacteristics.length === 0) {
      return this.findAll();
    }

    // Obtener todos los vehículos con sus características
    const allVehicles = await this.findAll();

    // Filtrar vehículos que cumplan con todas las condiciones de los filtros
    const filteredVehicles = allVehicles.filter((vehicle) => {
      return filterCharacteristics.every((filterChar) => {
        // Buscar la característica correspondiente en el vehículo
        const vehicleChar = vehicle.vehicleCharacteristics?.find(
          (vc: any) => vc.characteristicId === filterChar.characteristicId,
        );

        if (!vehicleChar) {
          return false;
        }

        // Verificar si el valor del vehículo cumple con el filtro
        return this.checkCharacteristicMatch(
          vehicleChar.value,
          filterChar.minValue,
          filterChar.maxValue,
          filterChar.exactValue,
          filterChar.characteristic?.data_type,
        );
      });
    });

    return filteredVehicles;
  }

  private checkCharacteristicMatch(
    vehicleValue: string,
    minValue?: string,
    maxValue?: string,
    exactValue?: string,
    dataType?: string,
  ): boolean {
    if (exactValue) {
      return vehicleValue === exactValue;
    }

    if (dataType === 'number' || dataType === 'decimal') {
      const numVehicleValue = parseFloat(vehicleValue);

      if (minValue && numVehicleValue < parseFloat(minValue)) {
        return false;
      }

      if (maxValue && numVehicleValue > parseFloat(maxValue)) {
        return false;
      }

      return true;
    }

    // Para strings y otros tipos, usar comparación exacta si no hay rango
    if (minValue || maxValue) {
      return (
        vehicleValue >= (minValue || '') && vehicleValue <= (maxValue || 'zzz')
      );
    }

    return true;
  }
}
