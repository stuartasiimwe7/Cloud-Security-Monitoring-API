import { Test } from '@nestjs/testing';
import { AwsSecurityService } from './aws-security.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SecurityEvent } from '../security-event.entity';

describe('AwsSecurityService', () => {
  let service: AwsSecurityService;
  const repoMock = {
    save: jest.fn().mockResolvedValue(undefined),
    createQueryBuilder: jest.fn(() => ({
      andWhere: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      take: jest.fn().mockReturnThis(),
      getManyAndCount: jest.fn().mockResolvedValue([[], 0]),
    })),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AwsSecurityService,
        { provide: getRepositoryToken(SecurityEvent), useValue: repoMock },
      ],
    }).compile();
    service = module.get(AwsSecurityService);
  });

  it('findSecurityEvents returns data/total', async () => {
    const result = await service.findSecurityEvents({ limit: 10, offset: 0 });
    expect(result).toEqual({ data: [], total: 0 });
  });
});
