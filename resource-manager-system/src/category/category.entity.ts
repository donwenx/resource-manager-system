import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  cid: number;

  @Column({ type: 'int' })
  uid: number; // 用户id

  @Column({ length: 255, type: 'varchar' })
  name: string;

  @Column({ type: 'int', default: 1 })
  state: number; // 1 = 未删除， 2 = 删除， 0 = 不修改
}
