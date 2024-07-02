import { Test } from "@nestjs/testing";
import {
  INestApplication,
  HttpStatus,
  ExecutionContext,
  CallHandler,
} from "@nestjs/common";
import request from "supertest";
import { ACGuard } from "nest-access-control";
import { DefaultAuthGuard } from "../../auth/defaultAuth.guard";
import { ACLModule } from "../../auth/acl.module";
import { AclFilterResponseInterceptor } from "../../interceptors/aclFilterResponse.interceptor";
import { AclValidateRequestInterceptor } from "../../interceptors/aclValidateRequest.interceptor";
import { map } from "rxjs";
import { TopUpCardRequestController } from "../topUpCardRequest.controller";
import { TopUpCardRequestService } from "../topUpCardRequest.service";

const nonExistingId = "nonExistingId";
const existingId = "existingId";
const CREATE_INPUT = {
  amount: 42.42,
  createdAt: new Date(),
  currency: "exampleCurrency",
  id: "exampleId",
  payementMethod: "examplePayementMethod",
  requestDate: new Date(),
  topupRequestId: "exampleTopupRequestId",
  updatedAt: new Date(),
  userId: "exampleUserId",
};
const CREATE_RESULT = {
  amount: 42.42,
  createdAt: new Date(),
  currency: "exampleCurrency",
  id: "exampleId",
  payementMethod: "examplePayementMethod",
  requestDate: new Date(),
  topupRequestId: "exampleTopupRequestId",
  updatedAt: new Date(),
  userId: "exampleUserId",
};
const FIND_MANY_RESULT = [
  {
    amount: 42.42,
    createdAt: new Date(),
    currency: "exampleCurrency",
    id: "exampleId",
    payementMethod: "examplePayementMethod",
    requestDate: new Date(),
    topupRequestId: "exampleTopupRequestId",
    updatedAt: new Date(),
    userId: "exampleUserId",
  },
];
const FIND_ONE_RESULT = {
  amount: 42.42,
  createdAt: new Date(),
  currency: "exampleCurrency",
  id: "exampleId",
  payementMethod: "examplePayementMethod",
  requestDate: new Date(),
  topupRequestId: "exampleTopupRequestId",
  updatedAt: new Date(),
  userId: "exampleUserId",
};

const service = {
  createTopUpCardRequest() {
    return CREATE_RESULT;
  },
  topUpCardRequests: () => FIND_MANY_RESULT,
  topUpCardRequest: ({ where }: { where: { id: string } }) => {
    switch (where.id) {
      case existingId:
        return FIND_ONE_RESULT;
      case nonExistingId:
        return null;
    }
  },
};

const basicAuthGuard = {
  canActivate: (context: ExecutionContext) => {
    const argumentHost = context.switchToHttp();
    const request = argumentHost.getRequest();
    request.user = {
      roles: ["user"],
    };
    return true;
  },
};

const acGuard = {
  canActivate: () => {
    return true;
  },
};

const aclFilterResponseInterceptor = {
  intercept: (context: ExecutionContext, next: CallHandler) => {
    return next.handle().pipe(
      map((data) => {
        return data;
      })
    );
  },
};
const aclValidateRequestInterceptor = {
  intercept: (context: ExecutionContext, next: CallHandler) => {
    return next.handle();
  },
};

describe("TopUpCardRequest", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: TopUpCardRequestService,
          useValue: service,
        },
      ],
      controllers: [TopUpCardRequestController],
      imports: [ACLModule],
    })
      .overrideGuard(DefaultAuthGuard)
      .useValue(basicAuthGuard)
      .overrideGuard(ACGuard)
      .useValue(acGuard)
      .overrideInterceptor(AclFilterResponseInterceptor)
      .useValue(aclFilterResponseInterceptor)
      .overrideInterceptor(AclValidateRequestInterceptor)
      .useValue(aclValidateRequestInterceptor)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  test("POST /topUpCardRequests", async () => {
    await request(app.getHttpServer())
      .post("/topUpCardRequests")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        createdAt: CREATE_RESULT.createdAt.toISOString(),
        requestDate: CREATE_RESULT.requestDate.toISOString(),
        updatedAt: CREATE_RESULT.updatedAt.toISOString(),
      });
  });

  test("GET /topUpCardRequests", async () => {
    await request(app.getHttpServer())
      .get("/topUpCardRequests")
      .expect(HttpStatus.OK)
      .expect([
        {
          ...FIND_MANY_RESULT[0],
          createdAt: FIND_MANY_RESULT[0].createdAt.toISOString(),
          requestDate: FIND_MANY_RESULT[0].requestDate.toISOString(),
          updatedAt: FIND_MANY_RESULT[0].updatedAt.toISOString(),
        },
      ]);
  });

  test("GET /topUpCardRequests/:id non existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/topUpCardRequests"}/${nonExistingId}`)
      .expect(HttpStatus.NOT_FOUND)
      .expect({
        statusCode: HttpStatus.NOT_FOUND,
        message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
        error: "Not Found",
      });
  });

  test("GET /topUpCardRequests/:id existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/topUpCardRequests"}/${existingId}`)
      .expect(HttpStatus.OK)
      .expect({
        ...FIND_ONE_RESULT,
        createdAt: FIND_ONE_RESULT.createdAt.toISOString(),
        requestDate: FIND_ONE_RESULT.requestDate.toISOString(),
        updatedAt: FIND_ONE_RESULT.updatedAt.toISOString(),
      });
  });

  test("POST /topUpCardRequests existing resource", async () => {
    const agent = request(app.getHttpServer());
    await agent
      .post("/topUpCardRequests")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        createdAt: CREATE_RESULT.createdAt.toISOString(),
        requestDate: CREATE_RESULT.requestDate.toISOString(),
        updatedAt: CREATE_RESULT.updatedAt.toISOString(),
      })
      .then(function () {
        agent
          .post("/topUpCardRequests")
          .send(CREATE_INPUT)
          .expect(HttpStatus.CONFLICT)
          .expect({
            statusCode: HttpStatus.CONFLICT,
          });
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
