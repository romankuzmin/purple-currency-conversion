import { createConnection } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import CurrencyConvertHistory from '../currency-convert-history/currency-convert-history.entity';
import config from '../config';

const isDevelop = config.get('env') === 'development';
const settings = config.get('db');

const options: PostgresConnectionOptions = {
    type: 'postgres',
    host: settings.host,
    port: settings.port,
    username: settings.username,
    password: settings.password,
    database: settings.name,
    synchronize: isDevelop,
    logging: false,
    entities: [CurrencyConvertHistory],
    ssl: {
        rejectUnauthorized: false,
    },
};

export const createStore = async () => {
    return createConnection(options);
};
