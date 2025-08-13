import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { CreateVehicleCharacteristicDto } from './dto/create-vehicle-characteristic.dto';
import { UpdateVehicleCharacteristicDto } from './dto/update-vehicle-characteristic.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Vehicle } from './entities/vehicle.entity';
import { VehicleCharacteristic } from './entities/vehicle-characteristic.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VehiclesService {
  constructor(
    @InjectRepository(Vehicle)
    private vehiclesRepository: Repository<Vehicle>,
    @InjectRepository(VehicleCharacteristic)
    private vehicleCharacteristicsRepository: Repository<VehicleCharacteristic>,
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
}
