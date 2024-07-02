import * as graphql from "@nestjs/graphql";
import { CardIssueRequestResolverBase } from "./base/cardIssueRequest.resolver.base";
import { CardIssueRequest } from "./base/CardIssueRequest";
import { CardIssueRequestService } from "./cardIssueRequest.service";

@graphql.Resolver(() => CardIssueRequest)
export class CardIssueRequestResolver extends CardIssueRequestResolverBase {
  constructor(protected readonly service: CardIssueRequestService) {
    super(service);
  }
}
