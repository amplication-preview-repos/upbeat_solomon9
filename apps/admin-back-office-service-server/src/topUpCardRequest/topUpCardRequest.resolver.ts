import * as graphql from "@nestjs/graphql";
import { TopUpCardRequestResolverBase } from "./base/topUpCardRequest.resolver.base";
import { TopUpCardRequest } from "./base/TopUpCardRequest";
import { TopUpCardRequestService } from "./topUpCardRequest.service";

@graphql.Resolver(() => TopUpCardRequest)
export class TopUpCardRequestResolver extends TopUpCardRequestResolverBase {
  constructor(protected readonly service: TopUpCardRequestService) {
    super(service);
  }
}
