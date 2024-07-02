/*
------------------------------------------------------------------------------ 
This code was generated by Amplication. 
 
Changes to this file will be lost if the code is regenerated. 

There are other ways to to customize your code, see this doc to learn more
https://docs.amplication.com/how-to/custom-code

------------------------------------------------------------------------------
  */
import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { StringNullableFilter } from "../../util/StringNullableFilter";
import { Type } from "class-transformer";
import { IsOptional, IsEnum } from "class-validator";
import { StringFilter } from "../../util/StringFilter";
import { DateTimeNullableFilter } from "../../util/DateTimeNullableFilter";
import { EnumCardIssueRequestRequestStatus } from "./EnumCardIssueRequestRequestStatus";
import { EnumCardIssueRequestSubscriptionType } from "./EnumCardIssueRequestSubscriptionType";

@InputType()
class CardIssueRequestWhereInput {
  @ApiProperty({
    required: false,
    type: StringNullableFilter,
  })
  @Type(() => StringNullableFilter)
  @IsOptional()
  @Field(() => StringNullableFilter, {
    nullable: true,
  })
  businessCode?: StringNullableFilter;

  @ApiProperty({
    required: false,
    type: StringNullableFilter,
  })
  @Type(() => StringNullableFilter)
  @IsOptional()
  @Field(() => StringNullableFilter, {
    nullable: true,
  })
  cardRequestId?: StringNullableFilter;

  @ApiProperty({
    required: false,
    type: StringFilter,
  })
  @Type(() => StringFilter)
  @IsOptional()
  @Field(() => StringFilter, {
    nullable: true,
  })
  id?: StringFilter;

  @ApiProperty({
    required: false,
    type: DateTimeNullableFilter,
  })
  @Type(() => DateTimeNullableFilter)
  @IsOptional()
  @Field(() => DateTimeNullableFilter, {
    nullable: true,
  })
  issueDate?: DateTimeNullableFilter;

  @ApiProperty({
    required: false,
    enum: EnumCardIssueRequestRequestStatus,
  })
  @IsEnum(EnumCardIssueRequestRequestStatus)
  @IsOptional()
  @Field(() => EnumCardIssueRequestRequestStatus, {
    nullable: true,
  })
  requestStatus?: "Option1";

  @ApiProperty({
    required: false,
    enum: EnumCardIssueRequestSubscriptionType,
  })
  @IsEnum(EnumCardIssueRequestSubscriptionType)
  @IsOptional()
  @Field(() => EnumCardIssueRequestSubscriptionType, {
    nullable: true,
  })
  subscriptionType?: "Option1";

  @ApiProperty({
    required: false,
    type: StringNullableFilter,
  })
  @Type(() => StringNullableFilter)
  @IsOptional()
  @Field(() => StringNullableFilter, {
    nullable: true,
  })
  userId?: StringNullableFilter;
}

export { CardIssueRequestWhereInput as CardIssueRequestWhereInput };
