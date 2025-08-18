import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Filter } from '../filters/entities/filter.entity';
import { FilterCharacteristic } from '../filters/entities/filter-characteristic.entity';

interface FilterCharacteristicData {
  characteristicId: number;
  value?: string;
  minValue?: string;
  maxValue?: string;
}

interface FilterData {
  name: string;
  description: string;
  characteristics: FilterCharacteristicData[];
}

@Injectable()
export class FilterDataSeedService {
  constructor(
    @InjectRepository(Filter)
    private filterRepository: Repository<Filter>,
    @InjectRepository(FilterCharacteristic)
    private filterCharacteristicRepository: Repository<FilterCharacteristic>,
  ) {}

  async seed(): Promise<void> {
    console.log('🔍 Iniciando seed de filtros predefinidos...');

    // Verificar si ya existen filtros
    const existingFilters = await this.filterRepository.count();
    if (existingFilters > 0) {
      console.log(
        '⚠️ Ya existen filtros en la base de datos. Saltando seed...',
      );
      return;
    }

    try {
      // Importar datos desde el dataset
      const dataset = (await import('../../dataset.js')) as {
        filtersData: FilterData[];
      };
      const { filtersData } = dataset;

      let filterCount = 0;
      let filterCharacteristicCount = 0;

      for (const filterData of filtersData) {
        try {
          // Crear el filtro
          const filter = this.filterRepository.create({
            name: filterData.name,
            description: filterData.description,
          });

          const savedFilter = await this.filterRepository.save(filter);
          filterCount++;

          // Crear las características del filtro
          for (const charData of filterData.characteristics) {
            try {
              const filterCharacteristic = new FilterCharacteristic();
              filterCharacteristic.filterId = savedFilter.id;
              filterCharacteristic.characteristicId = charData.characteristicId;
              if (charData.value)
                filterCharacteristic.exactValue = charData.value;
              if (charData.minValue)
                filterCharacteristic.minValue = charData.minValue;
              if (charData.maxValue)
                filterCharacteristic.maxValue = charData.maxValue;

              await this.filterCharacteristicRepository.save(
                filterCharacteristic,
              );
              filterCharacteristicCount++;
            } catch (error) {
              console.error(
                `❌ Error creando característica del filtro ${filterData.name}:`,
                error,
              );
            }
          }

          console.log(`✅ Creado filtro: ${filterData.name}`);
        } catch (error) {
          console.error(`❌ Error creando filtro ${filterData.name}:`, error);
        }
      }

      console.log(
        `🎉 Seed de filtros completado: ${filterCount} filtros y ${filterCharacteristicCount} características de filtro creadas`,
      );
    } catch (error) {
      console.error('❌ Error importando dataset de filtros:', error);
    }
  }
}
