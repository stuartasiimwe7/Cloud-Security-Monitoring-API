import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SecurityEvent } from './security-events/security-event.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('DATABASE_URL'),
        autoLoadEntities: true,
        synchronize: true, // ⚠️ Auto-syncs DB schema (disable in production)
      }),
    }),
    TypeOrmModule.forFeature([SecurityEvent]), // Registering the security event entity
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
