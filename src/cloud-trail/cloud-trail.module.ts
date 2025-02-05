import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CloudTrailEvent } from '../entities/cloudTrail.entity';
import { CloudTrailService } from './cloud-trail.service';
import { CloudTrailController } from './cloud-trail.controller';
import { SecurityEvent } from '../security-events/security-event.entity';  // Import the SecurityEvent entity

@Module({
  imports: [
    TypeOrmModule.forFeature([CloudTrailEvent, SecurityEvent]), // Add the SecurityEvent entity to the imports
  
  ], 
  providers: [CloudTrailService], // Add the SecurityEventRepository to the providers
  controllers: [CloudTrailController],
  exports: [CloudTrailService], // Export the service if needed in another module
})
export class CloudTrailModule {}
