import React, {FC, useCallback, useState, useRef, useEffect} from 'react';
import {Card} from 'antd';

interface ScrollBoxProps {
	title: string;
	pause?: boolean;
	list: Array<{ name: string; time_delayed: number }>;
}

const MAX_HEIGHT = 276;
const ScrollBox: FC<ScrollBoxProps> = props => {
	const { title, list, pause } = props;
	const scrollContainerRef = useRef<HTMLDivElement>(null);
	const clickPause = useRef(false);
	const scroll = useRef(false);
	const isHover = useRef(false);
	const timer = useRef<any>(null);
	const top = useRef(0);
	const [height, setHeight] = useState(0);

	const animation = useCallback(() => {
		timer.current = window.requestAnimationFrame(() => {
			if (scrollContainerRef.current) {
				top.current = top.current + 0.5;
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
			setHeight(ref.clientHeight);
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
			console.log(1111111);
			window.cancelAnimationFrame(timer.current);
		};
	}, []);

	return (
		<Card
			title={title}
			style={{ width: 350, height: 380 }}
			onMouseEnter={scroll && pause ? onMouseEnter : undefined}
			onMouseLeave={scroll && pause ? onMouseLeave : undefined}
		>
			<div ref={scrollContainerRef} style={{ maxHeight: `${MAX_HEIGHT}px`, cursor: scroll && pause ? 'pointer' : 'default', overflow: 'hidden' }}>
				<div ref={handleContainerRef} onClick={scroll && pause ? onClickPause : undefined}>
					{list.map((item, index) => {
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
