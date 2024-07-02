import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import { TopUpCardRequestService } from "./topUpCardRequest.service";
import { TopUpCardRequestControllerBase } from "./base/topUpCardRequest.controller.base";

@swagger.ApiTags("topUpCardRequests")
@common.Controller("topUpCardRequests")
export class TopUpCardRequestController extends TopUpCardRequestControllerBase {
  constructor(protected readonly service: TopUpCardRequestService) {
    super(service);
  }
}
