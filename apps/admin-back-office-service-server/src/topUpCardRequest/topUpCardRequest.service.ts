import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { TopUpCardRequestServiceBase } from "./base/topUpCardRequest.service.base";

@Injectable()
export class TopUpCardRequestService extends TopUpCardRequestServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
