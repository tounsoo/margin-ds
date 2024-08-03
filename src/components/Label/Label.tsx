import type { ComponentPropsWithRef } from "react";
import styles from "./Label.module.scss";
import cx from "classnames";

export type LabelProps = ComponentPropsWithRef<"label">;

export const Label = (props: LabelProps) => {
	const { className, ...rest } = props;

	return <label className={cx(styles.label, className)} {...rest} />;
};
