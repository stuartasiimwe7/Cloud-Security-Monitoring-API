import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CloudTrailEvent } from '../entities/cloudTrail.entity';
import { CloudTrailService } from './cloud-trail.service';
import { CloudTrailController } from './cloud-trail.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CloudTrailEvent])],
  providers: [CloudTrailService],
  controllers: [CloudTrailController],
})
export class CloudTrailModule {}
