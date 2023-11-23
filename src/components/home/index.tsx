import React, {FC, useContext} from 'react';
import {Store} from '../../store/context';
import {Card, Descriptions, Flex} from "antd";

interface HomeProps {}

const Home: FC<HomeProps> = props => {
	const context = useContext(Store);

	return (
		<Flex wrap="wrap" gap="large">
			{context.list.map((item: Record<string, unknown>, index) => {
				const items = Object.keys(item).map(key => {
					return {
						key,
						label: key,
						children: <>{item[key]}</>,
					};
				});
				return (
					<Card key={index} bordered={false} style={{ width: 400, height: 250, overflow: 'scroll' }}>
						<Descriptions title="用户卡片" items={items} />
					</Card>
				);
			})}
		</Flex>
	);
};

export default Home;
