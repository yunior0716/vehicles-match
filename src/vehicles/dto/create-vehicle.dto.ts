import {
  IsIn,
  IsInt,
  IsPositive,
  IsString,
  Min,
  MinLength,
} from 'class-validator';

export class CreateVehicleDto {
  @IsString()
  @MinLength(1)
  brand: string;

  @IsString()
  @MinLength(1)
  model: string;

  @IsInt()
  @Min(1886) // The first car was invented in 1886
  @IsPositive()
  year: number;

  @IsIn(['gas', 'diesel', 'hybrid', 'gasoline', 'electric'])
  fuel: string;

  @IsIn(['manual', 'automatic'])
  transmission: string;

  @IsInt()
  @IsPositive()
  @Min(1)
  seats: number;

  @IsInt()
  @IsPositive()
  @Min(1)
  doors: number;

  @IsString()
  @MinLength(1)
  carrocery: string;

  @IsInt()
  @IsPositive()
  price: number;

  @IsString()
  @MinLength(1)
  image: string;

  @IsString()
  @MinLength(1)
  description: string;
}
