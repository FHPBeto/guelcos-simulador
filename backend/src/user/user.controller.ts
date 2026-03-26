import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('test-create')
  async createTest() {
    return this.userService.create({
      email: 'cliente-vip@teste.com',
      name: 'Cliente Humberto',
      password: 'senha_segura_123',
      credits: 50
    });
  }

  @Get('use-credit')
  async use() {
    const updatedUser = await this.userService.useService('id-do-user'); 
    return {
      message: 'Crédito utilizado com sucesso! Você realizou uma consulta.',
      saldo_atual: updatedUser.credits
    };
  }
}