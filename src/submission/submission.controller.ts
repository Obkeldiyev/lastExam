import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Headers,
  UseInterceptors,
} from '@nestjs/common';
import { SubmissionService } from './submission.service';
import { CreateSubmissionDto } from './dto/create-submission.dto';
import { UpdateSubmissionDto } from './dto/update-submission.dto';
import { VerifyStudentTokenInterceptor } from 'src/middlewares/verifyStudent';
import { VerifyTokenInterceptor } from 'src/middlewares/verifyToken';
import { VerifyTeacherTokenInterceptor } from 'src/middlewares/verifyTeacher';

@Controller('submission')
export class SubmissionController {
  constructor(private readonly submissionService: SubmissionService) {}

  @Post()
  @UseInterceptors(VerifyTokenInterceptor)
  @UseInterceptors(VerifyStudentTokenInterceptor)
  create(
    @Body() createSubmissionDto: CreateSubmissionDto,
    @Headers('Authorization') token: string,
  ) {
    return this.submissionService.create(createSubmissionDto, token);
  }

  @Get('all')
  @UseInterceptors(VerifyTokenInterceptor)
  @UseInterceptors(VerifyTeacherTokenInterceptor)
  findAll() {
    return this.submissionService.findAll();
  }

  @Get(':id')
  @UseInterceptors(VerifyTokenInterceptor)
  @UseInterceptors(VerifyTeacherTokenInterceptor)
  findOne(@Param('id') id: string) {
    return this.submissionService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(VerifyTokenInterceptor)
  @UseInterceptors(VerifyStudentTokenInterceptor)
  update(
    @Param('id') id: string,
    @Body() updateSubmissionDto: UpdateSubmissionDto,
    @Headers('Authorization') token: string,
  ) {
    return this.submissionService.update(+id, updateSubmissionDto, token);
  }

  @Get()
  @UseInterceptors(VerifyTokenInterceptor)
  @UseInterceptors(VerifyStudentTokenInterceptor)
  getMyHometasks(@Headers('Authorization') token: string) {
    return this.submissionService.getMyHometasks(token);
  }

  @Post('accepting')
  @UseInterceptors(VerifyTokenInterceptor)
  @UseInterceptors(VerifyTeacherTokenInterceptor)
  acceptSubmission(@Body() id: number) {
    return this.submissionService.acceptSubmission(+id);
  }

  @Post('rejecting')
  @UseInterceptors(VerifyTokenInterceptor)
  @UseInterceptors(VerifyTeacherTokenInterceptor)
  rejectSubmission(@Body() id: number) {
    return this.submissionService.rejectSubmission(+id);
  }
}
