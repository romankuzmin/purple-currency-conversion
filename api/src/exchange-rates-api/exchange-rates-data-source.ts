import { RequestOptions, RESTDataSource } from 'apollo-datasource-rest';
import { UserInputError } from 'apollo-server-express';
import { Currency } from './exchange-rates-api.types';

type Rates = {
    [currency: string]: number;
};

export default class ExchangeRatesDataSource extends RESTDataSource {
    private accessKey = '833d1fac0ea1412baf4009fdd5b1c993';

    constructor() {
        super();
        this.baseURL = 'https://openexchangerates.org/api';
    }

    async convert(amount: number, from: string, to: string): Promise<number> {
        await this.validateConvertInput({ amount, from, to });
        let value = amount;
        let rate = await this.getRateFrom(from, to);
        if (rate === -1) {
            const fromRate = await this.getBaseRate(from);
            value = amount / fromRate;
            rate = await this.getBaseRate(to);
        }

        return value * rate;
    }

    async getCurrencies(): Promise<Currency[]> {
        const currencies = await this.fetchCurrencies();
        if (currencies) {
            return Object.keys(currencies).map((code) => ({
                code,
                title: currencies[code],
            }));
        }

        return [];
    }

    protected async resolveURL(request: RequestOptions) {
        request.params.append('app_id', this.accessKey);

        return super.resolveURL(request);
    }

    private async fetchCurrencies(): Promise<{ [code: string]: string }> {
        return await this.get('currencies.json');
    }

    private async fetchLatest(base?: string): Promise<{ error?: string; base?: string; rates: Rates }> {
        return await this.get('latest.json', base ? { base } : undefined);
    }

    private async getRateFrom(base: string, to: string): Promise<number> {
        try {
            const result = await this.fetchLatest(base);
            if (!result.error && result.rates) {
                return this.getRate(base, to, result.rates);
            }
        } catch (e) {
            if (e.extensions && e.extensions.response && e.extensions.response.status === 403) {
                return -1;
            }

            console.error(e);
            throw e;
        }
    }

    private async getBaseRate(to: string): Promise<number> {
        const { base, rates } = await this.fetchLatest();

        if (rates) {
            return this.getRate(base, to, rates);
        }
    }

    private getRate(from: string, to: string, rates: Rates) {
        const rate = rates[to];

        if (to === from) {
            return 1 / rate;
        }

        return rate;
    }

    private async validateConvertInput(input: { amount: number; from: string; to: string }) {
        const allowedCurrencies = await this.fetchCurrencies();
        const errorMessage = 'Currency code is invalid.';

        const errors = Object.keys(input).reduce(
            (result, key) => ({
                ...result,
                [key]: allowedCurrencies[input[key]] === undefined ? errorMessage : undefined,
            }),
            {},
        );

        if (input.amount <= 0) {
            errors['amount'] = 'Amount must be greater than zero';
        } else {
            delete errors['amount'];
        }

        const hasErrors = Object.values(errors).filter((error) => error).length > 0;
        if (hasErrors) {
            throw new UserInputError('Some arguments are invalid', {
                arguments: errors,
                allowedCurrencies: Object.keys(allowedCurrencies).join(','),
            });
        }
    }
}
