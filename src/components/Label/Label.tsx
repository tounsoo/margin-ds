import type { BaseComponentProps } from "../../types";
import styles from "./Label.module.scss";
import cx from "classnames";

export type LabelProps = BaseComponentProps<"label", "htmlFor">;

export const Label = (props: LabelProps) => {
	const { className, ...rest } = props;

	return <label className={cx(styles.label, className)} {...rest} />;
};
