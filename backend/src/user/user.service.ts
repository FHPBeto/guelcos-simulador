import { Injectable, BadRequestException } from '@nestjs/common';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private repository: UserRepository) {}

  async create(data: any) {
    return this.repository.create(data);
  }

  // NOVA FUNÇÃO: Simular o uso do serviço
  async useService(userId: string) {
    const user = await this.repository.findByEmail('cliente-vip@teste.com'); // Pegando nosso teste
    
    if (!user || user.credits < 1) {
      throw new BadRequestException('Saldo de créditos insuficiente!');
    }

    // Debita 1 crédito (passamos -1)
    return this.repository.updateCredits(user.id, -1);
  }
}
