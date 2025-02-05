import { CloudTrailService } from './cloud-trail.service';
export declare class CloudTrailController {
    private readonly cloudTrailService;
    constructor(cloudTrailService: CloudTrailService);
    testSaveEvent(eventData: any): Promise<{
        message: string;
        savedEvent: import("../entities/cloudTrail.entity").CloudTrailEvent;
    }>;
}
