import type { ElementType, HTMLAttributes } from "react";
import styles from "./Link.module.scss";
import cx from "classnames";

export type LinkProps = HTMLAttributes<HTMLAnchorElement> & {
	/**
	 * @default default
	 */
	appearance?: "default" | "underlined";
    component?: ElementType;
};

export const Link = (props: LinkProps) => {
    const { className, component: Component = 'a', appearance = "default", ...rest } = props;
    const classNames = cx(styles.link, className, styles[appearance]);

	return <Component className={classNames} {...rest} />;
};

