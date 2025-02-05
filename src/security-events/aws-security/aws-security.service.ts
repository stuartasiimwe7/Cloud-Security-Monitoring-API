import { Injectable, Logger } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SecurityEvent } from '../security-event.entity';
import { CloudTrailClient, LookupEventsCommand } from "@aws-sdk/client-cloudtrail";

@Injectable()
export class AwsSecurityService {
  private cloudTrail: AWS.CloudTrail;
  private logger = new Logger(AwsSecurityService.name);
  private cloudTrailClient: CloudTrailClient;

  constructor(
    @InjectRepository(SecurityEvent)
    private readonly securityEventRepo: Repository<SecurityEvent>,
  ) {
    AWS.config.update({ region: process.env.AWS_REGION });
    this.cloudTrail = new AWS.CloudTrail();
    this.cloudTrailClient = new CloudTrailClient({ region: process.env.AWS_REGION });
  }

  async fetchCloudTrailEvents(): Promise<void> {
    try {
      const params = { MaxResults: 5 }; // Adjust as needed
      const data = await this.cloudTrail.lookupEvents(params).promise();
      
      for (const event of data.Events || []) {
        const { EventName, EventSource, CloudTrailEvent } = event;
        const AwsRegion = (event as any).AwsRegion || 'unknown'; // Force any type to avoid TS error
        const details = CloudTrailEvent ? JSON.parse(CloudTrailEvent) : {}; // Avoid undefined issue
  
        await this.securityEventRepo.save({
          eventName: EventName,
          eventSource: EventSource,
          awsRegion: AwsRegion,
          timestamp: event.EventTime ? new Date(event.EventTime) : new Date(),
          userIdentity: details.userIdentity || {},
          eventDetails: CloudTrailEvent || 'N/A',
        });
      }
  
      this.logger.log('Fetched CloudTrail events successfully.');
    } catch (error) {
      this.logger.error('Error fetching CloudTrail events:', error);
    }
  }
  
  async getRecentEvents(){
    const command = new LookupEventsCommand({ /*MaxResults: 5*/ });
    const response = await this.cloudTrailClient.send(command);
    return response.Events;
  }
  
}
