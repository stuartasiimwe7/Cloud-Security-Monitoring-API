import { AwsSecurityService } from './aws-security.service';
import { AwsCloudTrailService } from './aws-cloudtrail.service';
export declare class AwsSecurityController {
    private readonly awsSecurityService;
    private readonly awsCloudTrailService;
    constructor(awsSecurityService: AwsSecurityService, awsCloudTrailService: AwsCloudTrailService);
    fetchCloudTrailEvents(): Promise<{
        message: string;
    }>;
    getEvents(): Promise<import("@aws-sdk/client-cloudtrail").Event[]>;
}
