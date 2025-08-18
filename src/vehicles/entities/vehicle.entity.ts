import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { VehicleCharacteristic } from './vehicle-characteristic.entity';

@Entity({ name: 'vehicles' })
export class Vehicle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  brand: string;

  @Column({ type: 'text' })
  model: string;

  @Column({ type: 'int', nullable: true })
  year: number;

  @Column({ type: 'text', nullable: true })
  fuel: string;

  @Column({ type: 'text', nullable: true })
  transmission: string;

  @Column({ type: 'int', nullable: true })
  seats: number;

  @Column({ type: 'int', nullable: true })
  doors: number;

  @Column({ type: 'text', nullable: true })
  carrocery: string;

  @Column({ type: 'int', nullable: true })
  price: number;

  @Column({ type: 'text' })
  image: string;

  @Column({ type: 'text' })
  description: string;

  @OneToMany(
    () => VehicleCharacteristic,
    (vehicleCharacteristic) => vehicleCharacteristic.vehicle,
  )
  vehicleCharacteristics: VehicleCharacteristic[];
}
