import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { AwsSecurityService } from './aws-security.service';
import { AwsCloudTrailService } from './aws-cloudtrail.service';

@Controller('aws-security')
export class AwsSecurityController {
    constructor(
        private readonly awsSecurityService: AwsSecurityService,
        private readonly awsCloudTrailService: AwsCloudTrailService // Inject AwsCloudTrailService
    ) {}

    @Get('fetch-events')
    async fetchCloudTrailEvents() {
        try {
            await this.awsSecurityService.fetchCloudTrailEvents();
            return { message: 'Fetching CloudTrail events...' };
        } catch (error) {
            console.error('Error fetching CloudTrail events:', error);
            throw new HttpException('Failed to fetch CloudTrail events', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('events')
    async getEvents() {
        try {
            const events = await this.awsCloudTrailService.getRecentSecurityEvents();
            return events;
        } catch (error) {
            console.error('Error fetching security events:', error);
            throw new HttpException('Damn! Failed to retrieve security events', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
