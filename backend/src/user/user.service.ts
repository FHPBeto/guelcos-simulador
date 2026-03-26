import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private repository: UserRepository) {} // Pede o repositório aqui

  async create(data: any) {
    return this.repository.create(data);
  }

  async findAll() {
    // Por enquanto vamos deixar simples, depois melhoramos
    return `Essa rota retorna todos os usuários`;
  }
}