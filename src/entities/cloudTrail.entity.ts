import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('cloudtrail_events') // table name
export class CloudTrailEvent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  eventId: string;

  @Column()
  eventName: string;

  @Column()
  eventSource: string;
 
  @Column()
  eventTime: Date;

  @Column()
  username: string;

  @Column({ type: 'jsonb' }) // jsonb for PostgreSQL
  cloudTrailEvent: any;

  @CreateDateColumn()
  receivedAt: Date; // Timestamp of when we received it
}
