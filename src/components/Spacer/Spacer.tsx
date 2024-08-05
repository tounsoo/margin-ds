import type { CSSProperties } from "react";
import styles from "./Spacer.module.scss";
import cx from "classnames";
import type { BaseComponentProps } from "../../types";

export type SpacerProps = BaseComponentProps<"div"> & {
	minWidth?: CSSProperties["minWidth"];
	minHeight?: CSSProperties["minHeight"];
};

export const Spacer = (props: SpacerProps) => {
	const { className, minWidth, minHeight, style, ...rest } = props;
	const combinedStyle = {
		minWidth,
		minHeight,
		...style,
	};
	return (
		<div
			role="presentation"
			style={combinedStyle}
			className={cx(styles.spacer, className)}
			{...rest}
		/>
	);
};
