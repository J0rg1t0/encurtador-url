import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Url{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255, unique: true })
    originalUrl: string;

    @Column({ type: 'varchar', length: 6, unique: true })
    shortUrl: string;

    @Column({ type: 'int', default: null })
    userId: number;

    @Column({ type: 'int', default: 0 })
    clickCount: number;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @Column({ type: 'datetime', nullable: true })
    deletedAt: Date;
    
}
