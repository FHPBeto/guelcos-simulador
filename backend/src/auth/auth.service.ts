import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { LoginDto } from './dto/login.dto';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(private repo: AuthRepository) {}

  async login(data: LoginDto) {
    const user = await this.repo.findAdminByEmail(data.email);

    if (!user || user.password !== data.password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = jwt.sign(
      {
        sub: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET!,
      { expiresIn: '1d' },
    );

    return { access_token: token };
  }

  verifyToken(token: string) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET!);
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
