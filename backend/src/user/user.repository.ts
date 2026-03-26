import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  // Para o módulo de USER: Cria o usuário no banco
  async create(data: any) {
    return this.prisma.user.create({
      data,
    });
  }

  // Para o módulo de AUTH/USER: Busca um usuário pelo e-mail
  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  // Para o módulo de CREDITS: Adiciona ou remove créditos
  async updateCredits(userId: string, amount: number) {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        credits: {
          increment: amount, // Se amount for 10, ganha 10. Se for -5, perde 5.
        },
      },
    });
  }

  // Para o módulo de PAYMENTS: Salva o ID do Stripe quando o cliente paga
  async updateStripeId(userId: string, stripeId: string) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { stripeId },
    });
  }
}
