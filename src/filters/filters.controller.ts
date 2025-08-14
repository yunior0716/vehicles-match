import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { FiltersService } from './filters.service';
import { CreateFilterDto } from './dto/create-filter.dto';
import { UpdateFilterDto } from './dto/update-filter.dto';

@Controller('filters')
export class FiltersController {
  constructor(private readonly filtersService: FiltersService) {}

  @Post()
  create(@Body() createFilterDto: CreateFilterDto) {
    return this.filtersService.create(createFilterDto);
  }

  @Get()
  findAll() {
    return this.filtersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.filtersService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateFilterDto: UpdateFilterDto,
  ) {
    return this.filtersService.update(id, updateFilterDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.filtersService.remove(id);
  }

  // Endpoints para gestionar características de filtros
  @Post(':filterId/characteristics')
  addCharacteristicToFilter(
    @Param('filterId', ParseUUIDPipe) filterId: string,
    @Body()
    body: {
      characteristicId: number;
      minValue?: string;
      maxValue?: string;
      exactValue?: string;
    },
  ) {
    return this.filtersService.addCharacteristicToFilter(
      filterId,
      body.characteristicId,
      body.minValue,
      body.maxValue,
      body.exactValue,
    );
  }

  @Get(':filterId/characteristics')
  getFilterCharacteristics(@Param('filterId', ParseUUIDPipe) filterId: string) {
    return this.filtersService.getFilterCharacteristics(filterId);
  }

  @Delete('characteristics/:id')
  removeCharacteristicFromFilter(@Param('id', ParseUUIDPipe) id: string) {
    return this.filtersService.removeCharacteristicFromFilter(id);
  }
}
