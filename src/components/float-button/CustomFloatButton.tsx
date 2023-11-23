import React, {FC, useCallback, useContext, useState} from 'react';
import {SettingOutlined} from '@ant-design/icons';
import {Drawer, FloatButton, Switch, Typography} from 'antd';
import Left from '../../assets/left.png';
import Top from '../../assets/top.png';
import {Store} from '../../store/context';

interface CustomFloatButtonProps {}

const themeList = ['#e8313e', '#5291F5', '#CA463B', '#385310']
const CustomFloatButton: FC<CustomFloatButtonProps> = props => {
	const context = useContext(Store);
	const [showDialog, setShowDialog] = useState(false);
	const openDialog = useCallback(() => {
		setShowDialog(true);
	}, []);
	const closeDialog = useCallback(() => {
		setShowDialog(false);
	}, []);

	return !showDialog
		? <FloatButton shape="square" icon={<SettingOutlined />} type="primary" onClick={openDialog} />
		: (
			<Drawer title="设置" open onClose={closeDialog} maskClosable footer={null}>
				<Typography.Title level={4}>
					主题色
				</Typography.Title>
				<div style={{ display: 'flex', alignItems: 'center' }}>
					{themeList.map(color => {
						return (
							<div
								key={color}
								onClick={() => context.setContext({ theme: color })}
								style={{
									width: '30px',
									height: '30px',
									cursor: 'pointer',
									borderRadius: '3px',
									border: context.theme === color ? `5px solid ${context.theme}` : undefined,
									background: color,
									marginRight: '16px'
								}}
							/>
						);
					})}
				</div>
				<Typography.Title level={4}>
					导航模式
				</Typography.Title>
				<div style={{ display: 'flex', alignItems: 'center' }}>
					<img
						src={Top}
						alt=""
						width={50}
						height={50}
						onClick={() => context.setContext({ nav: 'top' })}
						style={{ marginRight: '16px', cursor: 'pointer', borderRadius: '3px', border: context.nav === 'top' ? `2px solid ${context.theme}` : undefined }}
					/>
					<img
						src={Left}
						alt=""
						width={50}
						height={50}
						onClick={() => context.setContext({ nav: 'left' })}
						style={{ marginRight: '16px', cursor: 'pointer', borderRadius: '3px', border: context.nav === 'left' ? `2px solid ${context.theme}` : undefined }}
					/>
				</div>
				<Typography.Title level={4}>
					内容区域
				</Typography.Title>
				<div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px', marginTop: '8px' }}>
					<span style={{ width: '60px' }}>顶栏</span>
					<Switch style={{ marginLeft: '8px' }} checked={context.showTop} onChange={checked => context.setContext({ showTop: checked })} />
				</div>
				<div style={{ display: 'flex', alignItems: 'center' }}>
					<span style={{ width: '60px' }}>菜单栏</span>
					<Switch style={{ marginLeft: '8px' }} checked={context.showMenu} onChange={checked => context.setContext({ showMenu: checked })} />
				</div>
			</Drawer>
		)
};

export default CustomFloatButton;
