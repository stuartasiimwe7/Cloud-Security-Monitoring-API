import { AwsSecurityService } from './aws-security.service';
export declare class AwsSecurityController {
    private readonly awsSecurityService;
    constructor(awsSecurityService: AwsSecurityService);
    fetchCloudTrailEvents(): Promise<{
        message: string;
    }>;
    getEvents(): Promise<import("@aws-sdk/client-cloudtrail").Event[] | undefined>;
}
