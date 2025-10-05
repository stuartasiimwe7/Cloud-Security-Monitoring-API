import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SecurityEvent } from '../security-event.entity';
import { CloudTrailClient, LookupEventsCommand, LookupEventsCommandInput } from "@aws-sdk/client-cloudtrail";
import { FindOptionsWhere } from 'typeorm';

@Injectable()
export class AwsSecurityService {
  private logger = new Logger(AwsSecurityService.name);
  private cloudTrailClient: CloudTrailClient;

  constructor(
    @InjectRepository(SecurityEvent)
    private readonly securityEventRepo: Repository<SecurityEvent>,
  ) {
    this.cloudTrailClient = new CloudTrailClient({ region: process.env.AWS_REGION });
  }

  async fetchCloudTrailEvents(): Promise<void> {
    try {
      const input: LookupEventsCommandInput = { MaxResults: 5 };
      const data = await this.cloudTrailClient.send(new LookupEventsCommand(input));

      for (const event of data.Events || []) {
        const eventName = event.EventName || 'Unknown';
        const eventSource = event.EventSource || 'Unknown';
        const awsRegion = (event as any).AwsRegion || process.env.AWS_REGION || 'unknown';

        const rawDetails = event.CloudTrailEvent || '{}';
        const parsedDetails = typeof rawDetails === 'string' ? JSON.parse(rawDetails) : rawDetails;

        await this.securityEventRepo.save({
          eventName,
          eventSource,
          awsRegion,
          timestamp: event.EventTime ? new Date(event.EventTime) : new Date(),
          userIdentity: parsedDetails.userIdentity || {},
          eventDetails: typeof rawDetails === 'string' ? rawDetails : JSON.stringify(rawDetails),
        });
      }

      this.logger.log('Fetched CloudTrail events successfully.');
    } catch (error) {
      this.logger.error('Error fetching CloudTrail events:', error);
      throw error;
    }
  }
  
  async getRecentEvents(){
    const command = new LookupEventsCommand({ /*MaxResults: 5*/ });
    const response = await this.cloudTrailClient.send(command);
    return response.Events;
  }

  async findSecurityEvents(options: {
    eventSource?: string;
    eventName?: string;
    awsRegion?: string;
    from?: Date;
    to?: Date;
    limit?: number;
    offset?: number;
    order?: 'ASC' | 'DESC';
  }): Promise<{ data: SecurityEvent[]; total: number }>{
    const limit = Math.min(Math.max(options.limit ?? 50, 1), 500);
    const offset = Math.max(options.offset ?? 0, 0);
    const order = options.order ?? 'DESC';

    const qb = this.securityEventRepo.createQueryBuilder('e');

    if (options.eventSource) {
      qb.andWhere('e.eventSource = :eventSource', { eventSource: options.eventSource });
    }
    if (options.eventName) {
      qb.andWhere('e.eventName = :eventName', { eventName: options.eventName });
    }
    if (options.awsRegion) {
      qb.andWhere('e.awsRegion = :awsRegion', { awsRegion: options.awsRegion });
    }
    if (options.from) {
      qb.andWhere('e.timestamp >= :from', { from: options.from });
    }
    if (options.to) {
      qb.andWhere('e.timestamp <= :to', { to: options.to });
    }

    qb.orderBy('e.timestamp', order)
      .skip(offset)
      .take(limit);

    const [data, total] = await qb.getManyAndCount();
    return { data, total };
  }
  
}
