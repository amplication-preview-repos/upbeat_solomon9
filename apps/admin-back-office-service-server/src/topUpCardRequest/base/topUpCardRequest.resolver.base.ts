/*
------------------------------------------------------------------------------ 
This code was generated by Amplication. 
 
Changes to this file will be lost if the code is regenerated. 

There are other ways to to customize your code, see this doc to learn more
https://docs.amplication.com/how-to/custom-code

------------------------------------------------------------------------------
  */
import * as graphql from "@nestjs/graphql";
import { GraphQLError } from "graphql";
import { isRecordNotFoundError } from "../../prisma.util";
import { MetaQueryPayload } from "../../util/MetaQueryPayload";
import { TopUpCardRequest } from "./TopUpCardRequest";
import { TopUpCardRequestCountArgs } from "./TopUpCardRequestCountArgs";
import { TopUpCardRequestFindManyArgs } from "./TopUpCardRequestFindManyArgs";
import { TopUpCardRequestFindUniqueArgs } from "./TopUpCardRequestFindUniqueArgs";
import { CreateTopUpCardRequestArgs } from "./CreateTopUpCardRequestArgs";
import { UpdateTopUpCardRequestArgs } from "./UpdateTopUpCardRequestArgs";
import { DeleteTopUpCardRequestArgs } from "./DeleteTopUpCardRequestArgs";
import { TopUpCardRequestService } from "../topUpCardRequest.service";
@graphql.Resolver(() => TopUpCardRequest)
export class TopUpCardRequestResolverBase {
  constructor(protected readonly service: TopUpCardRequestService) {}

  async _topUpCardRequestsMeta(
    @graphql.Args() args: TopUpCardRequestCountArgs
  ): Promise<MetaQueryPayload> {
    const result = await this.service.count(args);
    return {
      count: result,
    };
  }

  @graphql.Query(() => [TopUpCardRequest])
  async topUpCardRequests(
    @graphql.Args() args: TopUpCardRequestFindManyArgs
  ): Promise<TopUpCardRequest[]> {
    return this.service.topUpCardRequests(args);
  }

  @graphql.Query(() => TopUpCardRequest, { nullable: true })
  async topUpCardRequest(
    @graphql.Args() args: TopUpCardRequestFindUniqueArgs
  ): Promise<TopUpCardRequest | null> {
    const result = await this.service.topUpCardRequest(args);
    if (result === null) {
      return null;
    }
    return result;
  }

  @graphql.Mutation(() => TopUpCardRequest)
  async createTopUpCardRequest(
    @graphql.Args() args: CreateTopUpCardRequestArgs
  ): Promise<TopUpCardRequest> {
    return await this.service.createTopUpCardRequest({
      ...args,
      data: args.data,
    });
  }

  @graphql.Mutation(() => TopUpCardRequest)
  async updateTopUpCardRequest(
    @graphql.Args() args: UpdateTopUpCardRequestArgs
  ): Promise<TopUpCardRequest | null> {
    try {
      return await this.service.updateTopUpCardRequest({
        ...args,
        data: args.data,
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new GraphQLError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @graphql.Mutation(() => TopUpCardRequest)
  async deleteTopUpCardRequest(
    @graphql.Args() args: DeleteTopUpCardRequestArgs
  ): Promise<TopUpCardRequest | null> {
    try {
      return await this.service.deleteTopUpCardRequest(args);
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new GraphQLError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }
}
