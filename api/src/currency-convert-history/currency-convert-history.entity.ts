import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export default class CurrencyConvertHistory {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    from!: string;

    @Column()
    to!: string;

    @Column({ type: "decimal", precision: 21, scale: 8 })
    amount!: number;

    @Column({ type: "decimal", precision: 21, scale: 8 })
    convertedAmount!: number;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}
