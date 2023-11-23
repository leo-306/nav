import React, {FC, ReactNode, useCallback, useContext, useMemo, useState} from 'react';
import {Avatar, Breadcrumb, Layout, Menu, Typography} from 'antd';
import {MenuFoldOutlined, MenuUnfoldOutlined} from '@ant-design/icons';
import {MenuList} from '../../constant';
import Logo from '../../assets/logo.png';
import {Store} from '../../store/context';
import ParamGroup from '../form';
import Home from '../home';
import ScrollList from '../scroll-list';

interface TopNavLayoutProps {}

const { Header, Content, Sider } = Layout;
const MenuContentMap: Record<string, ReactNode> = {
	form: <ParamGroup />,
	home: <Home />,
	'scroll-list': <ScrollList />,
};
const TopNavLayout: FC<TopNavLayoutProps> = props => {
	const context = useContext(Store);
	const [collapsed, setCollapsed] = useState(false);
	const breadcrumbItems = useMemo(() => {
		return [{ title: '当前路由：' + MenuList.find(item => item.key === context.defaultPath)?.label ?? '-' }];
	}, [context]);
	const onSelectMenu = useCallback(({ key }: { key: string }) => {
		context.setContext({ defaultPath: key });
	}, [context]);

	return (
		<Layout>
			{context.showTop ? (
				<Header style={{ color: '#fff', background: '#101010', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
					<div style={{ display: 'flex', alignItems: 'center' }}>
						<Avatar size="large" src={Logo} />
						<Typography.Title style={{ color: '#fff', marginTop: 0, marginLeft: '16px', marginBottom: 0 }} level={3}>
							中信管理后台
						</Typography.Title>
					</div>
					<div style={{ display: 'flex', alignItems: 'center' }}>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512" width="24" height="24" filter="none">
							<g>
								<path d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 96c48.6 0 88 39.4 88 88s-39.4 88-88 88-88-39.4-88-88 39.4-88 88-88zm0 344c-58.7 0-111.3-26.6-146.5-68.2 18.8-35.4 55.6-59.8 98.5-59.8 2.4 0 4.8.4 7.1 1.1 13 4.2 26.6 6.9 40.9 6.9 14.3 0 28-2.7 40.9-6.9 2.3-.7 4.7-1.1 7.1-1.1 42.9 0 79.7 24.4 98.5 59.8C359.3 421.4 306.7 448 248 448z" fill="rgba(255,255,255,1)"></path>
							</g>
						</svg>
						<span style={{ marginLeft: '8px' }}>阿信</span>
					</div>
				</Header>
			) : null}
			<Layout>
				{context.showMenu ? (
					<Sider width={200} collapsed={collapsed}>
						<Menu
							mode="inline"
							defaultSelectedKeys={[context.defaultPath]}
							onSelect={onSelectMenu}
							style={{ height: 'calc(100% - 40px)', borderRight: 0, background: '#fff' }}
							items={MenuList}
						/>
						<div
							onClick={() => setCollapsed(!collapsed)}
							style={{ height: '40px', cursor: 'pointer', background: '#fff', color: context.theme, fontSize: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
						>
							{collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
						</div>
					</Sider>
				) : null}
				<Layout style={{ padding: '0 24px 24px' }}>
					<Breadcrumb style={{margin: '16px 0'}} items={breadcrumbItems} />
					<Content
						style={{
							padding: 24,
							margin: 0,
							minHeight: 280,
							display: 'flex',
							justifyContent: 'center',
							overflow: 'auto',
						}}
					>
						{MenuContentMap[context.defaultPath] ?? null}
					</Content>
				</Layout>
			</Layout>
		</Layout>
	);
};

export default TopNavLayout;
