import type { ElementType, ComponentPropsWithoutRef } from "react";
import styles from "./Link.module.scss";
import cx from "classnames";

export type LinkProps = ComponentPropsWithoutRef<'a'> & {
	/**
	 * @default default
	 */
	appearance?: "default" | "underlined";
    // TODO: make sure below is typed correctly
    component?: ElementType;
};

export const Link = (props: LinkProps) => {
    const { className, component: Component = 'a', appearance = "default", ...rest } = props;
    const classNames = cx(styles.link, className, styles[appearance]);

	return <Component className={classNames} {...rest} />;
};

