import { BaseEntity, Column, CreateDateColumn, PrimaryGeneratedColumn } from "typeorm";

export class User extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 50, unique: true })
    email: string;

    @Column({ type: 'varchar', length: 50 })
    password: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;
}
