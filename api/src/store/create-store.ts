import { createConnection } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const isDevelop = process.env.NODE_ENV === 'development';

const options: PostgresConnectionOptions = {
    type: 'postgres',
    host: 'ec2-54-195-247-108.eu-west-1.compute.amazonaws.com',
    port: 5432,
    username: 'nripfotbgbkran',
    password: 'b32b0ff0198e6353b5443a84a6210b8569b290e83d72df784e8a540b53048dd9',
    database: 'dbki42ni88f168',
    synchronize: isDevelop,
    logging: false,
    entities: ['../**/*.entity.ts'],
    ssl: {
        rejectUnauthorized: false
    },
};

export const createStore = async () => {
    return createConnection(options);
};
