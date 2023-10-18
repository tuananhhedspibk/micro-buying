import { Controller, HttpStatus, Inject } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GrpcMethod, Payload } from '@nestjs/microservices';
import {
  GetOrderResponse,
  ORDER_QUERY_SERVICE_NAME,
} from '../../../common/proto/order-query.pb';
import { GetOrderDto } from './get-order.dto';
import { GetOrderQuery } from '../query/get-order.query';

@Controller()
export class GetOrderController {
  @Inject(QueryBus)
  private readonly queryBus: QueryBus;

  @GrpcMethod(ORDER_QUERY_SERVICE_NAME, 'GetOrder')
  private async getOrder(
    @Payload() payload: GetOrderDto,
  ): Promise<GetOrderResponse> {
    const { id } = payload;
    const query: GetOrderQuery = new GetOrderQuery(id);

    const result = await this.queryBus.execute(query);

    return { data: result, status: HttpStatus.OK, error: [] };
  }
}
