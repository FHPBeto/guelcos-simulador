import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt'; // Importando o mestre da segurança

@Injectable()
export class UserService {
  constructor(private repository: UserRepository) {}

  async create(data: any) {
    // 1. Gerar o "Salt" (o tempero da segurança)
    const salt = await bcrypt.genSalt();
    
    // 2. Transformar a senha em um código impossível de ler (Hash)
    const hashedPassword = await bcrypt.hash(data.password, salt);

    // 3. Montar o objeto final com a senha protegida
    const userWithHashedPassword = {
      ...data,
      password: hashedPassword,
    };

    // 4. Salvar no banco de dados via repositório
    return this.repository.create(userWithHashedPassword);
  }

  async getUserBalance(userId: string) {
    const user = await this.repository.findById(userId);
    if (!user) throw new NotFoundException('Usuário não encontrado');
    
    return {
      email: user.email,
      credits: user.credits
    };
  }
}