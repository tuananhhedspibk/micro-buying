import {
  ITEM_COMMAND_SERVICE_NAME,
  UpdateItemResponse,
} from '../../common/proto/item-command.pb';
import { Body, Controller, HttpStatus, Inject } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { GrpcMethod } from '@nestjs/microservices';
import { UpdateItemDto } from './update-item.dto';
import { UpdateItemCommand } from '../command/command';

@Controller()
export class UpdateItemController {
  @Inject(CommandBus)
  private readonly commandBus: CommandBus;

  @GrpcMethod(ITEM_COMMAND_SERVICE_NAME, 'UpdateItem')
  private async updateItem(
    @Body() payload: UpdateItemDto,
  ): Promise<UpdateItemResponse> {
    const command: UpdateItemCommand = new UpdateItemCommand(payload);

    await this.commandBus.execute(command);

    return { status: HttpStatus.OK, error: null };
  }
}
