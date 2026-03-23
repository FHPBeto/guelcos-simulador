import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SupabaseService } from '../common/supabase.service'; // Importe aqui

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, SupabaseService],
})
export class AppModule {}
