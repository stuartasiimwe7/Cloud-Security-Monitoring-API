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
      eventTime: new Date(eventData.eventTime || eventData.EventTime), //Handling different cases
      eventSource: eventData.eventSource || eventData.EventSource,
      eventName: eventData.eventName || eventData.EventName,
      username: eventData.Username || eventData.userIdentity?.userName || 'Unknown', // Default if missing
      cloudTrailEvent: eventData, // Full JSON structure
    });
    // Save the CloudTrail event
    const savedCloudTrailEvent = await this.cloudTrailEventRepository.save(cloudTrailEvent);

    // Filter the event and save as SecurityEvent if needed
    this.filterSecurityEvents(savedCloudTrailEvent);

    return savedCloudTrailEvent;
  }

  private filterSecurityEvents(cloudTrailEvent: CloudTrailEvent) {
    // Define security-related event criteria
    const securityEventCriteria = [
      'ConsoleLogin',
      'AssumeRoleWithSAML',
      'CreateUser',
      'DeleteBucket',
      // You can add more security-related event names here...
  ];

    // Check if the event name is in the security event criteria
    if (securityEventCriteria.includes(cloudTrailEvent.eventName) || cloudTrailEvent.eventSource.includes('iam')) {
      // If it matches, create a SecurityEvent
      const securityEvent = this.securityEventRepository.create({
        eventName: cloudTrailEvent.eventName,
        eventSource: cloudTrailEvent.eventSource,
        awsRegion: cloudTrailEvent.cloudTrailEvent.awsRegion,
        timestamp: cloudTrailEvent.eventTime,
        userIdentity: cloudTrailEvent.cloudTrailEvent.userIdentity,
        eventDetails: JSON.stringify(cloudTrailEvent.cloudTrailEvent), // Store the full event details
      });

      // Save the SecurityEvent to the database
      this.securityEventRepository.save(securityEvent);
    }
}
/*
saveEvent: We first save the CloudTrail event to the database.
filterSecurityEvents: This method checks if the event name or 
source matches any predefined security criteria. If it does, we create and save a SecurityEvent.
Criteria for security events: We filter based on event names like ConsoleLogin, 
AssumeRoleWithSAML, etc., and also check for iam in the eventSource as an additional security flag.

*/
}