import React, {FC, useCallback, useContext, useState} from 'react';
import {Button, Card, Form, Input, Space, Typography} from 'antd';
import {MinusCircleOutlined, PlusOutlined} from '@ant-design/icons';
import {Store} from '../../store/context';

interface FormProps {
}

const ParamGroup: FC<FormProps> = props => {
	const context = useContext(Store);
	const [formData, setFormData] = useState<Record<string, unknown> | null>(null);
	const onFinish = useCallback((value: { props: Array<{ key: string; value: string }> }) => {
		const curValue = value.props.reduce((pre: Record<string, string>, item) => ({ ...pre, [item.key]: item.value }), {});
		setFormData(curValue);
		context.setContext({ list: [...context.list, curValue] });
	}, []);
	return (
		<div>
			<Typography.Title level={4} style={{ margin: '12px 0 24px 0' }}>
				数据录入表单
			</Typography.Title>
			<Form
				onFinish={onFinish}
				style={{width: 400}}
				autoComplete="off"
			>
				<Form.List name="props">
					{(fields, {add, remove}) => (
						<>
							{fields.map(({key, name, ...restField}) => (
								<Space key={key} style={{display: 'flex', marginBottom: 8}} align="baseline">
									<Form.Item
										{...restField}
										name={[name, 'key']}
										rules={[{required: true, message: '属性名称必填'}, { pattern: /^[a-zA-Z_][a-zA-Z0-9_]*$/, message: '不符合 JS 对象属性规范' }]}
									>
										<Input placeholder="属性名称"/>
									</Form.Item>
									<Form.Item
										{...restField}
										name={[name, 'value']}
										rules={[{required: true, message: '属性值必填'}]}
									>
										<Input placeholder="值"/>
									</Form.Item>
									{fields.length <= 1 ? null : <MinusCircleOutlined onClick={() => remove(name)}/>}
								</Space>
							))}
							<Form.Item>
								<Button type="dashed" onClick={() => add()} block icon={<PlusOutlined/>}>
									添加属性
								</Button>
							</Form.Item>
						</>
					)}
				</Form.List>
				<Form.Item>
					<Button type="primary" htmlType="submit">
						提交
					</Button>
				</Form.Item>
			</Form>

			{formData ? (
				<Card title="您提交的数据是" bordered={false} style={{ width: 400 }}>
					<pre style={{ margin: 0 }}>
						<code>
							{JSON.stringify(formData, null, 2)}
						</code>
					</pre>
				</Card>
			) : null}
		</div>
	);
};

export default ParamGroup;
