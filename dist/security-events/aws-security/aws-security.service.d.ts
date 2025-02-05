import { Repository } from 'typeorm';
import { SecurityEvent } from '../security-event.entity';
export declare class AwsSecurityService {
    private readonly securityEventRepo;
    private cloudTrail;
    private logger;
    constructor(securityEventRepo: Repository<SecurityEvent>);
    fetchCloudTrailEvents(): Promise<void>;
}
