import type { CSSProperties, ComponentPropsWithoutRef } from "react";
import styles from "./ButtonGroup.module.scss";
import cx from "classnames";

export type ButtonGroupProps = ComponentPropsWithoutRef<"div"> & {
	direction?: CSSProperties["flexDirection"];
	wrap?: CSSProperties["flexWrap"];
	justifyContent?: CSSProperties["justifyContent"];
};

export const ButtonGroup = (props: ButtonGroupProps) => {
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

ButtonGroup.Spacer = () => {
	return (
		<div role="presentation" className={styles["button-group-spacer"]} />
	);
};
