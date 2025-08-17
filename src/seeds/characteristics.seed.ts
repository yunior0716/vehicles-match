import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Characteristic } from '../characteristics/entities/characteristic.entity';

@Injectable()
export class CharacteristicsSeed {
  constructor(
    @InjectRepository(Characteristic)
    private characteristicsRepository: Repository<Characteristic>,
  ) {}

  async seed(): Promise<void> {
    const characteristics = [
      // Motor y Rendimiento
      {
        name: 'Potencia',
        data_type: 'number',
        unit: 'hp',
        description: 'Potencia del motor en caballos de fuerza',
      },
      {
        name: 'Consumo por 100km',
        data_type: 'number',
        unit: 'L/100km',
        description: 'Consumo de combustible en litros cada 100 kilómetros',
      },
      {
        name: 'Aceleración 0-100 km/h',
        data_type: 'number',
        unit: 's',
        description: 'Tiempo de aceleración de 0 a 100 km/h',
      },
      {
        name: 'Velocidad máxima',
        data_type: 'number',
        unit: 'km/h',
        description: 'Velocidad máxima del vehículo',
      },

      // Consumo
      {
        name: 'Consumo urbano',
        data_type: 'number',
        unit: 'km/L',
        description: 'Consumo de combustible en ciudad',
      },
      {
        name: 'Consumo en carretera',
        data_type: 'number',
        unit: 'km/L',
        description: 'Consumo de combustible en carretera',
      },
      {
        name: 'Consumo combinado',
        data_type: 'number',
        unit: 'km/L',
        description: 'Consumo de combustible combinado',
      },
      {
        name: 'Autonomía',
        data_type: 'number',
        unit: 'km',
        description: 'Autonomía para vehículos eléctricos o híbridos',
      },

      // Dimensiones
      {
        name: 'Largo',
        data_type: 'number',
        unit: 'mm',
        description: 'Longitud del vehículo',
      },
      {
        name: 'Ancho',
        data_type: 'number',
        unit: 'mm',
        description: 'Ancho del vehículo',
      },
      {
        name: 'Altura',
        data_type: 'number',
        unit: 'mm',
        description: 'Altura del vehículo',
      },
      {
        name: 'Distancia entre ejes',
        data_type: 'number',
        unit: 'mm',
        description: 'Distancia entre ejes del vehículo',
      },
      {
        name: 'Capacidad de maletero',
        data_type: 'number',
        unit: 'litros',
        description: 'Capacidad del maletero',
      },
      {
        name: 'Peso',
        data_type: 'number',
        unit: 'kg',
        description: 'Peso del vehículo',
      },

      // Tecnología y Comodidad
      {
        name: 'Pantalla multimedia',
        data_type: 'boolean',
        unit: '',
        description: 'Tiene pantalla multimedia',
      },
      {
        name: 'Navegación GPS',
        data_type: 'boolean',
        unit: '',
        description: 'Tiene sistema de navegación GPS',
      },
      {
        name: 'Conectividad',
        data_type: 'text',
        unit: '',
        description: 'Android Auto / Apple CarPlay',
      },
      {
        name: 'Aire acondicionado automático',
        data_type: 'boolean',
        unit: '',
        description: 'Tiene aire acondicionado automático',
      },
      {
        name: 'Asientos eléctricos o calefactables',
        data_type: 'boolean',
        unit: '',
        description: 'Asientos con ajuste eléctrico o calefacción',
      },

      // Seguridad
      {
        name: 'Número de airbags',
        data_type: 'number',
        unit: '',
        description: 'Cantidad de airbags',
      },
      {
        name: 'Frenos ABS',
        data_type: 'boolean',
        unit: '',
        description: 'Sistema de frenos ABS',
      },
      {
        name: 'Control de tracción y estabilidad',
        data_type: 'boolean',
        unit: '',
        description: 'Sistema de control de tracción y estabilidad',
      },
      {
        name: 'Calificación de seguridad',
        data_type: 'number',
        unit: 'estrellas',
        description: 'Calificación de seguridad de 1 a 5 estrellas',
      },

      // Configuración
      {
        name: 'Tracción',
        data_type: 'select',
        unit: '',
        description: 'FWD / RWD / AWD',
      },
      {
        name: 'Capacidad de remolque',
        data_type: 'number',
        unit: 'kg',
        description: 'Capacidad máxima de remolque',
      },
      {
        name: 'Capacidad de carga',
        data_type: 'number',
        unit: 'kg',
        description: 'Capacidad máxima de carga',
      },
    ];

    for (const charData of characteristics) {
      const existingChar = await this.characteristicsRepository.findOne({
        where: { name: charData.name },
      });

      if (!existingChar) {
        const characteristic = this.characteristicsRepository.create({
          name: charData.name,
          data_type: charData.data_type,
          unit: charData.unit || undefined,
          description: charData.description,
        });
        await this.characteristicsRepository.save(characteristic);
        console.log(`Característica creada: ${charData.name}`);
      } else {
        console.log(`Característica ya existe: ${charData.name}`);
      }
    }

    console.log('Seed de características completado');
  }
}
