import React from "react";

const LocaleContext = React.createContext({
	locale: 'id',
	toggleLocale: () => {},
});

export const LocalProvider=LocaleContext.Provider;
export const LocalConsumer=LocaleContext.Consumer;

export default LocaleContext;