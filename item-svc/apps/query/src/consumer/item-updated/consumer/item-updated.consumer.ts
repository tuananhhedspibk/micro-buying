import {
  Controller,
  Inject,
  OnApplicationBootstrap,
  OnApplicationShutdown,
} from '@nestjs/common';
import { KAFKA_SERVICE } from '../../../utils/constants';
import { ClientKafka, MessagePattern, Payload } from '@nestjs/microservices';
import { EventBus } from '@nestjs/cqrs';

import { MessagePattern as KafkaMessagePattern } from '@shared/kafka/constants';
import { ItemUpdatedEvent } from '@shared/events/item-updated.event';

@Controller()
export class ItemUpdatedConsumer
  implements OnApplicationBootstrap, OnApplicationShutdown {
  @Inject(KAFKA_SERVICE)
  private readonly kafkaClient: ClientKafka;

  @Inject(EventBus)
  private readonly eventBus: EventBus;

  public onApplicationBootstrap() {
    this.kafkaClient.subscribeToResponseOf(
      KafkaMessagePattern.ItemUpdatedEvent,
    );
  }

  public onApplicationShutdown() {
    this.kafkaClient.close();
  }

  @MessagePattern(KafkaMessagePattern.ItemUpdatedEvent)
  private consume(@Payload() message: any): void {
    const event: ItemUpdatedEvent = new ItemUpdatedEvent({ ...message });

    this.eventBus.publish(event);
  }
}
