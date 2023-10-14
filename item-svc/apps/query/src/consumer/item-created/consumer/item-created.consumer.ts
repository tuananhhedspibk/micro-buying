import {
  Controller,
  Inject,
  OnApplicationBootstrap,
  OnApplicationShutdown,
} from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { ClientKafka, MessagePattern, Payload } from '@nestjs/microservices';

import { KAFKA_SERVICE } from '../../../utils/constants';

import { ItemCreatedEvent } from '@shared/events/item-created.event';

import { MessagePattern as KafkaMessagePattern } from '@shared/kafka/constants';

@Controller()
export class ItemCreatedConsumer
  implements OnApplicationBootstrap, OnApplicationShutdown {
  @Inject(KAFKA_SERVICE)
  private readonly kafkaClient: ClientKafka;

  @Inject(EventBus)
  private readonly eventBus: EventBus;

  public onApplicationBootstrap() {
    this.kafkaClient.subscribeToResponseOf(
      KafkaMessagePattern.ItemCreatedEvent,
    );
  }

  public onApplicationShutdown() {
    this.kafkaClient.close();
  }

  @MessagePattern(KafkaMessagePattern.ItemCreatedEvent)
  private consume(@Payload() message: any): void {
    const event: ItemCreatedEvent = new ItemCreatedEvent({ ...message });

    this.eventBus.publish(event);
  }
}
