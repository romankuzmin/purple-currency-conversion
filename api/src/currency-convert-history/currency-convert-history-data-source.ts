import { DataSource } from 'apollo-datasource';
import { Connection, DeepPartial, Repository } from 'typeorm';
import CurrencyConvertHistory from './currency-convert-history.entity';
import { Statistics } from './currency-convert-history.types';

type CurrencyConvertHistoryDataSourceArgs = {
    store: Promise<Connection>;
};

export default class CurrencyConvertHistoryDataSource extends DataSource {
    context!: any;

    private readonly store: Promise<Connection>;
    private repository: Repository<CurrencyConvertHistory>;

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

    async getStatistics(): Promise<Statistics> {
        return {
            mostPopularDestinationCurrency: await this.getMostPopularDestinationCurrency(),
            currencyAmounts: await this.getAmountsByCurrency(),
            totalNumberOfConversions: (await this.repository.count()) || 0,
        };
    }

    private async getAmountsByCurrency() {
        return await this.repository
            .createQueryBuilder('history')
            .select('history.from', 'currency')
            .addSelect('SUM("amount")', 'amount')
            .groupBy('history.from')
            .getRawMany();
    }

    private async getMostPopularDestinationCurrency() {
        const { popularCurrency } = await this.repository
            .createQueryBuilder('history')
            .select('history.to', 'popularCurrency')
            .addSelect('COUNT(history.to)', 'occurrence')
            .groupBy('history.to')
            .orderBy('occurrence', 'DESC')
            .getRawOne();

        return popularCurrency || '';
    }
}
