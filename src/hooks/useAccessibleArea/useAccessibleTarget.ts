import { type RefObject, useEffect, useState } from "react";
import type { a11yProps } from "../../types";

export type useAccessibleTargetProps = {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	element: RefObject<any>;
	level?: a11yProps["level"];
	clear?: a11yProps["clear"];
};

export const useAccessibleTarget = ({
	element,
	level = "AA",
	clear,
}: useAccessibleTargetProps) => {
	const [safetyMarginInline, setSafetyMarginInline] = useState<
		number | undefined
	>(undefined);
	const [safetyMarginBlock, setSafetyMarginBlock] = useState<
		number | undefined
	>(undefined);

	useEffect(() => {
		const resizeObserver = new ResizeObserver(() => {
			if (!element.current) return;
			const height = element.current.offsetHeight;
			const width = element.current.offsetWidth;

			if (level === "AAA") {
				setSafetyMarginBlock(height < 44 ? 44 - height : undefined);
				setSafetyMarginInline(width < 44 ? 44 - width : undefined);
				return;
			}

			setSafetyMarginBlock(height < 24 ? 24 - height : undefined);
			setSafetyMarginInline(width < 24 ? 24 - width : undefined);
		});
		resizeObserver.observe(element.current);
		return () => resizeObserver.disconnect();
	}, [element.current, level]);

	return {
		marginBlockStart: clear?.blockStart
			? undefined
			: safetyMarginBlock &&
				safetyMarginBlock / (clear?.blockEnd ? 1 : 2),
		marginBlockEnd: clear?.blockEnd
			? undefined
			: safetyMarginBlock &&
				safetyMarginBlock / (clear?.blockStart ? 1 : 2),
		marginInlineStart: clear?.inlineStart
			? undefined
			: safetyMarginInline &&
				safetyMarginInline / (clear?.inlineEnd ? 1 : 2),
		marginInlineEnd: clear?.inlineEnd
			? undefined
			: safetyMarginInline &&
				safetyMarginInline / (clear?.inlineStart ? 1 : 2),
	};
};
