import React, {useCallback, useMemo, useState} from 'react';
import {ConfigProvider} from 'antd';
import zhCN from 'antd/locale/zh_CN';
import TopNavLayout from './components/top-nav-layout';
import LeftNavLayout from './components/left-nav-layout';
import {Store} from './store/context';

import './App.css';

function App() {
  const [context, setContext] = useState({ defaultPath: 'home' });
  const changeContext = useCallback((value: Record<string, unknown>) => {
    setContext(context => ({ ...context, ...value }));
  }, []);
  const value = useMemo(() => ({ ...context, setContext: changeContext  }), [context, changeContext]);

  return (
    <ConfigProvider
	    locale={zhCN}
      theme={{
        token: {
          colorPrimary: '#e8313e',
          colorBgContainer: '#fcd7da',
        },
      }}
    >
      <Store.Provider value={value}>
        {/*<TopNavLayout />*/}
        <LeftNavLayout />
      </Store.Provider>
    </ConfigProvider>
  );
}

export default App;
