import { RequestOptions, RESTDataSource } from 'apollo-datasource-rest';
import { Currency } from './exchange-rates-api.types';

export default class ExchangeRatesDataSource extends RESTDataSource {
    private accessKey = '833d1fac0ea1412baf4009fdd5b1c993';

    constructor() {
        super();
        this.baseURL = 'https://openexchangerates.org/api';
    }

    async getCurrencies(): Promise<Currency[]> {
        const currencies = await this.get('currencies.json');
        if (currencies) {
            return Object.keys(currencies).map((code) => ({
                code,
                title: currencies[code],
            }));
        }

        return [];
    }

    protected async resolveURL(request: RequestOptions) {
        request.params.append('access_key', this.accessKey);

        return super.resolveURL(request);
    }
}
