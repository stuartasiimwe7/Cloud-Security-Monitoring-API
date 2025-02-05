import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CloudTrailEvent } from '../entities/cloudTrail.entity';

@Injectable()
export class CloudTrailService {
  constructor(
    @InjectRepository(CloudTrailEvent)
    private cloudTrailEventRepository: Repository<CloudTrailEvent>,
  ) {}

  async saveEvent(eventData: any): Promise<CloudTrailEvent> {
    const cloudTrailEvent = this.cloudTrailEventRepository.create({
      eventId: eventData.eventID || eventData.EventId,
      eventTime: new Date(eventData.eventTime || eventData.EventTime), //Handling different cases
      eventSource: eventData.eventSource || eventData.EventSource,
      eventName: eventData.eventName || eventData.EventName,
      username: eventData.Username || eventData.userIdentity?.userName || 'Unknown', // Default if missing
      cloudTrailEvent: eventData, // Full JSON structure
    });

    return await this.cloudTrailEventRepository.save(cloudTrailEvent);
  }
}