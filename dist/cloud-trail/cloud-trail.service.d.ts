import { Repository } from 'typeorm';
import { CloudTrailEvent } from '../entities/cloudTrail.entity';
import { SecurityEvent } from '../security-events/security-event.entity';
export declare class CloudTrailService {
    private cloudTrailEventRepository;
    private securityEventRepository;
    constructor(cloudTrailEventRepository: Repository<CloudTrailEvent>, securityEventRepository: Repository<SecurityEvent>);
    saveEvent(eventData: any): Promise<CloudTrailEvent>;
    private filterSecurityEvents;
}
