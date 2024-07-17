import type { CSSProperties, HTMLAttributes } from "react";
import styles from "./Button.module.scss";
import cx from "classnames";

export type ButtonProps = HTMLAttributes<HTMLButtonElement> & {
	/**
	 * @default default
	 */
	appearance?: "default" | "primary" | "text" | "danger";
};

export type ButtonGroupProps = HTMLAttributes<HTMLDivElement> & {
	direction?: CSSProperties["flexDirection"];
	wrap?: CSSProperties["flexWrap"];
	justifyContent?: CSSProperties["justifyContent"];
};


export const Button = (props: ButtonProps) => {
	const { appearance = "default", ...rest } = props;
	const classNames = cx(styles.button, styles[appearance]);
	return <button className={classNames} {...rest} />;
};

Button.Group = (props: ButtonGroupProps) => {
	const { direction, wrap, justifyContent, style, ...rest } = props;
	const classNames = cx(styles["button-group"]);
	const combinedStyle = {
		"--direction": direction,
		"--justify-content": justifyContent,
		"--wrap": wrap,
		...style,
	};

	return <div className={classNames} style={combinedStyle} {...rest} />;
};