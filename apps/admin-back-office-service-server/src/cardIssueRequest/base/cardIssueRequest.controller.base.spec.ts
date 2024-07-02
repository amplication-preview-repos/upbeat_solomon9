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
import { CardIssueRequestController } from "../cardIssueRequest.controller";
import { CardIssueRequestService } from "../cardIssueRequest.service";

const nonExistingId = "nonExistingId";
const existingId = "existingId";
const CREATE_INPUT = {
  businessCode: "exampleBusinessCode",
  cardRequestId: "exampleCardRequestId",
  createdAt: new Date(),
  id: "exampleId",
  issueDate: new Date(),
  updatedAt: new Date(),
  userId: "exampleUserId",
};
const CREATE_RESULT = {
  businessCode: "exampleBusinessCode",
  cardRequestId: "exampleCardRequestId",
  createdAt: new Date(),
  id: "exampleId",
  issueDate: new Date(),
  updatedAt: new Date(),
  userId: "exampleUserId",
};
const FIND_MANY_RESULT = [
  {
    businessCode: "exampleBusinessCode",
    cardRequestId: "exampleCardRequestId",
    createdAt: new Date(),
    id: "exampleId",
    issueDate: new Date(),
    updatedAt: new Date(),
    userId: "exampleUserId",
  },
];
const FIND_ONE_RESULT = {
  businessCode: "exampleBusinessCode",
  cardRequestId: "exampleCardRequestId",
  createdAt: new Date(),
  id: "exampleId",
  issueDate: new Date(),
  updatedAt: new Date(),
  userId: "exampleUserId",
};

const service = {
  createCardIssueRequest() {
    return CREATE_RESULT;
  },
  cardIssueRequests: () => FIND_MANY_RESULT,
  cardIssueRequest: ({ where }: { where: { id: string } }) => {
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

describe("CardIssueRequest", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: CardIssueRequestService,
          useValue: service,
        },
      ],
      controllers: [CardIssueRequestController],
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

  test("POST /cardIssueRequests", async () => {
    await request(app.getHttpServer())
      .post("/cardIssueRequests")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        createdAt: CREATE_RESULT.createdAt.toISOString(),
        issueDate: CREATE_RESULT.issueDate.toISOString(),
        updatedAt: CREATE_RESULT.updatedAt.toISOString(),
      });
  });

  test("GET /cardIssueRequests", async () => {
    await request(app.getHttpServer())
      .get("/cardIssueRequests")
      .expect(HttpStatus.OK)
      .expect([
        {
          ...FIND_MANY_RESULT[0],
          createdAt: FIND_MANY_RESULT[0].createdAt.toISOString(),
          issueDate: FIND_MANY_RESULT[0].issueDate.toISOString(),
          updatedAt: FIND_MANY_RESULT[0].updatedAt.toISOString(),
        },
      ]);
  });

  test("GET /cardIssueRequests/:id non existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/cardIssueRequests"}/${nonExistingId}`)
      .expect(HttpStatus.NOT_FOUND)
      .expect({
        statusCode: HttpStatus.NOT_FOUND,
        message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
        error: "Not Found",
      });
  });

  test("GET /cardIssueRequests/:id existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/cardIssueRequests"}/${existingId}`)
      .expect(HttpStatus.OK)
      .expect({
        ...FIND_ONE_RESULT,
        createdAt: FIND_ONE_RESULT.createdAt.toISOString(),
        issueDate: FIND_ONE_RESULT.issueDate.toISOString(),
        updatedAt: FIND_ONE_RESULT.updatedAt.toISOString(),
      });
  });

  test("POST /cardIssueRequests existing resource", async () => {
    const agent = request(app.getHttpServer());
    await agent
      .post("/cardIssueRequests")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        createdAt: CREATE_RESULT.createdAt.toISOString(),
        issueDate: CREATE_RESULT.issueDate.toISOString(),
        updatedAt: CREATE_RESULT.updatedAt.toISOString(),
      })
      .then(function () {
        agent
          .post("/cardIssueRequests")
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
