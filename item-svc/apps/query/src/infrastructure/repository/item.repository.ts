import { Repository } from 'typeorm';
import { Item } from '../entity/item.entity';

export class ItemRepository extends Repository<Item> {}
