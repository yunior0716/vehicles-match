import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FilterCharacteristic } from './filter-characteristic.entity';

@Entity({ name: 'filters' })
export class Filter {
  @PrimaryGeneratedColumn('uuid', { name: 'filter_id' })
  id: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @OneToMany(
    () => FilterCharacteristic,
    (filterCharacteristic) => filterCharacteristic.filter,
    {
      cascade: true,
    },
  )
  filterCharacteristics: FilterCharacteristic[];
}
