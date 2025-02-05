import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AwsSecurityService } from './aws-security.service';
import { AwsSecurityController } from './aws-security.controller';
import { SecurityEvent } from '../security-event.entity'; // Import the SecurityEvent entity
import { AwsCloudTrailService } from './aws-cloudtrail.service'; // Import the AwsCloudTrailService

@Module({
  imports: [TypeOrmModule.forFeature([SecurityEvent])], // Required for repository injection
  controllers: [AwsSecurityController], 
  providers: [AwsSecurityService, AwsCloudTrailService], // Add AwsCloudTrailService to the providers array
  exports: [AwsSecurityService], 
})
export class AwsSecurityModule {}
