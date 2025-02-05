import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('security_events')
export class SecurityEvent {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    eventName: string;

    @Column()
    eventSource: string;

    @Column()
    awsRegion: string;

    @Column()
    timestamp: Date;  // Event timestamp

    @Column({ type: 'jsonb' }) // Structured identity info
    userIdentity: any;

    @Column('text')
    eventDetails: string;

    @CreateDateColumn()
    createdAt: Date;
}
