import { Controller, Get, HttpException, HttpStatus, Query } from '@nestjs/common';
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

    @Get('db-events')
    async getDbEvents(
        @Query('eventSource') eventSource?: string,
        @Query('eventName') eventName?: string,
        @Query('awsRegion') awsRegion?: string,
        @Query('from') from?: string,
        @Query('to') to?: string,
        @Query('limit') limit?: string,
        @Query('offset') offset?: string,
        @Query('order') order?: 'ASC' | 'DESC',
    ) {
        try {
            const parsedFrom = from ? new Date(from) : undefined;
            const parsedTo = to ? new Date(to) : undefined;
            const parsedLimit = limit ? parseInt(limit, 10) : undefined;
            const parsedOffset = offset ? parseInt(offset, 10) : undefined;

            const result = await this.awsSecurityService.findSecurityEvents({
                eventSource,
                eventName,
                awsRegion,
                from: parsedFrom,
                to: parsedTo,
                limit: parsedLimit,
                offset: parsedOffset,
                order,
            });
            return result;
        } catch (error) {
            console.error('Error fetching DB security events:', error);
            throw new HttpException('Failed to retrieve stored security events', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
