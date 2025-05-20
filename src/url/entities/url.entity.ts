import { BaseEntity, Column, PrimaryGeneratedColumn } from "typeorm";

export class Url extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255, unique: true })
    originalUrl: string;

    @Column({ type: 'varchar', length: 6, unique: true })
    shortUrl: string;

    @Column({ type: 'int', default: 0 })
    clickCount: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @Column({ type: 'timestamp', nullable: true })
    deletedAt: Date;
    
}
