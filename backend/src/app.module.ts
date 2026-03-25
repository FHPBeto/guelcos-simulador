import { Module } from '@nestjs/common';
import { SupabaseService } from './common/supabase.service';
import { PrismaService } from './prisma/prisma.service';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [PrismaService, AdminModule],
  providers: [SupabaseService],
})
export class AppModule {}
