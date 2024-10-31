import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
  UseInterceptors,
} from '@nestjs/common';
import { AdminsService } from './admins.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { VerifyTokenInterceptor } from 'src/middlewares/verifyToken';
import { VerifyAdminTokenInterceptor } from 'src/middlewares/verifyAdmin';

@Controller('admins')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @Post()
  @UseInterceptors(VerifyTokenInterceptor)
  @UseInterceptors(VerifyAdminTokenInterceptor)
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminsService.create(createAdminDto);
  }

  @Get('all')
  @UseInterceptors(VerifyTokenInterceptor)
  @UseInterceptors(VerifyAdminTokenInterceptor)
  findAll() {
    return this.adminsService.findAll();
  }

  @Get(':id')
  @UseInterceptors(VerifyTokenInterceptor)
  @UseInterceptors(VerifyAdminTokenInterceptor)
  findOne(@Param('id') id: string) {
    return this.adminsService.findOne(id);
  }

  @Patch()
  @UseInterceptors(VerifyTokenInterceptor)
  @UseInterceptors(VerifyAdminTokenInterceptor)
  update(
    @Headers('Authorization') token: string,
    @Body() updateAdminDto: UpdateAdminDto,
  ) {
    return this.adminsService.update(token, updateAdminDto);
  }

  @Delete()
  @UseInterceptors(VerifyTokenInterceptor)
  @UseInterceptors(VerifyAdminTokenInterceptor)
  remove(@Headers('Authorization') token: string) {
    return this.adminsService.remove(token);
  }

  @Get()
  @UseInterceptors(VerifyTokenInterceptor)
  @UseInterceptors(VerifyAdminTokenInterceptor)
  getProfile(@Headers('Authorization') token: string) {
    return this.adminsService.getProfile(token);
  }
}
