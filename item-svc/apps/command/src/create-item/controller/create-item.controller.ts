import {
  CreateItemResponse,
  ITEM_COMMAND_SERVICE_NAME,
} from '@command/common/proto/item-command.pb';
import { Body, Controller, HttpStatus, Inject } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { GrpcMethod } from '@nestjs/microservices';
import { CreateItemDto } from './create-item.dto';
import { CreateItemCommand } from '../command/command';

@Controller()
export class CreateItemController {
  @Inject(CommandBus)
  private readonly commandBus: CommandBus;

  @GrpcMethod(ITEM_COMMAND_SERVICE_NAME, 'CreateItem')
  private async createItem(
    @Body() payload: CreateItemDto,
  ): Promise<CreateItemResponse> {
    const command: CreateItemCommand = new CreateItemCommand(payload);

    await this.commandBus.execute(command);

    return { status: HttpStatus.OK, error: null };
  }
}
