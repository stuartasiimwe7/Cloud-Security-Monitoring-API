import { Test, TestingModule } from '@nestjs/testing';
import { AwsSecurityController } from './aws-security.controller';
import { AwsSecurityService } from './aws-security.service';
import { AwsCloudTrailService } from './aws-cloudtrail.service';

describe('AwsSecurityController', () => {
  let controller: AwsSecurityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AwsSecurityController],
      providers: [
        { provide: AwsSecurityService, useValue: { fetchCloudTrailEvents: jest.fn(), findSecurityEvents: jest.fn() } },
        { provide: AwsCloudTrailService, useValue: { getRecentSecurityEvents: jest.fn().mockResolvedValue([]) } },
      ],
    }).compile();

    controller = module.get<AwsSecurityController>(AwsSecurityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
