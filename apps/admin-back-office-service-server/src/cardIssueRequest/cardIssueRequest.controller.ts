import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import { CardIssueRequestService } from "./cardIssueRequest.service";
import { CardIssueRequestControllerBase } from "./base/cardIssueRequest.controller.base";

@swagger.ApiTags("cardIssueRequests")
@common.Controller("cardIssueRequests")
export class CardIssueRequestController extends CardIssueRequestControllerBase {
  constructor(protected readonly service: CardIssueRequestService) {
    super(service);
  }
}
