import { Injectable } from '@nestjs/common';
import { CloudTrailClient, LookupEventsCommand } from '@aws-sdk/client-cloudtrail';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AwsCloudTrailService {
  private cloudTrailClient: CloudTrailClient;

  constructor(private configService: ConfigService) {
    this.cloudTrailClient = new CloudTrailClient({
      region: this.configService.get<string>('AWS_REGION'),
      credentials: {
        accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID') || '',
        secretAccessKey: this.configService.get<string>('AWS_SECRET_ACCESS_KEY') || '',
      },
    });
  }

  async getRecentSecurityEvents() {
    const command = new LookupEventsCommand({
      MaxResults: 10, // Fetch the 10 most recent events
    });

    try {
      const response = await this.cloudTrailClient.send(command);
      return response.Events || [];
    } catch (error) {
      console.error('Error fetching CloudTrail events:', error);
      throw error;
    }
  }
}
