import { RequestOptions, RESTDataSource } from 'apollo-datasource-rest';
import { UserInputError } from 'apollo-server-express';
import { Currency, CurrencyAmount } from './exchange-rates-api.types';

type Rates = {
    [currency: string]: number;
};

type Settings = {
    api: string;
    appKey: string;
};

type LatestRatesResponse = { error?: string; base?: string; rates: Rates };

export default class ExchangeRatesDataSource extends RESTDataSource {
    private settings: Settings;

    constructor(settings: Settings) {
        super();
        this.baseURL = settings.api;
        this.settings = settings;
    }

    async convert(amount: number, from: string, to: string): Promise<number> {
        await this.validateConvertInput({ amount, from, to });
        const { base, rates } = await this.getLatestRates(to);
        return this.processConvert({ amount, currency: from }, to, base, rates);
    }

    async bulkConvert(currencies: CurrencyAmount[], to: string): Promise<number[]> {
        const { base, rates } = await this.getLatestRates(to);

        if (rates) {
            return currencies.map((item) => this.processConvert(item, to, base, rates));
        }

        return [];
    }

    private processConvert(
        currencyConvert: CurrencyAmount,
        toCurrency: string,
        baseCurrency: string,
        rates: Rates,
    ): number {
        if (rates) {
            return baseCurrency === currencyConvert.currency
                ? this.convertCurrency(currencyConvert, toCurrency, rates)
                : this.convertCurrencyFromBase(currencyConvert, toCurrency, rates);
        }

        return 0;
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
        request.params.append('app_id', this.settings.appKey);

        return super.resolveURL(request);
    }

    private async getLatestRates(to: string): Promise<LatestRatesResponse> {
        let result = await this.fetchLatest(to);
        if (result.error) {
            result = await this.fetchLatest();
        }

        return result;
    }

    private convertCurrencyFromBase(currencyConvert: CurrencyAmount, base: string, rates: Rates) {
        const baseRate = this.getRate(base, currencyConvert.currency, rates);
        const value = currencyConvert.amount / baseRate;
        const fromRate = this.getRate(currencyConvert.currency, base, rates);

        return value * fromRate;
    }

    private convertCurrency(currencyConvert: CurrencyAmount, to: string, rates: Rates) {
        const rate = this.getRate(to, currencyConvert.currency, rates);
        return currencyConvert.amount * rate;
    }

    private async fetchCurrencies(): Promise<{ [code: string]: string }> {
        return await this.get('currencies.json');
    }

    private async fetchLatest(base?: string): Promise<LatestRatesResponse> {
        try {
            return await this.get('latest.json', base ? { base } : undefined);
        } catch (e) {
            if (e.extensions && e.extensions.response && e.extensions.response.status === 403) {
                return e.extensions.response.body;
            }

            console.error(e);
            throw e;
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
