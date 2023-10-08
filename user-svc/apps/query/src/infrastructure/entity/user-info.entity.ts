import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

export enum UserSex {
  Male = 'Male',
  Femal = 'Female',
}

@Entity()
export class UserInfo {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  userId: string;

  @Column({ type: 'enum', enum: UserSex })
  sex: UserSex;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @OneToOne((_type) => User, (user) => user.info)
  @JoinColumn({ name: 'user_id' })
  public user: User;
}
