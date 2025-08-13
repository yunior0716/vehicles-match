import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'vehicles' })
export class Vehicle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  brand: string;

  @Column({ type: 'text' })
  model: string;

  @Column({ type: 'int' })
  year: number;

  @Column({ type: 'text' })
  fuel: string;

  @Column({ type: 'text' })
  transmission: string;

  @Column({ type: 'int' })
  seats: number;

  @Column({ type: 'int' })
  doors: number;

  @Column({ type: 'text' })
  carrocery: string;

  @Column({ type: 'int' })
  price: number;

  @Column({ type: 'text' })
  image: string;

  @Column({ type: 'text' })
  description: string;

  @OneToMany('VehicleCharacteristic', 'vehicle')
  vehicleCharacteristics: any[];
}
