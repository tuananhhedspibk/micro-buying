import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetOrderQuery } from './get-order.query';
import { OrderData } from '../../../common/proto/order-query.pb';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from '../../../infrastructure/entity/order.entity';
import { Repository } from 'typeorm';

@QueryHandler(GetOrderQuery)
export class GetOrderQueryHandler
  implements IQueryHandler<GetOrderQuery, OrderData>
{
  @InjectRepository(Order)
  private readonly repository: Repository<Order>;

  async execute(query: GetOrderQuery): Promise<OrderData> {
    const order = await this.repository.findOne({ where: { id: query.id } });

    return {
      buyDate: order.buyDate.toLocaleString(),
      items: [...order.items],
    };
  }
}
