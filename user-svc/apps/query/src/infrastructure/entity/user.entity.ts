import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserInfo } from './user-info.entity';

@Entity()
export class User {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  userName: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @OneToOne((_type) => UserInfo, (userInfo) => userInfo.user)
  public info: UserInfo;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
