import { Test, TestingModule } from '@nestjs/testing';
import { CloudTrailService } from './cloud-trail.service';

describe('CloudTrailService', () => {
  let service: CloudTrailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CloudTrailService],
    }).compile();

    service = module.get<CloudTrailService>(CloudTrailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
