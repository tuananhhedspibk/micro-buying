/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "order_query";

export interface ItemData {
  code: string;
  name: string;
  image: string;
}

export interface OrderData {
  buyDate: string;
  items: ItemData[];
}

export interface GetOrderRequest {
  id: string;
}

export interface GetOrderResponse {
  status: number;
  error: string[];
  data: OrderData | undefined;
}

export const ORDER_QUERY_PACKAGE_NAME = "order_query";

export interface OrderQueryServiceClient {
  getOrder(request: GetOrderRequest): Observable<GetOrderResponse>;
}

export interface OrderQueryServiceController {
  getOrder(request: GetOrderRequest): Promise<GetOrderResponse> | Observable<GetOrderResponse> | GetOrderResponse;
}

export function OrderQueryServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["getOrder"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("OrderQueryService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("OrderQueryService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const ORDER_QUERY_SERVICE_NAME = "OrderQueryService";
