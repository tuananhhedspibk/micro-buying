import {
  Controller,
  Inject,
  OnApplicationBootstrap,
  OnApplicationShutdown,
} from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { ClientKafka, MessagePattern, Payload } from '@nestjs/microservices';

import { KAFKA_SERVICE } from '../../../utils/constants';

import { MessagePattern as KafkaMessagePattern } from '@shared/kafka/constants';
import { OrderCreatedEvent } from '@shared/events/order-created.event';

@Controller()
export class OrderCreatedConsumer
  implements OnApplicationBootstrap, OnApplicationShutdown {
  @Inject(KAFKA_SERVICE)
  private readonly kafkaClient: ClientKafka;

  @Inject(EventBus)
  private readonly eventBus: EventBus;

  public onApplicationBootstrap() {
    this.kafkaClient.subscribeToResponseOf(
      KafkaMessagePattern.OrderCreatedEvent,
    );
  }

  public onApplicationShutdown() {
    this.kafkaClient.close();
  }

  @MessagePattern(KafkaMessagePattern.OrderCreatedEvent)
  private consume(@Payload() message: any): void {
    const event: OrderCreatedEvent = new OrderCreatedEvent({ ...message });

    this.eventBus.publish(event);
  }
}
