import type { HTMLAttributes } from "react";
import styles from "./Spacer.module.scss";
import cx from "classnames";

export type SpacerProps = HTMLAttributes<HTMLDivElement>;

export const Spacer = (props: SpacerProps) => {
    const { className, ...rest} = props;
	return (
		<div role="presentation" className={cx(styles.spacer, className)} {...rest} />
	);
};
