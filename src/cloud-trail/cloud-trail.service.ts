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

    const data = eventData as Record<string, unknown> & { userIdentity?: { userName?: string } };

    const eventId = getString(data.eventID) || getString((data as any).EventId);
    const eventSource = getString(data.eventSource) || getString((data as any).EventSource);
    const eventName = getString(data.eventName) || getString((data as any).EventName);
    const username = getString((data as any).Username) || getString(data.userIdentity?.userName, 'Unknown');
    const eventTimeRaw = (data as any).eventTime || (data as any).EventTime;
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
        awsRegion: (cloudTrailEvent.cloudTrailEvent as Record<string, unknown>)?.['awsRegion'] as string,
        timestamp: cloudTrailEvent.eventTime,
        userIdentity: (cloudTrailEvent.cloudTrailEvent as Record<string, unknown>)?.['userIdentity'] as unknown,
        eventDetails: JSON.stringify(cloudTrailEvent.cloudTrailEvent),
      });
      void this.securityEventRepository.save(securityEvent);
    }
}
}