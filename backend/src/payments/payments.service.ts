import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class PaymentsService {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-01-27.acacia' as any, // Versão estável
    });
  }

  // Essa função vai criar o link de pagamento
  async createCheckoutSession(userId: string) {
    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'brl',
            product_data: {
              name: 'Pacote de 100 Créditos',
              description: 'Créditos para usar no simulador Guelcos',
            },
            unit_amount: 5000, // R$ 50,00 (em centavos)
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:3000/payments/success',
      cancel_url: 'http://localhost:3000/payments/cancel',
      metadata: {
        userId: userId, // Guardamos o ID do usuário para saber quem pagou
      },
    });

    return { url: session.url };
  }
}