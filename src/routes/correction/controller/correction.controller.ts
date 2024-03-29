import { inject, injectable } from "inversify";
import { CorrectionModel } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import ICorrectionController from "./correction.controller.interface";
import { AppRoute } from "../../../types/route.types";
import { ILogger } from "../../../logger";
import { FastifyReply, FastifyRequest } from "fastify";
import ICorrectionService from "../service/correction.service.interface";
import {
  CorrectionWithId,
  InputSearchCorrection,
  InputCreateCorrection,
  InputDeleteByFinancialPartIdCorrection,
  InputDeleteCorrection,
  InputUpdateCorrection,
} from "../types";
import { BaseController } from "../../../common/base-controller";
import { HTTPError } from "../../../error";
import { AuthGuardMiddleware } from "../../../middlewares";
import {
  validationSchemaCreate,
  validationSchemaDelete,
  validationSchemaDeleteByFinancialPartId,
  validationSchemaSearch,
  validationSchemaUpdate,
} from "../correction.validation.schema";
import { dependenciesType } from "../../../dependencies.types";

@injectable()
export default class CorrectionController extends BaseController implements ICorrectionController {
  private readonly url = "/corrections";

  public routes: AppRoute[] = [
    {
      url: this.url,
      method: "POST",
      handler: this.onCreateCorrection.bind(this),
      onRequest: [new AuthGuardMiddleware().execute],
      schema: validationSchemaCreate,
    },
    {
      url: this.url,
      method: "PUT",
      handler: this.onUpdateCorrection.bind(this),
      onRequest: [new AuthGuardMiddleware().execute],
      schema: validationSchemaUpdate,
    },
    {
      url: this.url + "/:correctionId",
      method: "DELETE",
      handler: this.onDeleteCorrection.bind(this),
      onRequest: [new AuthGuardMiddleware().execute],
      schema: validationSchemaDelete,
    },
    {
      url: this.url + "/financial-parts/:financialPartId",
      method: "DELETE",
      handler: this.onDeleteCorrectionByFinancialPartId.bind(this),
      onRequest: [new AuthGuardMiddleware().execute],
      schema: validationSchemaDeleteByFinancialPartId,
    },
    {
      url: this.url + "/search",
      method: "POST",
      handler: this.onSearchCorrection.bind(this),
      onRequest: [new AuthGuardMiddleware().execute],
      schema: validationSchemaSearch,
    },
  ];

  constructor(
    @inject(dependenciesType.ILogger) private readonly loggerService: ILogger,
    @inject(dependenciesType.ICorrectionService) private readonly correctionService: ICorrectionService,
  ) {
    super(loggerService);
  }

  private async onCreateCorrection(
    request: FastifyRequest<{ Body: InputCreateCorrection }>,
    replay: FastifyReply,
  ): Promise<void> {
    const newCorrection = await this.correctionService.create(request.body);
    !newCorrection && this.error(replay, new HTTPError(422, "Such a correction is already existed", request.body));
    newCorrection && this.create<CorrectionWithId>(replay, this.responseCorrectionAdapter(newCorrection));
  }

  private async onUpdateCorrection(
    request: FastifyRequest<{ Body: InputUpdateCorrection }>,
    replay: FastifyReply,
  ): Promise<void> {
    const updatedCorrection = await this.correctionService.update(request.body);
    if (!updatedCorrection) {
      this.error(replay, new HTTPError(400, `There is no such a correction with id: ${request.body.id} to update`));
      return;
    }

    this.ok<CorrectionWithId>(replay, this.responseCorrectionAdapter(updatedCorrection));
  }

  private async onDeleteCorrectionByFinancialPartId(
    request: FastifyRequest<{ Params: InputDeleteByFinancialPartIdCorrection }>,
    replay: FastifyReply,
  ): Promise<void> {
    try {
      const isDeleted = await this.correctionService.deleteCorrectionByFinancialPartId(request.params.financialPartId);
      isDeleted && this.ok<boolean>(replay, isDeleted);
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        this.error(replay, new HTTPError(400, e.code, e.meta));
      } else {
        // todo: не очень круто отдавать стек трейс в ответе, подумать об обработке ошибок
        this.error(replay, new HTTPError(500, "Unrecognized error", e));
      }
    }
  }

  private async onDeleteCorrection(
    request: FastifyRequest<{ Params: InputDeleteCorrection }>,
    replay: FastifyReply,
  ): Promise<void> {
    try {
      const isDeleted = await this.correctionService.delete(request.params.correctionId);
      if (!isDeleted) {
        this.error(
          replay,
          new HTTPError(400, `There is no such a correction with id: ${request.params.correctionId} to delete`),
        );
        return;
      }

      this.ok<boolean>(replay, isDeleted);
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        this.error(replay, new HTTPError(400, e.code, e.meta));
      } else {
        // todo: не очень круто отдавать стек трейс в ответе, подумать об обработке ошибок
        this.error(replay, new HTTPError(500, "Unrecognized error", e));
      }
    }
  }

  private async onSearchCorrection(
    request: FastifyRequest<{ Body: InputSearchCorrection }>,
    replay: FastifyReply,
  ): Promise<void> {
    const searchResult = await this.correctionService.search(request.body);
    this.ok<CorrectionWithId[]>(replay, searchResult.map(this.responseCorrectionAdapter));
  }

  private responseCorrectionAdapter(correction: CorrectionModel): CorrectionWithId {
    return {
      id: String(correction.id),
      name: correction.name,
      amount: correction.amount,
      type: correction.type
    };
  }
}
