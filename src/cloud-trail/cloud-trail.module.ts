import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CloudTrailEvent } from '../entities/cloudTrail.entity';
import { CloudTrailService } from './cloud-trail.service';
import { CloudTrailController } from './cloud-trail.controller';
import { SecurityEvent } from '../security-events/security-event.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CloudTrailEvent, SecurityEvent]),
  ], 
  providers: [CloudTrailService],
  controllers: [CloudTrailController],
  exports: [CloudTrailService],
})
export class CloudTrailModule {}
