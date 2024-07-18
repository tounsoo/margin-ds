import type { CSSProperties, HTMLAttributes } from "react";
import styles from "./Group.module.scss";
import cx from "classnames";

export type GroupProps = HTMLAttributes<HTMLDivElement> & {
	direction?: CSSProperties["flexDirection"];
	wrap?: CSSProperties["flexWrap"];
	justifyContent?: CSSProperties["justifyContent"];
    fill?: boolean;
};


export const Group = (props: GroupProps) => {
	const { fill, direction, wrap, justifyContent, style, ...rest } = props;
	const classNames = cx(styles.group, {
        [styles.fill]: fill
    });
	const combinedStyle = {
		"--direction": direction,
		"--justify-content": justifyContent,
		"--wrap": wrap,
		...style,
	};

	return <div className={classNames} style={combinedStyle} {...rest} />;
};