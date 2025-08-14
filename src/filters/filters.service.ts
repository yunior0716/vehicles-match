import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFilterDto } from './dto/create-filter.dto';
import { UpdateFilterDto } from './dto/update-filter.dto';
import { Filter } from './entities/filter.entity';
import { FilterCharacteristic } from './entities/filter-characteristic.entity';

@Injectable()
export class FiltersService {
  constructor(
    @InjectRepository(Filter)
    private filtersRepository: Repository<Filter>,
    @InjectRepository(FilterCharacteristic)
    private filterCharacteristicsRepository: Repository<FilterCharacteristic>,
  ) {}

  async create(createFilterDto: CreateFilterDto): Promise<Filter> {
    const filter = this.filtersRepository.create(createFilterDto);
    return this.filtersRepository.save(filter);
  }

  async findAll(): Promise<Filter[]> {
    return this.filtersRepository.find({
      relations: [
        'filterCharacteristics',
        'filterCharacteristics.characteristic',
      ],
    });
  }

  async findOne(id: string): Promise<Filter> {
    const filter = await this.filtersRepository.findOne({
      where: { id },
      relations: [
        'filterCharacteristics',
        'filterCharacteristics.characteristic',
      ],
    });

    if (!filter) {
      throw new NotFoundException(`Filter with ID ${id} not found`);
    }

    return filter;
  }

  async update(id: string, updateFilterDto: UpdateFilterDto): Promise<Filter> {
    await this.filtersRepository.update(id, updateFilterDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const result = await this.filtersRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Filter with ID ${id} not found`);
    }
  }

  async addCharacteristicToFilter(
    filterId: string,
    characteristicId: number,
    minValue?: string,
    maxValue?: string,
    exactValue?: string,
  ): Promise<FilterCharacteristic> {
    // Verificar que el filtro existe
    await this.findOne(filterId);

    const filterCharacteristic = this.filterCharacteristicsRepository.create({
      filter: { id: filterId },
      characteristic: { id: characteristicId },
      minValue,
      maxValue,
      exactValue,
    });

    return this.filterCharacteristicsRepository.save(filterCharacteristic);
  }

  async getFilterCharacteristics(
    filterId: string,
  ): Promise<FilterCharacteristic[]> {
    return this.filterCharacteristicsRepository.find({
      where: { filter: { id: filterId } },
      relations: ['characteristic'],
    });
  }

  async removeCharacteristicFromFilter(id: string): Promise<void> {
    const result = await this.filterCharacteristicsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(
        `FilterCharacteristic with ID ${id} not found`,
      );
    }
  }
}
