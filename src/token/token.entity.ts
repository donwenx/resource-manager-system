import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Token {
  @Column('int')
  uid: number;

  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  token: string;

  @Column('int')
  state: number;

  @Column('int')
  loginTime: number;

  @Column('int')
  expire: number;
}
