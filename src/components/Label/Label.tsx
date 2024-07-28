import type { ComponentPropsWithoutRef } from "react";
import styles from "./Label.module.scss";
import cx from "classnames";

export type LabelProps = ComponentPropsWithoutRef<"label">;

export const Label = (props: LabelProps) => {
	const { className, ...rest } = props;

	return <label className={cx(styles.label, className)} {...rest} />;
};
