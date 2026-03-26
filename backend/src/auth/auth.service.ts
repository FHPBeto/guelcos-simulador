import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../user/user.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private userRepository: UserRepository) {}

  async validateUser(email: string, pass: string): Promise<any> {
    // Busca o usuário pelo email usando o SEU repositório
    const user = await this.userRepository.findByEmail(email);

    if (user) {
      // Compara a senha digitada com a criptografada do banco
      const isMatch = await bcrypt.compare(pass, user.password);
      
      if (isMatch) {
        const { password, ...result } = user;
        return result; // Retorna os dados do usuário (menos a senha)
      }
    }
    
    throw new UnauthorizedException('E-mail ou senha incorretos');
  }
}