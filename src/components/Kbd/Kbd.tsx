import cx from "classnames";
import styles from "./Kbd.module.scss";
import type { BaseComponentProps } from "../../types";

export type KbdProps = BaseComponentProps<"kbd">;
export const Kbd = (props: KbdProps) => {
	const { className, ...rest } = props;
	return <kbd className={cx(styles.kbd, className)} {...rest} />;
};
