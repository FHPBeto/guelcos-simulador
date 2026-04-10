import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt'; // Adicionamos o mestre da segurança

@Injectable()
export class UserService {
  constructor(
    private readonly repository: UserRepository
  ) {}

  // 1. Rota de cadastro que o seu Controller está pedindo
  async create(userData: any) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(userData.password, salt);

    const newUser = {
      ...userData,
      password: hashedPassword,
      credits: 100, // Presente de boas-vindas
    };

    return this.repository.create(newUser);
  }

  // 2. Sua função de busca por email (Já estava perfeita!)
  async findByEmail(email: string) {
    const user = await this.repository.findByEmail(email);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return {
      name: user.name || 'Usuário',
      email: user.email,
      credits: user.credits,
    };
  }

  // 3. Sua função de saldo por ID
  async getUserBalance(userId: string) {
    const user = await this.repository.findById(userId);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    return {
      email: user.email,
      credits: user.credits,
    };
  }
}