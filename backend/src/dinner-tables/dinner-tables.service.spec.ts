import { Test, TestingModule } from '@nestjs/testing';
import { DinnerTablesService } from './dinner-tables.service';

describe('DinnerTablesService', () => {
  let service: DinnerTablesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DinnerTablesService],
    }).compile();

    service = module.get<DinnerTablesService>(DinnerTablesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
