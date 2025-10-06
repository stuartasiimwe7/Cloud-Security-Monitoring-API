import { Test, TestingModule } from '@nestjs/testing';
import { CloudTrailService } from './cloud-trail.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CloudTrailEvent } from '../entities/cloudTrail.entity';
import { SecurityEvent } from '../security-events/security-event.entity';

describe('CloudTrailService', () => {
  let service: CloudTrailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CloudTrailService,
        { provide: getRepositoryToken(CloudTrailEvent), useValue: { create: jest.fn(), save: jest.fn() } },
        { provide: getRepositoryToken(SecurityEvent), useValue: { create: jest.fn(), save: jest.fn() } },
      ],
    }).compile();

    service = module.get<CloudTrailService>(CloudTrailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
