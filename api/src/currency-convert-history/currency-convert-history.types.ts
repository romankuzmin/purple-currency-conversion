import { CurrencyAmount } from '../exchange-rates-api/exchange-rates-api.types';

export type Statistics = {
    mostPopularDestinationCurrency: string;
    currencyAmounts: CurrencyAmount[];
    totalNumberOfConversions: number;
};
