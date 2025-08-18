# Seeds del Backend

Este documento explica cómo usar los seeds para poblar la base de datos con datos iniciales.

## Contenido de los Seeds

### 1. Características (characteristics.seed.ts)

- Crea las características básicas del sistema

### 2. Filtros (filters.seed.ts)

- Crea características adicionales desde el dataset
- Incluye filtros como: marca, modelo, año, combustible, transmisión, asientos, puertas, carrocería, precio, etc.

### 3. Vehículos (vehicles.seed.ts)

- Crea 30 vehículos con todas sus características
- Incluye vehículos como BMW X3, Honda CR-V, Toyota Camry, Tesla Model 3, Ford F-150
- Cada vehículo incluye especificaciones técnicas detalladas

## Cómo Ejecutar los Seeds

### Opción 1: Con ts-node (Desarrollo)

```bash
npm run seed
```

### Opción 2: Con build (Producción)

```bash
npm run seed:build
```

### Opción 3: Directamente con ts-node

```bash
npx ts-node -r tsconfig-paths/register src/seed.ts
```

## Orden de Ejecución

Los seeds se ejecutan en el siguiente orden:

1. **CharacteristicsSeed**: Crea características básicas
2. **FiltersSeedService**: Crea filtros/características del dataset
3. **VehiclesSeedService**: Crea vehículos y sus características

## Verificaciones

- Los seeds verifican si ya existen datos antes de ejecutarse
- Si hay datos existentes, se saltean automáticamente
- Cada seed muestra logs detallados del progreso

## Datos Incluidos

### Vehículos (30 total)

- **BMW X3**: SUV de lujo con especificaciones premium
- **Honda CR-V**: SUV compacto con excelente eficiencia
- **Toyota Camry**: Sedán confiable y eficiente
- **Tesla Model 3**: Vehículo eléctrico de alta tecnología
- **Ford F-150**: Pickup robusta para trabajo pesado
- Y 25 vehículos más con características completas

### Características Incluidas

- Información básica: marca, modelo, año, precio
- Especificaciones técnicas: motor, transmisión, combustible
- Características físicas: asientos, puertas, carrocería
- Datos adicionales: eficiencia, seguridad, comodidad

## Estructura del Dataset

El archivo `dataset.js` contiene:

```javascript
export const vehiclesData = [
  {
    brand: 'BMW',
    model: 'X3',
    year: 2023,
    // ... más características
    characteristics: [
      { characteristicId: 1, value: '295' },
      // ... más características
    ],
  },
  // ... más vehículos
];

export const filtersData = [
  {
    name: 'brand',
    label: 'Marca',
    type: 'select',
    // ... más propiedades
  },
  // ... más filtros
];
```

## Troubleshooting

### Error: Cannot resolve dependencies

Asegúrate de que todas las entidades estén registradas en el AppModule:

- Vehicle
- VehicleCharacteristic
- Characteristic

### Error: Database connection

Verifica que PostgreSQL esté corriendo y las variables de entorno estén configuradas:

- DB_HOST
- DB_PORT
- DB_NAME
- DB_USERNAME
- DB_PASSWORD

### Error: Module not found

Ejecuta `npm install` para instalar todas las dependencias.
