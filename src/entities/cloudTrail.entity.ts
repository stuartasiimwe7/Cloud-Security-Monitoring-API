import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('cloudtrail_events')
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

  @Column({ type: 'jsonb' })
  cloudTrailEvent: any;

  @CreateDateColumn()
  receivedAt: Date;
}
