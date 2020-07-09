import { DataSource } from 'apollo-datasource';
import { Connection, DeepPartial, Repository } from 'typeorm';
import CurrencyConvertHistory from './currency-convert-history.entity';

type CurrencyConvertHistoryDataSourceArgs = {
    store: Promise<Connection>;
};

export default class CurrencyConvertHistoryDataSource extends DataSource {
    context!: any;

    private readonly store: Promise<Connection>;
    private repository: Repository<unknown>;

    constructor({ store }: CurrencyConvertHistoryDataSourceArgs) {
        super();

        this.store = store;
    }

    async initialize(config) {
        const store = await this.store;
        this.repository = store.getRepository(CurrencyConvertHistory);
        this.context = config.context;
    }

    async save(entity: DeepPartial<CurrencyConvertHistory>) {
        return await this.repository.save(entity);
    }
}
