import { Repository } from 'typeorm';
import { SecurityEvent } from '../security-event.entity';
export declare class AwsSecurityService {
    private readonly securityEventRepo;
    private cloudTrail;
    private logger;
    private cloudTrailClient;
    constructor(securityEventRepo: Repository<SecurityEvent>);
    fetchCloudTrailEvents(): Promise<void>;
    getRecentEvents(): Promise<import("@aws-sdk/client-cloudtrail").Event[] | undefined>;
}
