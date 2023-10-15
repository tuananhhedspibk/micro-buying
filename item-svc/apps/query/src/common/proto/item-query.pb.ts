/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "item_query";

export interface GetItemRequest {
  id: string;
}

export interface GetItemResponse {
  status: number;
  error: string[];
  data: ItemData | undefined;
}

export interface ItemData {
  id: string;
  code: string;
  name: string;
  image: string;
}

export const ITEM_QUERY_PACKAGE_NAME = "item_query";

export interface ItemQueryServiceClient {
  getItem(request: GetItemRequest): Observable<GetItemResponse>;
}

export interface ItemQueryServiceController {
  getItem(request: GetItemRequest): Promise<GetItemResponse> | Observable<GetItemResponse> | GetItemResponse;
}

export function ItemQueryServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["getItem"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("ItemQueryService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("ItemQueryService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const ITEM_QUERY_SERVICE_NAME = "ItemQueryService";
