import {
  Controller,
  Get,
  Inject,
  OnModuleInit,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Request } from 'express';
import { Observable } from 'rxjs';

import { AuthGuard } from '../../auth/guard/auth.guard';
import {
  CreateOrderRequest,
  CreateOrderResponse,
  ORDER_COMMAND_SERVICE_NAME,
  OrderCommandServiceClient,
} from '../proto/order-command.pb';
import {
  GetOrderResponse,
  ORDER_QUERY_SERVICE_NAME,
  OrderQueryServiceClient,
} from '../proto/order-query.pb';

@Controller('order')
export class OrderController implements OnModuleInit {
  private commandSvc: OrderCommandServiceClient;
  private querySvc: OrderQueryServiceClient;

  @Inject(ORDER_COMMAND_SERVICE_NAME)
  private readonly commandClient: ClientGrpc;

  @Inject(ORDER_QUERY_SERVICE_NAME)
  private readonly queryClient: ClientGrpc;

  public onModuleInit() {
    this.commandSvc = this.commandClient.getService<OrderCommandServiceClient>(
      ORDER_COMMAND_SERVICE_NAME,
    );
    this.querySvc = this.queryClient.getService<OrderQueryServiceClient>(
      ORDER_QUERY_SERVICE_NAME,
    );
  }

  @Post()
  @UseGuards(AuthGuard)
  private async createOrder(
    @Req() req: Request,
  ): Promise<Observable<CreateOrderResponse>> {
    const body: CreateOrderRequest = req.body;

    return this.commandSvc.createOrder(body);
  }

  @Get('/:id')
  @UseGuards(AuthGuard)
  private async getOrder(
    @Param() id: string,
  ): Promise<Observable<GetOrderResponse>> {
    return this.querySvc.getOrder({ id });
  }
}
