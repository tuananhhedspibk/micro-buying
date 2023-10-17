/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "item_command";

export interface CreateItemRequest {
  code: string;
  name: string;
  image: string;
}

export interface CreateItemResponse {
  status: number;
  error: string[];
}

export interface UpdateItemRequest {
  id: string;
  code?: string | undefined;
  name?: string | undefined;
  image?: string | undefined;
  status?: string | undefined;
}

export interface UpdateItemResponse {
  status: number;
  error: string[];
}

export const ITEM_COMMAND_PACKAGE_NAME = "item_command";

export interface ItemCommandServiceClient {
  createItem(request: CreateItemRequest): Observable<CreateItemResponse>;

  updateItem(request: UpdateItemRequest): Observable<UpdateItemResponse>;
}

export interface ItemCommandServiceController {
  createItem(
    request: CreateItemRequest,
  ): Promise<CreateItemResponse> | Observable<CreateItemResponse> | CreateItemResponse;

  updateItem(
    request: UpdateItemRequest,
  ): Promise<UpdateItemResponse> | Observable<UpdateItemResponse> | UpdateItemResponse;
}

export function ItemCommandServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["createItem", "updateItem"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("ItemCommandService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("ItemCommandService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const ITEM_COMMAND_SERVICE_NAME = "ItemCommandService";
