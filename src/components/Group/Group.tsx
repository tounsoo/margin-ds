import type { CSSProperties, ComponentPropsWithoutRef } from "react";
import styles from "./Group.module.scss";
import cx from "classnames";

export type GroupProps = ComponentPropsWithoutRef<'div'> & {
	direction?: CSSProperties["flexDirection"];
	wrap?: CSSProperties["flexWrap"];
	justifyContent?: CSSProperties["justifyContent"];
	alignItems?: CSSProperties["alignItems"];
	gap?: CSSProperties["gap"];
    fill?: boolean;
};


export const Group = (props: GroupProps) => {
	const { fill, direction, wrap, justifyContent, alignItems, gap, style, ...rest } = props;
	const classNames = cx(styles.group, {
        [styles.fill]: fill
    });
	const combinedStyle = {
		"flex-direction": direction,
		"justify-content": justifyContent,
		"align-items": alignItems,
		"flex-wrap": wrap,
        "gap": gap,
		...style,
	};

	return <div className={classNames} style={combinedStyle} {...rest} />;
};