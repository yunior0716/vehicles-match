import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Filter } from './filter.entity';

@Entity({ name: 'filter_characteristics' })
export class FilterCharacteristic {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'filter_id', type: 'uuid' })
  filterId: string;

  @Column({ name: 'characteristic_id', type: 'int' })
  characteristicId: number;

  @Column({ name: 'min_value', type: 'text', nullable: true })
  minValue: string;

  @Column({ name: 'max_value', type: 'text', nullable: true })
  maxValue: string;

  @Column({ name: 'exact_value', type: 'text', nullable: true })
  exactValue: string;

  @ManyToOne('Filter', 'filterCharacteristics', {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'filter_id' })
  filter: Filter;

  @ManyToOne('Characteristic')
  @JoinColumn({ name: 'characteristic_id' })
  characteristic: any;
}
