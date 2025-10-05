import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CloudTrailEvent } from '../entities/cloudTrail.entity';
import { SecurityEvent } from '../security-events/security-event.entity';

@Injectable()
export class CloudTrailService {
  constructor(
    @InjectRepository(CloudTrailEvent)
    private cloudTrailEventRepository: Repository<CloudTrailEvent>,

    @InjectRepository(SecurityEvent)
    private securityEventRepository: Repository<SecurityEvent>,
  ) {}

  async saveEvent(eventData: any): Promise<CloudTrailEvent> {
    const cloudTrailEvent = this.cloudTrailEventRepository.create({
      eventId: eventData.eventID || eventData.EventId,
      eventTime: new Date(eventData.eventTime || eventData.EventTime),
      eventSource: eventData.eventSource || eventData.EventSource,
      eventName: eventData.eventName || eventData.EventName,
      username: eventData.Username || eventData.userIdentity?.userName || 'Unknown',
      cloudTrailEvent: eventData,
    });
    const savedCloudTrailEvent = await this.cloudTrailEventRepository.save(cloudTrailEvent);
    this.filterSecurityEvents(savedCloudTrailEvent);

    return savedCloudTrailEvent;
  }

  private filterSecurityEvents(cloudTrailEvent: CloudTrailEvent) {
    const securityEventCriteria = [
      'ConsoleLogin',
      'AssumeRoleWithSAML',
      'CreateUser',
      'DeleteBucket',
  ];

    if (securityEventCriteria.includes(cloudTrailEvent.eventName) || cloudTrailEvent.eventSource.includes('iam')) {
      const securityEvent = this.securityEventRepository.create({
        eventName: cloudTrailEvent.eventName,
        eventSource: cloudTrailEvent.eventSource,
        awsRegion: cloudTrailEvent.cloudTrailEvent.awsRegion,
        timestamp: cloudTrailEvent.eventTime,
        userIdentity: cloudTrailEvent.cloudTrailEvent.userIdentity,
        eventDetails: JSON.stringify(cloudTrailEvent.cloudTrailEvent),
      });
      this.securityEventRepository.save(securityEvent);
    }
}
}