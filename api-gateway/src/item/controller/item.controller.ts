import {
  Controller,
  Inject,
  OnModuleInit,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  CreateItemRequest,
  CreateItemResponse,
  ITEM_COMMAND_SERVICE_NAME,
  ItemCommandServiceClient,
} from '../proto/item-command.pb';
import { ClientGrpc } from '@nestjs/microservices';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Controller('item')
export class ItemController implements OnModuleInit {
  private commandSvc: ItemCommandServiceClient;

  @Inject(ITEM_COMMAND_SERVICE_NAME)
  private readonly commandClient: ClientGrpc;

  public onModuleInit() {
    this.commandSvc = this.commandClient.getService<ItemCommandServiceClient>(
      ITEM_COMMAND_SERVICE_NAME,
    );
  }

  @Post()
  @UseGuards(AuthGuard)
  private async createItem(
    @Req() req: Request,
  ): Promise<Observable<CreateItemResponse>> {
    const body: CreateItemRequest = req.body;

    return this.commandSvc.createItem(body);
  }
}
