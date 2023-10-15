import {
  Controller,
  Get,
  Inject,
  OnModuleInit,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  CreateItemRequest,
  CreateItemResponse,
  ITEM_COMMAND_SERVICE_NAME,
  ItemCommandServiceClient,
  UpdateItemRequest,
  UpdateItemResponse,
} from '../proto/item-command.pb';
import { ClientGrpc } from '@nestjs/microservices';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { Request } from 'express';
import { Observable } from 'rxjs';
import {
  ITEM_QUERY_SERVICE_NAME,
  ItemQueryServiceClient,
} from '../proto/item-query.pb';

@Controller('item')
export class ItemController implements OnModuleInit {
  private commandSvc: ItemCommandServiceClient;
  private querySvc: ItemQueryServiceClient;

  @Inject(ITEM_COMMAND_SERVICE_NAME)
  private readonly commandClient: ClientGrpc;

  @Inject(ITEM_QUERY_SERVICE_NAME)
  private readonly queryClient: ClientGrpc;

  public onModuleInit() {
    this.commandSvc = this.commandClient.getService<ItemCommandServiceClient>(
      ITEM_COMMAND_SERVICE_NAME,
    );
    this.querySvc = this.queryClient.getService<ItemQueryServiceClient>(
      ITEM_QUERY_SERVICE_NAME,
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

  @Put()
  @UseGuards(AuthGuard)
  private async updateItem(
    @Req() req: Request,
  ): Promise<Observable<UpdateItemResponse>> {
    const body: UpdateItemRequest = req.body;

    console.log('body', body);

    return this.commandSvc.updateItem(body);
  }

  @Get('/:id')
  @UseGuards(AuthGuard)
  private getItem(@Param() id: string) {
    return this.querySvc.getItem({ id });
  }
}
