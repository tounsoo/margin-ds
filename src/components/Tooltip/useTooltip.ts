import {
	useId,
	useState,
	type RefObject,
	type CSSProperties,
	type HTMLAttributes,
} from "react";
import type { TooltipProps } from "./Tooltip";

export const useTooltip = ({
	tooltipRef,
}: { tooltipRef: RefObject<HTMLSpanElement | null> }) => {
	const id = useId();
	const showPopover = () => {
		tooltipRef.current?.showPopover();
	};
	const hidePopover = () => {
		tooltipRef?.current?.hidePopover();
	};

	// below to be removed once React resolves the issue
	const anchorName = `--anchor-${id.replace(/:\s*/g, "")}`;
	const getAnchorProps = (props?: HTMLAttributes<unknown>) => {
		return {
			...props,
			style: {
				...props?.style,
				anchorName,
			} as CSSProperties,
			"aria-describedby": id,
			popoverTarget: id,
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			onMouseEnter: (e: any) => {
				props?.onMouseEnter?.(e);
				showPopover();
			},
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			onMouseLeave: (e: any) => {
				props?.onMouseLeave?.(e);
				hidePopover();
			},
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			onFocus: (e: any) => {
				props?.onFocus?.(e);
				showPopover();
			},
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			onBlur: (e: any) => {
				props?.onBlur?.(e);
				hidePopover();
			},
		};
	};

	const getTooltipProps = (props?: TooltipProps) => {
		return {
			...props,
			style: {
				...props?.style,
				positionAnchor: anchorName,
			} as CSSProperties,
			id: id,
			popover: "manual" as const,
		};
	};
	return {
		getAnchorProps,
		getTooltipProps,
	};
};
