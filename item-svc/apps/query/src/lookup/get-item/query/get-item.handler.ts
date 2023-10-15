import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetItemQuery } from './get-item.query';
import { ItemData } from '../../../common/proto/item-query.pb';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from '../../../infrastructure/entity/item.entity';
import { Repository } from 'typeorm';

@QueryHandler(GetItemQuery)
export class GetItemQueryHandler
  implements IQueryHandler<GetItemQuery, ItemData>
{
  @InjectRepository(Item)
  private readonly repository: Repository<Item>;

  async execute(query: GetItemQuery): Promise<ItemData> {
    return this.repository.findOne({ where: { id: query.id } });
  }
}
