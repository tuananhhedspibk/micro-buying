import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Order } from './order.entity';

@Entity()
export class OrderItem {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  orderId: string;

  @Column()
  name: string;

  @Column({ unique: true, nullable: false })
  code: string;

  @Column()
  image: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToOne((_type) => Order, (order) => order.items)
  @JoinColumn({ name: 'order_id' })
  public order: Order;
}
