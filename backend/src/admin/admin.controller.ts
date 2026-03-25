import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { LoginAdminDto } from './dto/login-admin.dto';

@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Post('register')
  register(@Body() dto: CreateAdminDto) {
    return this.adminService.createAdmin(dto.email, dto.password);
  }

  @Post('login')
  login(@Body() dto: LoginAdminDto) {
    return this.adminService.login(dto.email, dto.password);
  }

  /*@UseGuards(AuthGuard)
  @Get('all')
  getAll() {
    return this.adminService.getAllAdmins();
  }*/
}
