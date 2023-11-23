import React from 'react';
import {INIT_LIST} from '../constant';

export const Store = React.createContext({
	defaultPath: 'home',
	theme: '#e8313e',
	nav: 'top',
	showTop: true,
	showMenu: true,
	list: INIT_LIST,
	setContext(value: Record<string, unknown>) {}
});