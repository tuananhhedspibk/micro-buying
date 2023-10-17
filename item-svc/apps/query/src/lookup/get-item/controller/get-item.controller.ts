import { Controller, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GrpcMethod, Payload } from '@nestjs/microservices';

import {
  GetItemResponse,
  ITEM_QUERY_SERVICE_NAME,
} from '../../../common/proto/item-query.pb';

import { GetItemQuery } from '../query/get-item.query';
import { Item } from '../../../infrastructure/entity/item.entity';
import { GetItemDto } from './get-item.dto';

@Controller()
export class GetItemController {
  @Inject(QueryBus)
  private readonly queryBus: QueryBus;

  @GrpcMethod(ITEM_QUERY_SERVICE_NAME, 'GetItem')
  private async getItem(
    @Payload() payload: GetItemDto,
  ): Promise<GetItemResponse> {
    const query: GetItemQuery = new GetItemQuery(payload.id);
    const data: Item = await this.queryBus.execute(query);

    if (!data) {
      throw new HttpException('No item found!', HttpStatus.NO_CONTENT);
    }

    return { data, status: HttpStatus.OK, error: null };
  }
}
