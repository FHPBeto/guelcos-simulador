import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('test-create')
  async createTest() {
    const newUser = await this.userService.create({
      email: 'cliente-vip@teste.com',
      name: 'Cliente Humberto',
      password: 'senha_segura_123',
      credits: 50 // Já testando o seu módulo de créditos!
    });
    
    return {
      message: 'Usuário do seu SaaS criado!',
      newUser
    };
  }
}
