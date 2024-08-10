import type { BaseComponentProps } from "../../types";
import styles from "./Tooltip.module.scss";
import cx from "classnames";

export type Position =
	| "block-start center"
	| "block-start span-inline-start"
	| "block-start span-inline-end"
	| "block-start"
	| "inline-start center"
	| "inline-start span-block-start"
	| "inline-start span-block-end"
	| "inline-start"
	| "block-end center"
	| "block-end span-inline-start"
	| "block-end span-inline-end"
	| "block-end"
	| "inline-end center"
	| "inline-end span-block-start"
	| "inline-end span-block-end"
	| "inline-end";

export type TooltipProps = Omit<BaseComponentProps<"span">, 'id'> & {
	position?: Position;
    disableFlip?: 'block' | 'inline' | 'both';
};

export const Tooltip = (
	props: TooltipProps,
) => {
	const { position = "block-end", disableFlip, children, className, ...rest } = props;
	
	const classNames = cx(styles.tooltip, className, {
		// positions
		[styles["block-start--center"]]: position === "block-start center",
		[styles["block-start--span-inline-start"]]:
			position === "block-start span-inline-start",
		[styles["block-start--span-inline-end"]]:
			position === "block-start span-inline-end",
		[styles["block-start"]]: position === "block-start",
		[styles["inline-start--center"]]: position === "inline-start center",
		[styles["inline-start--span-block-start"]]:
			position === "inline-start span-block-start",
		[styles["inline-start--span-block-end"]]:
			position === "inline-start span-block-end",
		[styles["inline-start"]]: position === "inline-start",
		[styles["block-end--center"]]: position === "block-end center",
		[styles["block-end--span-inline-start"]]:
			position === "block-end span-inline-start",
		[styles["block-end--span-inline-end"]]:
			position === "block-end span-inline-end",
		[styles["block-end"]]: position === "block-end",
		[styles["inline-end--center"]]: position === "inline-end center",
		[styles["inline-end--span-block-start"]]:
			position === "inline-end span-block-start",
		[styles["inline-end--span-block-end"]]:
			position === "inline-end span-block-end",
		[styles["inline-end"]]: position === "inline-end",

        // flip fallback control
        [styles["disable-flip-block"]]: disableFlip === 'block',
        [styles["disable-flip-inline"]]: disableFlip === 'inline',
        [styles["disable-flip"]]: disableFlip === 'both',
	});

	return <span className={classNames} popover="auto" {...rest}>{children}</span>;
};
