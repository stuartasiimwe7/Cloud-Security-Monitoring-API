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
    const getString = (obj: Record<string, unknown>, key: string): string => {
      const v = obj[key];
      return typeof v === 'string' ? v : '';
    };
    const getDate = (obj: Record<string, unknown>, keys: string[]): Date | undefined => {
      for (const k of keys) {
        const v = obj[k];
        if (typeof v === 'string' || typeof v === 'number') return new Date(v);
      }
      return undefined;
    };

    const data = eventData as Record<string, unknown>;
    const userIdentity = (typeof data['userIdentity'] === 'object' && data['userIdentity'] !== null ? data['userIdentity'] as Record<string, unknown> : undefined);
    const username = getString(data, 'Username') || (userIdentity ? getString(userIdentity, 'userName') : '');

    const eventId = getString(data, 'eventID') || getString(data, 'EventId');
    const eventSource = getString(data, 'eventSource') || getString(data, 'EventSource');
    const eventName = getString(data, 'eventName') || getString(data, 'EventName');
    const eventTime = getDate(data, ['eventTime','EventTime']) ?? new Date();

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