import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
} from '@nestjs/common';
import { AdminsService } from './admins.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Controller('admins')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @Post()
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminsService.create(createAdminDto);
  }

  @Get('all')
  findAll() {
    return this.adminsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminsService.findOne(id);
  }

  @Patch()
  update(
    @Headers('Authorization') token: string,
    @Body() updateAdminDto: UpdateAdminDto,
  ) {
    return this.adminsService.update(token, updateAdminDto);
  }

  @Delete()
  remove(@Headers('Authorization') token: string) {
    return this.adminsService.remove(token);
  }

  @Get()
  getProfile(@Headers('Authorization') token: string) {
    return this.adminsService.getProfile(token);
  }
}
