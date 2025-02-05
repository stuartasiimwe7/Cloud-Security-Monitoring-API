import { Test, TestingModule } from '@nestjs/testing';
import { AwsSecurityController } from './aws-security.controller';

describe('AwsSecurityController', () => {
  let controller: AwsSecurityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AwsSecurityController],
    }).compile();

    controller = module.get<AwsSecurityController>(AwsSecurityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
