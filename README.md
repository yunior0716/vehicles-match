# Vehicles Match API

Sistema de gestión de vehículos con características técnicas y filtros avanzados desarrollado con NestJS, TypeORM y PostgreSQL.

## 🚀 Funcionalidades

- **CRUD de Vehículos**: Gestión completa de vehículos
- **CRUD de Características**: Gestión de características técnicas (potencia, torque, consumo, etc.)
- **CRUD de Filtros**: Sistema de filtros avanzados con rangos y valores exactos
- **Relaciones**: Asignación de características a vehículos y filtros
- **Base de datos**: PostgreSQL con Docker
- **Validación**: DTOs con class-validator
- **TypeORM**: ORM con sincronización automática

## 📋 Requisitos Previos

- Node.js (v18+)
- Docker y Docker Compose
- pnpm (recomendado) o npm

## 🛠️ Instalación

### 1. Clonar el repositorio

```bash
git clone <repository-url>
cd vehicles-match
```

### 2. Instalar dependencias

```bash
pnpm install
# o
npm install
```

### 3. Configurar variables de entorno

Crear archivo `.env` en la raíz del proyecto:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=vehicles_match
DB_USERNAME=postgres
DB_PASSWORD=password
```

### 4. Iniciar la base de datos

```bash
docker-compose up -d
```

### 5. Iniciar la aplicación

```bash
# Desarrollo
pnpm start:dev
# o
npm run start:dev

# Producción
pnpm build && pnpm start:prod
# o
npm run build && npm run start:prod
```

La aplicación estará disponible en: `http://localhost:3000`

## 📊 Inicializar Datos

### Ejecutar seed de características

Para poblar la base de datos con las características técnicas predefinidas:

```bash
# Método 1: Endpoint HTTP
curl -X POST http://localhost:3000/seed/characteristics

# Método 2: Directo en el código
# El seed incluye 32 características como:
# - Potencia del motor (hp)
# - Torque (Nm)
# - Consumo urbano/carretera (km/L)
# - Dimensiones (mm)
# - Características de seguridad
# - Configuración del vehículo
```

## 📖 API Endpoints

### 🚗 Vehículos

| Método   | Endpoint                        | Descripción                         |
| -------- | ------------------------------- | ----------------------------------- |
| `GET`    | `/vehicles`                     | Listar todos los vehículos          |
| `GET`    | `/vehicles/:id`                 | Obtener vehículo por ID             |
| `POST`   | `/vehicles`                     | Crear nuevo vehículo                |
| `PATCH`  | `/vehicles/:id`                 | Actualizar vehículo                 |
| `DELETE` | `/vehicles/:id`                 | Eliminar vehículo                   |
| `POST`   | `/vehicles/:id/characteristics` | Asignar característica a vehículo   |
| `GET`    | `/vehicles/:id/characteristics` | Obtener características de vehículo |
| `DELETE` | `/vehicles/characteristics/:id` | Remover característica de vehículo  |

#### Ejemplo: Crear vehículo

```json
POST /vehicles
{
  "brand": "Toyota",
  "model": "Corolla",
  "year": 2024,
  "price": 25000
}
```

#### Ejemplo: Asignar característica a vehículo

```json
POST /vehicles/:vehicleId/characteristics
{
  "characteristicId": 1,
  "value": "150"
}
```

### ⚙️ Características

| Método   | Endpoint               | Descripción                      |
| -------- | ---------------------- | -------------------------------- |
| `GET`    | `/characteristics`     | Listar todas las características |
| `GET`    | `/characteristics/:id` | Obtener característica por ID    |
| `POST`   | `/characteristics`     | Crear nueva característica       |
| `PATCH`  | `/characteristics/:id` | Actualizar característica        |
| `DELETE` | `/characteristics/:id` | Eliminar característica          |

#### Ejemplo: Crear característica

```json
POST /characteristics
{
  "name": "Potencia del motor",
  "data_type": "number",
  "unit": "hp",
  "description": "Potencia del motor en caballos de fuerza"
}
```

### 🔍 Filtros

| Método   | Endpoint                             | Descripción                       |
| -------- | ------------------------------------ | --------------------------------- |
| `GET`    | `/filters`                           | Listar todos los filtros          |
| `GET`    | `/filters/:id`                       | Obtener filtro por ID             |
| `POST`   | `/filters`                           | Crear nuevo filtro                |
| `PATCH`  | `/filters/:id`                       | Actualizar filtro                 |
| `DELETE` | `/filters/:id`                       | Eliminar filtro                   |
| `POST`   | `/filters/:filterId/characteristics` | Agregar característica a filtro   |
| `GET`    | `/filters/:filterId/characteristics` | Obtener características de filtro |
| `DELETE` | `/filters/characteristics/:id`       | Remover característica de filtro  |

#### Ejemplo: Crear filtro

```json
POST /filters
{
  "name": "Vehículos Económicos",
  "description": "Filtro para vehículos con buen rendimiento de combustible"
}
```

#### Ejemplo: Agregar característica a filtro

```json
POST /filters/:filterId/characteristics
{
  "characteristicId": 5,
  "minValue": "15",
  "maxValue": "25"
}
```

### 🌱 Seed

| Método | Endpoint                | Descripción                      |
| ------ | ----------------------- | -------------------------------- |
| `POST` | `/seed/characteristics` | Ejecutar seed de características |

## 📊 Estructura de Base de Datos

### Tablas Principales

#### `vehicles`

- `id` (UUID, Primary Key)
- `brand` (VARCHAR)
- `model` (VARCHAR)
- `year` (INTEGER)
- `price` (DECIMAL)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

