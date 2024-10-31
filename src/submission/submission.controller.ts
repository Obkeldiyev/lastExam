import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Headers,
} from '@nestjs/common';
import { SubmissionService } from './submission.service';
import { CreateSubmissionDto } from './dto/create-submission.dto';
import { UpdateSubmissionDto } from './dto/update-submission.dto';

@Controller('submission')
export class SubmissionController {
  constructor(private readonly submissionService: SubmissionService) {}

  @Post()
  create(
    @Body() createSubmissionDto: CreateSubmissionDto,
    @Headers('Authorization') token: string,
  ) {
    return this.submissionService.create(createSubmissionDto, token);
  }

  @Get('all')
  findAll() {
    return this.submissionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.submissionService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSubmissionDto: UpdateSubmissionDto,
    @Headers('Authorization') token: string,
  ) {
    return this.submissionService.update(+id, updateSubmissionDto, token);
  }

  @Get()
  getMyHometasks(@Headers('Authorization') token: string) {
    return this.submissionService.getMyHometasks(token);
  }

  @Post('accepting')
  acceptSubmission(@Body() id: number) {
    return this.submissionService.acceptSubmission(id);
  }

  @Post('accepting')
  rejectSubmission(@Body() id: number) {
    return this.submissionService.rejectSubmission(id);
  }
}
