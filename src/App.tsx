import React, {useCallback, useMemo, useState} from 'react';
import {ConfigProvider} from 'antd';
import zhCN from 'antd/locale/zh_CN';
import TopNavLayout from './components/top-nav-layout';
import LeftNavLayout from './components/left-nav-layout';
import {Store} from './store/context';
import CustomFloatButton from './components/float-button/CustomFloatButton';
import {INIT_LIST} from './constant';

import './App.css';

function App() {
  const [context, setContext] = useState({
    defaultPath: 'home',
    theme: '#e8313e',
    nav: 'top',
    showTop: true,
    showMenu: true,
    list: INIT_LIST
  });
  const changeContext = useCallback((value: Record<string, unknown>) => {
    setContext(context => ({ ...context, ...value }));
  }, []);
  const value = useMemo(() => ({ ...context, setContext: changeContext  }), [context, changeContext]);

  return (
    <ConfigProvider locale={zhCN} theme={{ token: { colorPrimary: context.theme } }}>
      <Store.Provider value={value}>
        {context.nav === 'top' ? <TopNavLayout /> : <LeftNavLayout />}
        <CustomFloatButton />
      </Store.Provider>
    </ConfigProvider>
  );
}

export default App;
