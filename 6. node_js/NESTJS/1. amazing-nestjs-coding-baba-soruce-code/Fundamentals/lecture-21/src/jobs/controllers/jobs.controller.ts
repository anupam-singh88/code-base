import {
  Body,
  Controller,
  Get,
  Param,
  ParseEnumPipe,
  ParseIntPipe,
  Put,
  Query,
  UsePipes,
  ParseUUIDPipe
    ParseArrayPipe//  npm i class-validator class-transformer
} from "@nestjs/common";
import { JobsService } from "../services/jobs.service";
import { JobType } from "../constants/jobs.constants";

@Controller("jobs")
@UsePipes(ParseIntPipe)
export class JobsController {
  constructor(private readonly jobsService: JobsService) { }

  @Get("ref/:refId")
  findJobByRefId(@Param("refId",
    new ParseUUIDPipe({ version: "4", errorHandler: "404" })) id: number) {
    return this.jobsService.findById(id);
  }
  @Get(":id")
  findJobById(@Param("id") id: number) {
    return this.jobsService.findById(id);
  }

  @Put("exp/:id")
  setUpdateJobExp(@Param("id") id: number, @Query("exp") exp: number) {
    return this.jobsService.setJobExp(id, exp);
  }

  // Order of execution = (Controller Level) ParseIntPipe -> (Method Arg Level `Body`) ParseEnumPipe
  @Put("type/:id")
  toggleJobType(
    @Param("id") id: number,
    @Body("type", new ParseEnumPipe(JobType)) type: JobType
  ) {
    return this.jobsService.toggleJobType(id, type);
  }

  @Get('search')
  findJobsById(@Query('id', new ParseArrayPipe({
    items: { type: Number, items: { type: Number } }
  })) id: number[]) {
    return this.jobsService.findById(id);
  }
}

