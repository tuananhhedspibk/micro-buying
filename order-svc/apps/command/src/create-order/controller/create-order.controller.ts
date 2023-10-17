import {
  CreateOrderResponse,
  ORDER_COMMAND_SERVICE_NAME,
} from '../../common/proto/order-command.pb';
import { Body, Controller, HttpStatus, Inject } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { GrpcMethod } from '@nestjs/microservices';
import { CreateOrderDto } from './create-order.dto';
import { CreateOrderCommand } from '../command/command';

@Controller()
export class CreateOrderController {
  @Inject(CommandBus)
  private readonly commandBus: CommandBus;

  @GrpcMethod(ORDER_COMMAND_SERVICE_NAME, 'CreateOrder')
  private async createOrder(
    @Body() payload: CreateOrderDto,
  ): Promise<CreateOrderResponse> {
    const command: CreateOrderCommand = new CreateOrderCommand(payload);

    await this.commandBus.execute(command);

    return { status: HttpStatus.OK, error: null };
  }
}
