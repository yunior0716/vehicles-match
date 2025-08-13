import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'characteristics' })
export class Characteristic {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text' })
  data_type: string;

  @Column({ type: 'text', nullable: true })
  unit: string;

  @Column({ type: 'text', nullable: true })
  description: string;
}
