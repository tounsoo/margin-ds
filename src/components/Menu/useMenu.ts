import {
	type RefObject,
	useEffect,
	useId,
	useState,
	type CSSProperties,
	type MouseEvent,
	type HTMLAttributes,
} from "react";
import type { MenuProps } from "./Menu";

export const useMenu = (menuRef: RefObject<HTMLUListElement | null>) => {
	const [isOpen, setIsOpen] = useState(false);
	const id = useId();

	useEffect(() => {
		function handleToggle(e: Event) {
			if ((e as ToggleEvent).newState === "open") {
				setIsOpen(true);
			}
			if ((e as ToggleEvent).newState === "closed") {
				setIsOpen(false);
			}
		}
		menuRef.current?.addEventListener("toggle", (e) => handleToggle(e));

		return () =>
			menuRef.current?.removeEventListener("toggle", (e) =>
				handleToggle(e),
			);
	}, [menuRef.current]);

	// below to be removed once React resolves the issue
	const anchorName = `--anchor-${id.replace(/:\s*/g, "")}`;

	const getAnchorProps = (props?: HTMLAttributes<unknown>) => {
		return {
			...props,
			style: {
				...props?.style,
				anchorName,
			} as CSSProperties,
			popoverTarget: id,
			"aria-expanded": isOpen,
			"aria-controls": id,
			"aria-haspopup": true,
		};
	};

	const getMenuProps = (props?: MenuProps) => {
		return {
			...props,
			style: {
				...props?.style,
				positionAnchor: anchorName,
			} as CSSProperties,
			id: id,
			popover: "auto" as const,
		};
	};

	return {
		getAnchorProps,
		getMenuProps,
	};
};
