import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AwsSecurityService } from './aws-security.service';
import { AwsSecurityController } from './aws-security.controller';
import { SecurityEvent } from '../security-event.entity';
import { AwsCloudTrailService } from './aws-cloudtrail.service';

@Module({
  imports: [TypeOrmModule.forFeature([SecurityEvent])],
  controllers: [AwsSecurityController], 
  providers: [AwsSecurityService, AwsCloudTrailService],
  exports: [AwsSecurityService], 
})
export class AwsSecurityModule {}
