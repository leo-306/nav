import React, { FC } from 'react';
import {Flex} from 'antd';
import ScrollBox from '../scroll-box';

interface ScrollListProps {}

const LIST: Array<{ title: string; list: Array<{ name: string; time_delayed: number }>; pause?: boolean; }> = [
	{
		title: '无缝滚动',
		list: Array.from({ length: 50 })
			.fill({ name: '', time_delayed: Math.ceil(Math.random() * 10) })
			.map((item: any, index) => ({ ...item, name: `[${index + 1}] 用户 ${String(Math.random()).replace('0.', '')}` })),
	},
	{
		title: '单击暂停',
		pause: true,
		list: Array.from({ length: 50 })
			.fill({ name: '', time_delayed: Math.ceil(Math.random() * 10) })
			.map((item: any, index) => ({ ...item, name: `[${index + 1}] 用户 ${String(Math.random()).replace('0.', '')}` })),
	},
	{
		title: '静态展示',
		list: Array.from({ length: 5 })
			.fill({ name: '', time_delayed: Math.ceil(Math.random() * 10) })
			.map((item: any, index) => ({ ...item, name: `[${index + 1}] 用户 ${String(Math.random()).replace('0.', '')}` }))
	}
];
const ScrollList: FC<ScrollListProps> = props => {
	return (
		<Flex wrap="wrap" gap="large">
			{LIST.map(item => {
				return <ScrollBox key={item.title} list={item.list} title={item.title} pause={item.pause} />
			})}
		</Flex>
	);
};

export default ScrollList;
