import 'dotenv/config';
import { DataSource } from 'typeorm';
import { SecurityEvent } from './src/security-events/security-event.entity';
import { CloudTrailEvent } from './src/entities/cloudTrail.entity';

const isTest = process.env.NODE_ENV === 'test';

export default new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [SecurityEvent, CloudTrailEvent],
  migrations: ['dist/migrations/*.js'],
  synchronize: false,
  logging: !isTest,
});

