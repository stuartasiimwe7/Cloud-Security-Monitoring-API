import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { GetDbEventsDto } from './get-db-events.dto';

describe('GetDbEventsDto', () => {
  it('accepts valid query params', async () => {
    const dto = plainToInstance(GetDbEventsDto, {
      eventSource: 'signin.amazonaws.com',
      limit: '20',
      offset: '0',
      order: 'DESC',
      from: '2024-01-01T00:00:00.000Z',
    });
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
    expect(dto.limit).toBe(20);
    expect(dto.offset).toBe(0);
  });

  it('rejects invalid order', async () => {
    const dto = plainToInstance(GetDbEventsDto, { order: 'DOWN' as unknown as 'ASC' });
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });
});

