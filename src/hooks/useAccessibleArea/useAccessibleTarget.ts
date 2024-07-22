import { type RefObject, useEffect, useState } from "react";
import type { a11yProps } from "../../types";

export type useAccessibleTargetProps = {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	element: RefObject<any>;
	level?: a11yProps["level"];
	veto?: a11yProps["veto"];
};

export const useAccessibleTarget = ({
	element,
	level = "AA",
	veto,
}: useAccessibleTargetProps) => {
	const [safetyMarginInline, setSafetyMarginInline] = useState<
		number | undefined
	>(undefined);
	const [safetyMarginBlock, setSafetyMarginBlock] = useState<
		number | undefined
	>(undefined);

	useEffect(() => {
		if (!element.current) return;
		const resizeObserver = new ResizeObserver(() => {
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
		marginBlockStart: veto?.blockStart
			? undefined
			: safetyMarginBlock && safetyMarginBlock / (veto?.blockEnd ? 1 : 2),
		marginBlockEnd: veto?.blockEnd
			? undefined
			: safetyMarginBlock &&
				safetyMarginBlock / (veto?.blockStart ? 1 : 2),
		marginInlineStart: veto?.inlineStart
			? undefined
			: safetyMarginInline &&
				safetyMarginInline / (veto?.inlineEnd ? 1 : 2),
		marginInlineEnd: veto?.inlineEnd
			? undefined
			: safetyMarginInline &&
				safetyMarginInline / (veto?.inlineStart ? 1 : 2),
	};
};
