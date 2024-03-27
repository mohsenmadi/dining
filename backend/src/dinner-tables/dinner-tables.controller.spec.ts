import { Test, TestingModule } from '@nestjs/testing';
import { DinnerTablesController } from './dinner-tables.controller';
import { DinnerTablesService } from './dinner-tables.service';

describe('DinnerTablesController', () => {
  let controller: DinnerTablesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DinnerTablesController],
      providers: [DinnerTablesService],
    }).compile();

    controller = module.get<DinnerTablesController>(DinnerTablesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
