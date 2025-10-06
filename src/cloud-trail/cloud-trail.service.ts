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

  async saveEvent(eventData: Record<string, unknown>): Promise<CloudTrailEvent> {
    const getString = (value: unknown, fallback = ''): string =>
      typeof value === 'string' && value.length > 0 ? value : fallback;

    const eventId = getString((eventData as any).eventID) || getString((eventData as any).EventId);
    const eventSource = getString((eventData as any).eventSource) || getString((eventData as any).EventSource);
    const eventName = getString((eventData as any).eventName) || getString((eventData as any).EventName);
    const username = getString((eventData as any).Username) || getString((eventData as any).userIdentity?.userName, 'Unknown');
    const eventTimeRaw = (eventData as any).eventTime || (eventData as any).EventTime;
    const eventTime = eventTimeRaw ? new Date(eventTimeRaw as string) : new Date();

    const cloudTrailEvent = this.cloudTrailEventRepository.create({
      eventId,
      eventTime,
      eventSource,
      eventName,
      username,
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
        awsRegion: (cloudTrailEvent.cloudTrailEvent as any)?.awsRegion,
        timestamp: cloudTrailEvent.eventTime,
        userIdentity: (cloudTrailEvent.cloudTrailEvent as any)?.userIdentity,
        eventDetails: JSON.stringify(cloudTrailEvent.cloudTrailEvent),
      });
      void this.securityEventRepository.save(securityEvent);
    }
}
}