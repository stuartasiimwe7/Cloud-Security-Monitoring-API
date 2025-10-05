import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SecurityEvent } from './security-events/security-event.entity';
import { AwsSecurityModule } from './security-events/aws-security/aws-security.module';
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
        synchronize: true,
      }),
    }),
    TypeOrmModule.forFeature([SecurityEvent]),
    AwsSecurityModule,
    CloudTrailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
