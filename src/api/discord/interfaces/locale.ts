var en_US = require('../locale/en_US.json');

export interface Locale {
    name: string;
    messages: LocaleMessages;
}

export interface LocaleMessages {
    replies: LocaleMessageReplies;
    embed: LocaleMessageEmbed;
}

export interface LocaleMessageReplies {
    invalidUsage: string;
    flippingFinished: string;
}

export interface LocaleMessageEmbed {
    footer: string;
}

export class LocaleTest {
    
    locale: Locale;

    public constructor(languageCode: string) {
        switch (languageCode) {
            default: {
                this.setLocale(en_US);
            }
        }
    }

    private setLocale(localeFile: Locale) {
        this.locale = localeFile;
    }
}