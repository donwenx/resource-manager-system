import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Resource {
  @PrimaryGeneratedColumn()
  rid: number;

  @Column({ type: 'int' })
  uid: number;

  @Column({ length: 255, type: 'varchar' })
  name: string;

  @Column({ length: 255, type: 'varchar', default: '' })
  keywords: string;

  @Column({ type: 'int', default: 0 })
  time: number;

  @Column({ length: 255, type: 'varchar', default: '' })
  img: string;

  @Column({ length: 255, type: 'varchar', default: '' })
  path: string;

  @Column({ type: 'int', default: 0 })
  downloads: number;

  @Column({ type: 'int', default: 1 })
  state: number;
}
