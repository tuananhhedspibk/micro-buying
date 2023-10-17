/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "order_command";

export interface ItemData {
  itemServiceId: string;
  code: string;
  name: string;
  image: string;
}

export interface CreateOrderRequest {
  items: ItemData[];
}

export interface CreateOrderResponse {
  status: number;
  error: string[];
}

export const ORDER_COMMAND_PACKAGE_NAME = "order_command";

export interface OrderCommandServiceClient {
  createOrder(request: CreateOrderRequest): Observable<CreateOrderResponse>;
}

export interface OrderCommandServiceController {
  createOrder(
    request: CreateOrderRequest,
  ): Promise<CreateOrderResponse> | Observable<CreateOrderResponse> | CreateOrderResponse;
}

export function OrderCommandServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["createOrder"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("OrderCommandService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("OrderCommandService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const ORDER_COMMAND_SERVICE_NAME = "OrderCommandService";
