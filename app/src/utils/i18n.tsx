import { MessageFormatElement } from 'intl-messageformat-parser';
import React, { FC, PropsWithChildren } from 'react';
import { IntlProvider as ReactIntlProvider } from 'react-intl';

import config from '../config';

type LocaleMessages = {
    [key: string]: {
        title: string;
        messages: Record<string, string> | Record<string, MessageFormatElement[]>;
    };
};

type TranslationProviderProps = {
    locale: string;
};

const i18n = config.i18n.locales as LocaleMessages;

export const IntlProvider: FC<PropsWithChildren<TranslationProviderProps>> = ({ locale, children }) => {
    return (
        <ReactIntlProvider locale={locale} messages={i18n[locale].messages}>
            {children}
        </ReactIntlProvider>
    );
};

export const getLocales = () =>
    Object.keys(i18n).map((locale) => ({
        id: locale,
        title: i18n[locale].title,
    }));
