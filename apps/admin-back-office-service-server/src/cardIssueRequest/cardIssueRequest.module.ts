import { Module } from "@nestjs/common";
import { CardIssueRequestModuleBase } from "./base/cardIssueRequest.module.base";
import { CardIssueRequestService } from "./cardIssueRequest.service";
import { CardIssueRequestController } from "./cardIssueRequest.controller";
import { CardIssueRequestResolver } from "./cardIssueRequest.resolver";

@Module({
  imports: [CardIssueRequestModuleBase],
  controllers: [CardIssueRequestController],
  providers: [CardIssueRequestService, CardIssueRequestResolver],
  exports: [CardIssueRequestService],
})
export class CardIssueRequestModule {}
