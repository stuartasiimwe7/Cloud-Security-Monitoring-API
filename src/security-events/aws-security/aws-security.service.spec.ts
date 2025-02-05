import { Test, TestingModule } from '@nestjs/testing';
import { AwsSecurityService } from './aws-security.service';

describe('AwsSecurityService', () => {
  let service: AwsSecurityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AwsSecurityService],
    }).compile();

    service = module.get<AwsSecurityService>(AwsSecurityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
