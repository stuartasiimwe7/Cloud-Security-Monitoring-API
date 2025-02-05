import { ConfigService } from '@nestjs/config';
export declare class AwsCloudTrailService {
    private configService;
    private cloudTrailClient;
    constructor(configService: ConfigService);
    getRecentSecurityEvents(): Promise<import("@aws-sdk/client-cloudtrail").Event[]>;
}
