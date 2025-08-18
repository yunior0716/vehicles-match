import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { CreateVehicleCharacteristicDto } from './dto/create-vehicle-characteristic.dto';
import { UpdateVehicleCharacteristicDto } from './dto/update-vehicle-characteristic.dto';
import { VehicleCharacteristicSyncService } from './services/vehicle-characteristic-sync.service';

@Controller('vehicles')
export class VehiclesController {
  constructor(
    private readonly vehiclesService: VehiclesService,
    private readonly syncService: VehicleCharacteristicSyncService,
  ) {}

  // Vehicle CRUD endpoints
  @Post()
  create(@Body() createVehicleDto: CreateVehicleDto) {
    return this.vehiclesService.create(createVehicleDto);
  }

  @Get()
  findAll() {
    return this.vehiclesService.findAll();
  }

  @Get('filtered')
  findByFilters(@Query('filters') filters: string) {
    const filterIds = filters ? filters.split(',') : [];
    return this.vehiclesService.findVehiclesByFilters(filterIds);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.vehiclesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateVehicleDto: UpdateVehicleDto,
  ) {
    return this.vehiclesService.update(id, updateVehicleDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.vehiclesService.remove(id);
  }

  // Vehicle-Characteristic relationship endpoints (características específicas del vehículo)
  @Post(':vehicleId/characteristics')
  addCharacteristicToVehicle(
    @Body() createVehicleCharacteristicDto: CreateVehicleCharacteristicDto,
  ) {
    return this.vehiclesService.addCharacteristicToVehicle(
      createVehicleCharacteristicDto,
    );
  }

  @Get(':vehicleId/characteristics')
  findVehicleCharacteristics(
    @Param('vehicleId', ParseIntPipe) vehicleId: number,
  ) {
    return this.vehiclesService.findVehicleCharacteristics(vehicleId);
  }

  @Get('characteristics/:id')
  findOneVehicleCharacteristic(@Param('id', ParseIntPipe) id: number) {
    return this.vehiclesService.findOneVehicleCharacteristic(id);
  }

  @Patch('characteristics/:id')
  updateVehicleCharacteristic(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateVehicleCharacteristicDto: UpdateVehicleCharacteristicDto,
  ) {
    return this.vehiclesService.updateVehicleCharacteristic(
      id,
      updateVehicleCharacteristicDto,
    );
  }

  @Delete('characteristics/:id')
  removeVehicleCharacteristic(@Param('id', ParseIntPipe) id: number) {
    return this.vehiclesService.removeVehicleCharacteristic(id);
  }

  // Sync endpoint
  @Post('sync-characteristics')
  async syncCharacteristics() {
    try {
      await this.syncService.syncAllVehicles();
      return {
        success: true,
        message: 'Vehicle characteristics synced successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: 'Error syncing vehicle characteristics',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }
}
