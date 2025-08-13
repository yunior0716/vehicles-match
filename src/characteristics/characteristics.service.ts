import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Characteristic } from './entities/characteristic.entity';
import { CreateCharacteristicDto } from './dto/create-characteristic.dto';
import { UpdateCharacteristicDto } from './dto/update-characteristic.dto';

@Injectable()
export class CharacteristicsService {
  constructor(
    @InjectRepository(Characteristic)
    private readonly characteristicsRepository: Repository<Characteristic>,
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
    const result = await this.characteristicsRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Characteristic with ID ${id} not found`);
    }
  }
}
