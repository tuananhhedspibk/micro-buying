import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { EventSourcingHandler } from 'nestjs-event-sourcing';

import { CreateItemCommand } from './command';
import { ItemAggregate } from '../../common/aggregate/item.aggregate';

@CommandHandler(CreateItemCommand)
export class CreateItemCommandHandler
  implements ICommandHandler<CreateItemCommand, void>
{
  @Inject(EventSourcingHandler)
  private readonly eventSourcingHandler: EventSourcingHandler<ItemAggregate>;

  @Inject(EventPublisher)
  private readonly publiser: EventPublisher;

  public async execute(command: CreateItemCommand): Promise<void> {
    const aggregate: ItemAggregate = new ItemAggregate();

    this.publiser.mergeObjectContext(aggregate as any);
    aggregate.created({
      code: command.code,
      name: command.name,
      image: command.image,
    });

    await this.eventSourcingHandler.save(aggregate);

    aggregate.commit();
  }
}
