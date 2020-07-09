import messages_en from '../i18n/en.json';
import messages_cs from '../i18n/cs.json';
import messages_de from '../i18n/de.json';

export default {
    api: {
        url: 'http://localhost:4000/graphql',
    },
    i18n: {
        locales: {
            en: {
                title: 'English',
                messages: messages_en,
            },
            cs: {
                title: 'Čeština',
                messages: messages_cs,
            },
            de: {
                title: 'Deutsch',
                messages: messages_de,
            },
        },
        default: 'en',
    },
};
