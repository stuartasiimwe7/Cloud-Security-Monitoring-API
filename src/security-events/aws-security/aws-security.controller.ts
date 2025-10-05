import { Controller, Get, HttpException, HttpStatus, Query } from '@nestjs/common';
import { GetDbEventsDto } from './dto/get-db-events.dto';
import { AwsSecurityService } from './aws-security.service';
import { AwsCloudTrailService } from './aws-cloudtrail.service';

@Controller('aws-security')
export class AwsSecurityController {
    constructor(
        private readonly awsSecurityService: AwsSecurityService,
        private readonly awsCloudTrailService: AwsCloudTrailService
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
    async getDbEvents(@Query() query: GetDbEventsDto) {
        try {
            const result = await this.awsSecurityService.findSecurityEvents({
                eventSource: query.eventSource,
                eventName: query.eventName,
                awsRegion: query.awsRegion,
                from: query.from ? new Date(query.from) : undefined,
                to: query.to ? new Date(query.to) : undefined,
                limit: query.limit,
                offset: query.offset,
                order: query.order,
            });
            return result;
        } catch (error) {
            console.error('Error fetching DB security events:', error);
            throw new HttpException('Failed to retrieve stored security events', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
