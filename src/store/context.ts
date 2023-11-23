import React from 'react';

export const Store = React.createContext({
	defaultPath: 'home',
	setContext(value: Record<string, unknown>) {}
});