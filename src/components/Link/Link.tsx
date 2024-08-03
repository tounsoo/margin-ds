import type { ComponentPropsWithRef } from "react";
import styles from "./Link.module.scss";
import cx from "classnames";

export type LinkProps = ComponentPropsWithRef<"a"> & {
	/**
	 * @default default
	 */
	appearance?: "default" | "underlined";
};

export const Link = (props: LinkProps) => {
	const { className, appearance = "default", ...rest } = props;
	const classNames = cx(styles.link, className, styles[appearance]);

	return <a className={classNames} {...rest} />;
};
