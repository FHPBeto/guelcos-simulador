import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Rota REAL de cadastro (POST)
  @Post('register')
  async register(@Body() userData: any) {
    return this.userService.create(userData);
  }

  // Rota para ver o saldo de um usuário específico
  @Get(':id/balance')
  async getBalance(@Param('id') id: string) {
    return this.userService.getUserBalance(id);
  }
}