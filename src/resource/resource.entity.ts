import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Resource {
  @PrimaryGeneratedColumn()
  rid: number;

  @Column({ type: 'int' })
  uid: number;

  @Column({ type: 'int', default: 0 })
  cid: number;

  @Column({ length: 255, type: 'varchar' })
  name: string;

  @Column({ length: 255, type: 'varchar' })
  originalName: string;

  @Column({ type: 'int' })
  size: number;

  @Column({ length: 255, type: 'varchar' })
  mimeType: string;

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

  @Column({ type: 'int', default: 1 }) // 0未使用，1发布，2审核， 3未审核
  state: number;
}
