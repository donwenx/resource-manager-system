import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  uid: number;

  @Column({ length: 255, type: 'varchar' })
  name: string;

  @Column({ length: 2, type: 'varchar', default: '' })
  sex: string;

  @Column({ type: 'varchar', default: '' })
  avatar: string;

  @Column({ length: 255, type: 'varchar' })
  password: string;

  @Column({ length: 255, type: 'varchar', default: '' })
  authority: string;

  @Column({ type: 'int', default: '1' })
  state: number;
}
