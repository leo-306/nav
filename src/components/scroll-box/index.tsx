import React, {FC, useCallback, useState, useRef, useEffect} from 'react';
import {Card} from 'antd';

interface ScrollBoxProps {
	title: string;
	pause?: boolean;
	list: Array<{ name: string; time_delayed: number }>;
}

const MAX_HEIGHT = 264;
/** 多渲染 13 个元素，用于无线滚动 */
const LEN = 12;
const ScrollBox: FC<ScrollBoxProps> = props => {
	const { title, list, pause } = props;
	const scrollContainerRef = useRef<HTMLDivElement>(null);
	const clickPause = useRef(false);
	const scroll = useRef(false);
	const isHover = useRef(false);
	const timer = useRef<any>(null);
	const top = useRef(0);
	const height = useRef(0);

	const animation = useCallback(() => {
		timer.current = window.requestAnimationFrame(() => {
			if (scrollContainerRef.current) {
				top.current = top.current + 0.5;
				/** 22 是每个元素的高 */
				if (top.current === list.length * 22) {
					top.current = 0;
				}
				scrollContainerRef.current!.scrollTop = top.current;
				animation();
			}
		});
	}, []);
	const handleContainerRef = useCallback((ref: HTMLDivElement) => {
		if (ref) {
			if (ref.clientHeight >= MAX_HEIGHT) {
				scroll.current = true;
				animation();
			}
			height.current = ref.clientHeight;
		}
	}, []);
	const onMouseEnter = useCallback(() => {
		window.cancelAnimationFrame(timer.current);
		isHover.current = true;
	}, []);
	const onMouseLeave = useCallback(() => {
		isHover.current = false;
		if (!clickPause.current) {
			animation();
		}
	}, []);
	const onClickPause = useCallback(() => {
		if (clickPause.current) {
			clickPause.current = false;
			!isHover.current && animation();
		} else {
			clickPause.current = true;
			window.cancelAnimationFrame(timer.current);
		}
	}, []);

	useEffect(() => {
		if (scroll.current) {
			window.cancelAnimationFrame(timer.current);
			animation();
		}
		return () => {
			window.cancelAnimationFrame(timer.current);
		};
	}, []);

	return (
		<Card
			title={title}
			style={{ width: 350, height: 368 }}
			onMouseEnter={scroll && pause ? onMouseEnter : undefined}
			onMouseLeave={scroll && pause ? onMouseLeave : undefined}
		>
			<div ref={scrollContainerRef} style={{ maxHeight: `${MAX_HEIGHT}px`, cursor: scroll && pause ? 'pointer' : 'default', overflow: 'hidden' }}>
				<div ref={handleContainerRef} onClick={scroll && pause ? onClickPause : undefined}>
					{[...list, ...list.slice(0, 12)].map((item, index) => {
						return (
							<div key={index} style={{ display: 'flex', justifyContent: 'center' }}>
								<span style={{ flex: 1, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{item.name}</span>
								<span style={{ marginLeft: '8px', width: '80px' }}>延期 {item.time_delayed} 天</span>
							</div>
						);
					})}
				</div>
			</div>
		</Card>
	);
};

export default ScrollBox;
