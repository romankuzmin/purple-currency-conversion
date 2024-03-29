import * as convict from 'convict';
import * as dotenv from 'dotenv';

dotenv.config();

const config = convict({
    env: {
        doc: 'The application environment.',
        format: ['production', 'development'],
        default: 'development',
        env: 'NODE_ENV',
    },
    port: {
        doc: 'The port to bind.',
        format: 'port',
        default: 4000,
        env: 'PORT',
        arg: 'port',
    },
    db: {
        host: {
            doc: 'Database host name / IP',
            format: '*',
            default: 'server1.dev.test',
            env: 'DATABASE_HOST',
        },
        name: {
            doc: 'Database name',
            format: String,
            default: 'users',
            env: 'DATABASE_NAME',
        },
        username: {
            doc: 'Database username',
            format: String,
            default: 'users',
            env: 'DATABASE_USERNAME',
        },
        password: {
            doc: 'Database password',
            format: String,
            default: 'changeme',
            env: 'DATABASE_PASSWORD',
        },
        port: {
            doc: 'Database port',
            format: Number,
            default: 5432,
            env: 'DATABASE_PORT',
        },
    },
    exchangeRates: {
        api: {
            doc: 'The openexchangerates.org API',
            format: String,
            default: 'https://openexchangerates.org/api',
            env: 'EXCHANGE_RATES_API_ENDPOINT',
        },
        appKey: {
            doc: 'The openexchangerates.org API KEY',
            format: String,
            default: '833d1fac0ea1412baf4009fdd5b1c993',
            env: 'EXCHANGE_RATES_API_KEY',
        },
    },
    settings: {
        totalAmountConvertedCurrency: {
            doc: 'Total amount converted currency',
            format: String,
            default: 'USD',
        },
    },
});

export default config;
