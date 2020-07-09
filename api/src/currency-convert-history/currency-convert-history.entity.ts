import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export default class CurrencyConvertHistory {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    from!: string;

    @Column()
    to!: string;

    @Column({ type: "decimal", precision: 13, scale: 10 })
    amount!: number;

    @Column({ type: "decimal", precision: 13, scale: 10 })
    convertedAmount!: number;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}
