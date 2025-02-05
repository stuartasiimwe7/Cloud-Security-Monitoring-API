import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CloudTrailEvent } from '../entities/cloudTrail.entity';
import { CloudTrailService } from './cloud-trail.service';
import { CloudTrailController } from './cloud-trail.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CloudTrailEvent])], // registering the entity
  providers: [CloudTrailService],
  controllers: [CloudTrailController],
  exports: [CloudTrailService], // Export the service if needed in another module
})
export class CloudTrailModule {}
