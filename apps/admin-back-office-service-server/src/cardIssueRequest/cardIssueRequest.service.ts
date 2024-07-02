import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CardIssueRequestServiceBase } from "./base/cardIssueRequest.service.base";

@Injectable()
export class CardIssueRequestService extends CardIssueRequestServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
