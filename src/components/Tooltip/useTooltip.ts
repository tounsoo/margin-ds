import { type RefObject, useId, type CSSProperties } from "react";

export const useTooltip = ({
	tooltipRef,
}: { tooltipRef: RefObject<HTMLSpanElement | null> }): {
	anchorProps: {
		style: CSSProperties;
		popoverTarget: string;
		popover: "manual";
	};
	tooltipProps: {
		style: CSSProperties;
		id: string;
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
		popover: "manual" as const,
	};

	const tooltipProps = {
		style: {
			positionAnchor: anchorName,
		} as CSSProperties,
		id: id,
	};
	return {
		anchorProps,
		tooltipProps,
	};
};
