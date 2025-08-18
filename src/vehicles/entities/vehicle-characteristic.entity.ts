import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Vehicle } from './vehicle.entity';
import { Characteristic } from '../../characteristics/entities/characteristic.entity';

@Entity({ name: 'vehicle_characteristics' })
export class VehicleCharacteristic {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'vehicle_id' })
  vehicleId: number;

  @Column({ name: 'characteristic_id' })
  characteristicId: number;

  @Column({ type: 'text' })
  value: string;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.vehicleCharacteristics)
  @JoinColumn({ name: 'vehicle_id' })
  vehicle: Vehicle;

  @ManyToOne(() => Characteristic)
  @JoinColumn({ name: 'characteristic_id' })
  characteristic: Characteristic;
}
