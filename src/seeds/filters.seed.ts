import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Characteristic } from '../characteristics/entities/characteristic.entity';

@Injectable()
export class FiltersSeedService {
  constructor(
    @InjectRepository(Characteristic)
    private characteristicRepository: Repository<Characteristic>,
  ) {}

  async seed(): Promise<void> {
    console.log('🔍 Iniciando seed de características...');

    // Verificar si ya existen características
    const existingCharacteristics = await this.characteristicRepository.count();
    if (existingCharacteristics > 0) {
      console.log(
        '⚠️ Ya existen características en la base de datos. Saltando seed...',
      );
      return;
    }

    // Crear características básicas necesarias para los vehículos
    const basicCharacteristics = [
      // Características técnicas (IDs 1-36)
      {
        id: 1,
        name: 'Potencia',
        data_type: 'number',
        unit: 'hp',
        description: 'Potencia del motor en caballos de fuerza',
      },
      {
        id: 2,
        name: 'Torque',
        data_type: 'number',
        unit: 'Nm',
        description: 'Torque del motor en Newton-metro',
      },
      {
        id: 3,
        name: 'Aceleración 0-100',
        data_type: 'number',
        unit: 's',
        description: 'Tiempo de aceleración de 0 a 100 km/h',
      },
      {
        id: 4,
        name: 'Velocidad Máxima',
        data_type: 'number',
        unit: 'km/h',
        description: 'Velocidad máxima del vehículo',
      },
      {
        id: 5,
        name: 'Consumo Ciudad',
        data_type: 'number',
        unit: 'L/100km',
        description: 'Consumo de combustible en ciudad',
      },
      {
        id: 6,
        name: 'Consumo Carretera',
        data_type: 'number',
        unit: 'L/100km',
        description: 'Consumo de combustible en carretera',
      },
      {
        id: 7,
        name: 'Capacidad Tanque',
        data_type: 'number',
        unit: 'L',
        description: 'Capacidad del tanque de combustible',
      },
      {
        id: 8,
        name: 'Emisiones CO2',
        data_type: 'number',
        unit: 'g/km',
        description: 'Emisiones de dióxido de carbono',
      },
      {
        id: 9,
        name: 'Longitud',
        data_type: 'number',
        unit: 'mm',
        description: 'Longitud total del vehículo',
      },
      {
        id: 10,
        name: 'Ancho',
        data_type: 'number',
        unit: 'mm',
        description: 'Ancho total del vehículo',
      },
      {
        id: 11,
        name: 'Altura',
        data_type: 'number',
        unit: 'mm',
        description: 'Altura total del vehículo',
      },
      {
        id: 12,
        name: 'Peso',
        data_type: 'number',
        unit: 'kg',
        description: 'Peso del vehículo en vacío',
      },
      {
        id: 13,
        name: 'Capacidad de Carga',
        data_type: 'number',
        unit: 'L',
        description: 'Capacidad del maletero o área de carga',
      },
      {
        id: 14,
        name: 'Altura al Suelo',
        data_type: 'number',
        unit: 'mm',
        description: 'Distancia mínima al suelo',
      },
      {
        id: 15,
        name: 'Aire Acondicionado',
        data_type: 'boolean',
        description: 'Sistema de aire acondicionado',
      },
      {
        id: 16,
        name: 'GPS',
        data_type: 'boolean',
        description: 'Sistema de navegación GPS',
      },
      {
        id: 17,
        name: 'Cámara de Reversa',
        data_type: 'boolean',
        description: 'Cámara trasera para reversa',
      },
      {
        id: 18,
        name: 'Sensores de Parking',
        data_type: 'boolean',
        description: 'Sensores de aparcamiento',
      },
      {
        id: 19,
        name: 'Asientos de Cuero',
        data_type: 'boolean',
        description: 'Tapicería de cuero',
      },
      {
        id: 20,
        name: 'Volante Multifunción',
        data_type: 'boolean',
        description: 'Volante con controles integrados',
      },
      {
        id: 21,
        name: 'Control de Crucero',
        data_type: 'boolean',
        description: 'Sistema de control de crucero',
      },
      {
        id: 22,
        name: 'Bluetooth',
        data_type: 'boolean',
        description: 'Conectividad inalámbrica Bluetooth',
      },
      {
        id: 23,
        name: 'Puertos USB',
        data_type: 'boolean',
        description: 'Puertos USB para carga y datos',
      },
      {
        id: 24,
        name: 'Sistema ABS',
        data_type: 'boolean',
        description: 'Sistema antibloqueo de frenos',
      },
      {
        id: 25,
        name: 'Airbags',
        data_type: 'number',
        description: 'Número total de airbags',
      },
      {
        id: 26,
        name: 'EBD',
        data_type: 'boolean',
        description: 'Distribución electrónica de frenado',
      },
      {
        id: 27,
        name: 'Tipo de Tracción',
        data_type: 'text',
        description: 'Sistema de tracción del vehículo',
      },
      {
        id: 28,
        name: 'Control de Estabilidad',
        data_type: 'boolean',
        description: 'Sistema de control de estabilidad',
      },
      {
        id: 29,
        name: 'Sistema de Alarma',
        data_type: 'boolean',
        description: 'Sistema de seguridad y alarma',
      },
      {
        id: 30,
        name: 'Radio',
        data_type: 'boolean',
        description: 'Sistema de radio AM/FM',
      },
      {
        id: 31,
        name: 'Pantalla Multimedia',
        data_type: 'number',
        unit: '"',
        description: 'Tamaño de pantalla del sistema multimedia',
      },
      {
        id: 32,
        name: 'Apple CarPlay',
        data_type: 'boolean',
        description: 'Compatibilidad con Apple CarPlay',
      },
      {
        id: 33,
        name: 'Android Auto',
        data_type: 'boolean',
        description: 'Compatibilidad con Android Auto',
      },
      {
        id: 34,
        name: 'Carga Inalámbrica',
        data_type: 'boolean',
        description: 'Cargador inalámbrico para dispositivos',
      },
      {
        id: 35,
        name: 'Techo Solar',
        data_type: 'boolean',
        description: 'Techo corredizo o panorámico',
      },
      {
        id: 36,
        name: 'Luces LED',
        data_type: 'boolean',
        description: 'Iluminación LED (faros y/o interiores)',
      },

      // Características principales del vehículo (IDs 37-43)
      {
        id: 37,
        name: 'Año',
        data_type: 'number',
        description: 'Año de fabricación del vehículo',
      },
      {
        id: 38,
        name: 'Precio',
        data_type: 'number',
        unit: 'USD',
        description: 'Precio de venta del vehículo',
      },
      {
        id: 39,
        name: 'Combustible',
        data_type: 'text',
        description: 'Tipo de combustible o energía',
      },
      {
        id: 40,
        name: 'Transmisión',
        data_type: 'text',
        description: 'Tipo de caja de cambios',
      },
      {
        id: 41,
        name: 'Asientos',
        data_type: 'number',
        description: 'Número total de asientos',
      },
      {
        id: 42,
        name: 'Puertas',
        data_type: 'number',
        description: 'Número de puertas del vehículo',
      },
      {
        id: 43,
        name: 'Carrocería',
        data_type: 'text',
        description: 'Tipo de carrocería del vehículo',
      },
    ];
    let characteristicCount = 0;

    for (const charData of basicCharacteristics) {
      try {
        // Crear characteristic con ID específico
        const characteristic = await this.characteristicRepository.save({
          id: charData.id,
          name: charData.name,
          data_type: charData.data_type,
          unit: charData.unit || undefined,
          description: charData.description,
        });

        characteristicCount++;
        console.log(
          `✅ Creada característica: ${charData.name} (ID: ${characteristic.id})`,
        );
      } catch (error) {
        console.error(
          `❌ Error creando característica ${charData.name}:`,
          error,
        );
      }
    }

    console.log(
      `🎉 Seed de características completado: ${characteristicCount} características creadas`,
    );
  }
}
