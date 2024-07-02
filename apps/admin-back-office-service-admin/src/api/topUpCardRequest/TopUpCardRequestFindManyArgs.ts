import { TopUpCardRequestWhereInput } from "./TopUpCardRequestWhereInput";
import { TopUpCardRequestOrderByInput } from "./TopUpCardRequestOrderByInput";

export type TopUpCardRequestFindManyArgs = {
  where?: TopUpCardRequestWhereInput;
  orderBy?: Array<TopUpCardRequestOrderByInput>;
  skip?: number;
  take?: number;
};