#### `characteristics`

- `id` (INTEGER, Primary Key, Auto-increment)
- `name` (TEXT)
- `data_type` (TEXT) - 'number', 'text', 'boolean', 'select'
- `unit` (TEXT, Nullable)
- `description` (TEXT, Nullable)

#### `vehicle_characteristics`

- `id` (UUID, Primary Key)
- `vehicle_id` (UUID, Foreign Key → vehicles.id)
- `characteristic_id` (INTEGER, Foreign Key → characteristics.id)
- `value` (TEXT)

#### `filters`

- `id` (UUID, Primary Key)
- `name` (VARCHAR)
- `description` (TEXT, Nullable)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

#### `filter_characteristics`

- `id` (UUID, Primary Key)
- `filter_id` (UUID, Foreign Key → filters.id)
- `characteristic_id` (INTEGER, Foreign Key → characteristics.id)
- `min_value` (VARCHAR, Nullable)
- `max_value` (VARCHAR, Nullable)
- `exact_value` (VARCHAR, Nullable)

## 🏗️ Arquitectura del Proyecto

```
src/
├── characteristics/           # Módulo de características
│   ├── dto/                  # Data Transfer Objects
│   ├── entities/             # Entidades TypeORM
│   ├── characteristics.controller.ts
│   ├── characteristics.service.ts
│   └── characteristics.module.ts
├── vehicles/                 # Módulo de vehículos
│   ├── dto/
│   ├── entities/
│   ├── vehicles.controller.ts
│   ├── vehicles.service.ts
│   └── vehicles.module.ts
├── filters/                  # Módulo de filtros
│   ├── dto/
│   ├── entities/
│   ├── filters.controller.ts
│   ├── filters.service.ts
│   └── filters.module.ts
├── seeds/                    # Scripts de inicialización
│   └── characteristics.seed.ts
├── app.module.ts            # Módulo principal
├── main.ts                  # Punto de entrada
└── seed.controller.ts       # Controlador para ejecutar seeds
```

## 🧪 Características Técnicas Incluidas

El sistema incluye 32 características técnicas predefinidas:

### Motor y Rendimiento

- Potencia del motor (hp)
- Torque (Nm)
- Aceleración 0-100 km/h (s)
- Velocidad máxima (km/h)

### Consumo

- Consumo urbano (km/L)
- Consumo en carretera (km/L)
- Consumo combinado (km/L)
- Tipo de combustible (Gasolina, Diesel, Eléctrico, Híbrido)
- Autonomía (km)

### Dimensiones

- Largo, Ancho, Altura (mm)
- Distancia entre ejes (mm)
- Capacidad de maletero (litros)
- Peso (kg)

### Tecnología y Comodidad

- Pantalla multimedia
- Navegación GPS
- Conectividad (Android Auto/Apple CarPlay)
- Aire acondicionado automático
- Asientos eléctricos o calefactables
- Control de crucero

### Seguridad

- Número de airbags
- Frenos ABS
- Control de tracción y estabilidad
- Sistema de asistencia
- Calificación de seguridad (1-5 estrellas)

### Configuración

- Número de plazas
- Tipo de transmisión (Manual/Automática)
- Tracción (FWD/RWD/AWD)
- Capacidad de remolque (kg)
- Capacidad de carga (kg)
- Precio de compra (USD)

## 🛡️ Validaciones

El sistema incluye validaciones robustas usando `class-validator`:

- **Campos requeridos**: Marca, modelo, año para vehículos
- **Tipos de datos**: Números, textos, booleanos
- **Longitud mínima**: Nombres deben tener al menos 1 carácter
- **UUIDs válidos**: Para identificadores de vehículos y filtros
- **Enteros positivos**: Para IDs de características

## 🚀 Scripts Disponibles

```bash
# Desarrollo
pnpm start:dev          # Modo desarrollo con hot-reload
pnpm start:debug        # Modo debug

# Construcción
pnpm build              # Compilar TypeScript

# Producción
pnpm start:prod         # Ejecutar en producción

# Linting y formato
pnpm lint               # Verificar código con ESLint
pnpm lint:fix           # Corregir errores de lint automáticamente

# Testing
pnpm test               # Ejecutar tests unitarios
pnpm test:e2e           # Ejecutar tests end-to-end
pnpm test:cov           # Ejecutar tests con coverage
```

## 🐳 Docker

El proyecto incluye configuración Docker para PostgreSQL:

```yaml
# docker-compose.yaml
version: '3.8'
services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: vehicles_match
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
    ports:
      - '5432:5432'
    volumes:
      - ./postgres:/var/lib/postgresql/data
```

## 🔧 Configuración Adicional

### TypeORM

- Sincronización automática en desarrollo
- Auto-carga de entidades
- Conexión PostgreSQL

### Validación

- DTOs con decoradores de validación
- Pipes de validación global
- Transformación automática de tipos

### Estructura Modular

- Separación clara de responsabilidades
- Inyección de dependencias
- Exportación de servicios para reutilización

## 📝 Notas de Desarrollo

1. **Relaciones**: El sistema usa relaciones explícitas entre tablas con claves foráneas
2. **UUIDs**: Vehículos y filtros usan UUIDs para mayor seguridad
3. **Auto-increment**: Las características usan IDs auto-incrementales por simplicidad
4. **Flexibilidad**: Los filtros soportan valores exactos, rangos mínimos, máximos o combinaciones
5. **Extensibilidad**: Fácil agregar nuevas características a través de la API o seeds
