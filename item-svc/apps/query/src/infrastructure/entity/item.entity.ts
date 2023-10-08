import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum ItemStatus {
  Stocking = 'Stocking',
  Bought = 'Bought',
}

@Entity()
export class Item {
  @PrimaryColumn('uuid')
  id: string;

  @Column({
    unique: true,
    nullable: false,
  })
  code: string;

  @Column()
  name: string;

  @Column()
  image: string;

  @Column({
    type: 'enum',
    enum: ItemStatus,
  })
  status: ItemStatus;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
