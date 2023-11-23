import {FormOutlined, HomeOutlined, RetweetOutlined} from '@ant-design/icons';

export const MenuList = [
	{
		key: 'home',
		icon: <HomeOutlined />,
		label: '数据展示',
	},
	{
		key: 'form',
		icon: <FormOutlined />,
		label: '数据录入',
	},
	{
		key: 'scroll-list',
		icon: <RetweetOutlined />,
		label: '滚动演示',
	}
];

export const INIT_LIST = [
	{
		name: '张三',
		age: 18,
		deposit: 10000,
		gender: '男'
	},
	{
		name: '李四',
		age: 25,
		deposit: 20000,
		gender: '男'
	}
];