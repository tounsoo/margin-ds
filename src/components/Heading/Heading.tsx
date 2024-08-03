import type { ComponentPropsWithRef } from "react";
import styles from "./Heading.module.scss";
import cx from "classnames";

export type HeadingProps<T extends "h1" | "h2" | "h3" | "h4" | "h5" | "h6"> =
	ComponentPropsWithRef<T> & {
		as: T;
	};

export const Heading = (
	props:
		| HeadingProps<"h1">
		| HeadingProps<"h2">
		| HeadingProps<"h3">
		| HeadingProps<"h4">
		| HeadingProps<"h5">
		| HeadingProps<"h6">,
) => {
	const { as: Element, className, ...rest } = props;
	const classNames = cx(styles.heading, className);

	return <Element className={classNames} {...rest} />;
};
