import { Repository } from 'typeorm';
import { CloudTrailEvent } from '../entities/cloudTrail.entity';
export declare class CloudTrailService {
    private cloudTrailEventRepository;
    constructor(cloudTrailEventRepository: Repository<CloudTrailEvent>);
    saveEvent(eventData: any): Promise<CloudTrailEvent>;
}
