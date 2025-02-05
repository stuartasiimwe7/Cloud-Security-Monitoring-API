import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AwsSecurityService } from './aws-security.service';
import { AwsSecurityController } from './aws-security.controller';
import { SecurityEvent } from '../security-event.entity'; // Import the SecurityEvent entity

@Module({
  imports: [TypeOrmModule.forFeature([SecurityEvent])], // Required for repository injection
  controllers: [AwsSecurityController], 
  providers: [AwsSecurityService], 
  exports: [AwsSecurityService], 
})
export class AwsSecurityModule {}
