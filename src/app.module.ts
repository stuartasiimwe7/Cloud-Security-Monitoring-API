import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SecurityEvent } from './security-events/security-event.entity';
import { AwsSecurityModule } from './security-events/aws-security/aws-security.module';
//import { CloudTrailService } from './cloud-trail/cloud-trail.service';
import {CloudTrailModule} from './cloud-trail/cloud-trail.module';

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
        synchronize: true, // Auto-syncs DB schema (disable in production)
      }),
    }),
    TypeOrmModule.forFeature([SecurityEvent]), // Register only entities here
    AwsSecurityModule, // Registering the security event entity
    CloudTrailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
