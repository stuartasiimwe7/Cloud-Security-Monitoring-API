import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SecurityEvent } from './security-events/security-event.entity';
//import { AwsSecurityService } from './security-events/aws-security/aws-security.service';
//import { AwsSecurityController } from './security-events/aws-security/aws-security.controller';
import { AwsSecurityModule } from './security-events/aws-security/aws-security.module';
import { CloudTrailService } from './cloud-trail/cloud-trail.service';

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
    TypeOrmModule.forFeature([SecurityEvent]),
    AwsSecurityModule, // Registering the security event entity
  ],
  controllers: [AppController],
  providers: [AppService, CloudTrailService],
})
export class AppModule {}
