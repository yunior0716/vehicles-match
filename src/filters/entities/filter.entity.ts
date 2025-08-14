import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

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

  @OneToMany('FilterCharacteristic', 'filter', {
    cascade: true,
  })
  filterCharacteristics: any[];
}
