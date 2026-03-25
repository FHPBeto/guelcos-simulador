import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AdminRepository } from './admin.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminService {
  constructor(
    private repo: AdminRepository,
    private jwt: JwtService,
  ) {}

  async createAdmin(email: string, password: string) {
    const hashed = await bcrypt.hash(password, 10);
    return this.repo.create(email, hashed);
  }

  async validateAdmin(email: string, password: string) {
    const admin = await this.repo.findByEmail(email);
    if (!admin) throw new UnauthorizedException('Invalid credentials');

    const match = await bcrypt.compare(password, admin.password);
    if (!match) throw new UnauthorizedException('Invalid credentials');

    return admin;
  }

  async login(email: string, password: string) {
    const admin = await this.validateAdmin(email, password);
    const payload = { sub: admin.id, email: admin.email, role: admin.role };
    return { accessToken: this.jwt.sign(payload) };
  }

  async getAllAdmins() {
    return this.repo.findAll();
  }
}
