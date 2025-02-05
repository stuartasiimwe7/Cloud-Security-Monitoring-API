import { Controller, Post, Body } from '@nestjs/common';
import { CloudTrailService } from './cloud-trail.service';

@Controller('cloudtrail')
export class CloudTrailController {
  constructor(private readonly cloudTrailService: CloudTrailService) {}

  @Post('test')
  async testSaveEvent(@Body() eventData: any) {
    const savedEvent = await this.cloudTrailService.saveEvent(eventData);
    return { message: 'Event saved!', savedEvent };
  }
}