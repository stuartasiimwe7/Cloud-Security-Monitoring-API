import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { CloudTrailService } from './cloud-trail.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('cloudtrail')
export class CloudTrailController {
  constructor(private readonly cloudTrailService: CloudTrailService) {}

  @UseGuards(JwtAuthGuard)
  @Post('test')
  async testSaveEvent(@Body() eventData: any) {
    const savedEvent = await this.cloudTrailService.saveEvent(eventData);
    return { message: 'Event saved!', savedEvent };
  }
}