import type { CSSProperties, ComponentPropsWithoutRef } from "react";
import styles from "./Flex.module.scss";
import cx from "classnames";

export type FlexProps = ComponentPropsWithoutRef<'div'> & {
	direction?: CSSProperties["flexDirection"];
	wrap?: CSSProperties["flexWrap"];
	justifyContent?: CSSProperties["justifyContent"];
	alignItems?: CSSProperties["alignItems"];
	gap?: CSSProperties["gap"];
    fill?: boolean;
};


export const Flex = (props: FlexProps) => {
	const { className, fill, direction, wrap, justifyContent, alignItems, gap, style, ...rest } = props;
	const classNames = cx(styles.flex, className, {
        [styles.fill]: fill
    });
	const combinedStyle = {
		flexDirection: direction,
		justifyContent: justifyContent,
		alignItems: alignItems,
		flexWrap: wrap,
        gap,
		...style,
	};

	return <div className={classNames} style={combinedStyle} {...rest} />;
};