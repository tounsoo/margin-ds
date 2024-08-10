import { type RefObject, useId, type CSSProperties } from "react";

export const useTooltip = ({
	tooltipRef,
}: { tooltipRef: RefObject<HTMLSpanElement | null> }): {
	anchorProps: {
		style: CSSProperties;
		popoverTarget: string;
	};
	tooltipProps: {
		style: CSSProperties;
		id: string;
		popover: "manual";
	};
} => {
	const id = useId();
	const showPopover = () => {
		tooltipRef.current?.showPopover();
	};
	const hidePopover = () => {
		tooltipRef?.current?.hidePopover();
	};

	// below to be removed once React resolves the issue
	const anchorName = `--anchor-${id.replace(/:\s*/g, "")}`;
	const anchorProps = {
		style: {
			anchorName,
		} as CSSProperties,
		popoverTarget: id,
		onMouseEnter: showPopover,
		onMouseLeave: hidePopover,
		onFocus: showPopover,
		onBlur: hidePopover,
	};

	const tooltipProps = {
		style: {
			positionAnchor: anchorName,
		} as CSSProperties,
		id: id,
		popover: "manual" as const,
	};
	return {
		anchorProps,
		tooltipProps,
	};
};
