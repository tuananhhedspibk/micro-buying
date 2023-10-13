import { Controller, Inject } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ItemCreatedEvent } from '@shared/events/item-created.event';
import { plainToInstance } from 'class-transformer';
import { KafkaMessage } from 'kafkajs';

@Controller()
export class ItemCreatedConsumer {
  @Inject(EventBus)
  private readonly eventBus: EventBus;

  @MessagePattern('ItemCreated')
  private consume(@Payload() { value }: KafkaMessage): void {
    const event: ItemCreatedEvent = plainToInstance(ItemCreatedEvent, value);

    this.eventBus.publish(event);
  }
}
