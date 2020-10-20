import { Entity, Column, PrimaryGeneratedColumn, Index, BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcrypt';
const saltRounds = 10;

@Entity('users')
export default class User {
  // columns
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  @Index({ unique: true })
  email: string;

  @Column()
  password: string;

  @BeforeInsert()
  async encryptPassword() {
    this.password = await bcrypt.hash(this.password, saltRounds);
  }



}