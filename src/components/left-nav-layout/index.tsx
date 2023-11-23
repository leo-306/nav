import React, {FC, ReactNode, useCallback, useContext, useMemo} from 'react';
import {Avatar, Breadcrumb, Layout, Menu, Typography} from 'antd';
import {Store} from '../../store/context';
import {MenuList} from '../../constant';
import Logo from '../../assets/logo.png';
import ParamGroup from '../form';
import Home from '../home';

interface LeftNavLayoutProps {}

const MenuContentMap: Record<string, ReactNode> = {
	form: <ParamGroup />,
	home: <Home />,
};
const { Header, Content, Sider } = Layout;
const LeftNavLayout: FC<LeftNavLayoutProps> = props => {
	const context = useContext(Store);
	const breadcrumbItems = useMemo(() => {
		return [{ title: '当前路由：' + MenuList.find(item => item.key === context.defaultPath)?.label ?? '-' }];
	}, [context]);
	const onSelectMenu = useCallback(({ key }: { key: string }) => {
		context.setContext({ defaultPath: key });
	}, [context]);

	return (
		<Layout>
			<Layout>
				{context.showMenu ? (
					<Sider width={200}>
						<div style={{ display: 'flex', alignItems: 'center', margin: '12px' }}>
							<Avatar size="large" src={Logo} />
							<Typography.Title style={{ color: '#fff', marginTop: 0, marginLeft: '16px', marginBottom: 0 }} level={5}>
								{/*中信管理后台*/}
							</Typography.Title>
						</div>
						<Menu
							theme="dark"
							mode="inline"
							defaultSelectedKeys={[context.defaultPath]}
							onSelect={onSelectMenu}
							style={{ height: '100%', borderRight: 0, background: '#101010' }}
							items={MenuList}
						/>
					</Sider>
				) : null}
				<Layout style={{ padding: '0' }}>
					{context.showTop ? (
						<Header style={{ color: '#101010', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
							<div></div>
							<div style={{ display: 'flex', alignItems: 'center' }}>
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512" width="24" height="24" filter="none">
									<g>
										<path d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 96c48.6 0 88 39.4 88 88s-39.4 88-88 88-88-39.4-88-88 39.4-88 88-88zm0 344c-58.7 0-111.3-26.6-146.5-68.2 18.8-35.4 55.6-59.8 98.5-59.8 2.4 0 4.8.4 7.1 1.1 13 4.2 26.6 6.9 40.9 6.9 14.3 0 28-2.7 40.9-6.9 2.3-.7 4.7-1.1 7.1-1.1 42.9 0 79.7 24.4 98.5 59.8C359.3 421.4 306.7 448 248 448z" fill="#101010"></path>
									</g>
								</svg>
								<span style={{ marginLeft: '8px' }}>阿信</span>
							</div>
						</Header>
					) : null}
					<Breadcrumb style={{margin: '16px 24px'}} items={breadcrumbItems} />
					<Content
						style={{
							padding: 24,
							margin: 0,
							minHeight: 280,
						}}
					>
						{MenuContentMap[context.defaultPath]}
					</Content>
				</Layout>
			</Layout>
		</Layout>
	);
};

export default LeftNavLayout;
