import { useRef, useState, useEffect } from 'react';

interface Props {
	text: string;
}

const useLabelWidth = ({ text }: Props) => {
	const [isBlock, setIsBlock] = useState<boolean>(false);
	const label = useRef<HTMLSpanElement>(null);
	const labelContainer = useRef<HTMLDivElement>(null);

	const [symbolsCount, setSymbolsCount] = useState<number>(0);

	useEffect(() => {
		const labelWidth = label.current?.getBoundingClientRect().width;
		const containerWidth = labelContainer.current?.getBoundingClientRect().width;

		if (!labelWidth || !containerWidth) {
			return;
		}

		if (labelWidth >= containerWidth) {
			setSymbolsCount(text.length);
			setIsBlock(true);
		}

		if (text.length < symbolsCount) {
			setIsBlock(false);
			setSymbolsCount(0);
		}
	}, [text.length, symbolsCount]);

	return { isBlock, label, labelContainer };
};

export default useLabelWidth;
