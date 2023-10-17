import {
  Inject,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Kafka, Producer } from 'kafkajs';

import { ClientId as KafkaClientId } from '@shared/kafka/constants';
import { BaseEvent } from 'nestjs-event-sourcing';

@Injectable()
export class OrderEventProducer implements OnModuleInit, OnModuleDestroy {
  private producer: Producer;

  @Inject(ConfigService)
  private readonly config: ConfigService;

  public async onModuleInit(): Promise<void> {
    const kafka: Kafka = new Kafka({
      clientId: KafkaClientId.Order,
      brokers: [this.config.get('KAFKA_URL')],
    });

    this.producer = kafka.producer();

    await this.producer.connect();
  }

  public onModuleDestroy(): void {
    this.producer.disconnect();
  }

  public produce<T extends BaseEvent>(topic: string, event: T): void {
    this.producer.send({ topic, messages: [{ value: JSON.stringify(event) }] });
  }
}
