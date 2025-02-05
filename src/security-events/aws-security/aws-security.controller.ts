import { Controller, Get } from '@nestjs/common';
import { AwsSecurityService } from './aws-security.service';

@Controller('aws-security')
export class AwsSecurityController {
    constructor(private readonly awsSecurityService: AwsSecurityService) {}
    
    @Get('fetch-events')
    async fetchCloudTrailEvents() {
        await this.awsSecurityService.fetchCloudTrailEvents();
        return { message: 'Fetching CloudTrail events...' };
  }

  @Get('events')
  async getEvents() {
    return /*await*/ this.awsSecurityService.getRecentEvents();
  }
}
