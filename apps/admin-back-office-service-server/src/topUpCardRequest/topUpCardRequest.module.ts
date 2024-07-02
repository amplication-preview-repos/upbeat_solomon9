import { Module } from "@nestjs/common";
import { TopUpCardRequestModuleBase } from "./base/topUpCardRequest.module.base";
import { TopUpCardRequestService } from "./topUpCardRequest.service";
import { TopUpCardRequestController } from "./topUpCardRequest.controller";
import { TopUpCardRequestResolver } from "./topUpCardRequest.resolver";

@Module({
  imports: [TopUpCardRequestModuleBase],
  controllers: [TopUpCardRequestController],
  providers: [TopUpCardRequestService, TopUpCardRequestResolver],
  exports: [TopUpCardRequestService],
})
export class TopUpCardRequestModule {}
