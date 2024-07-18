import type { HTMLAttributes } from "react";
import styles from "./Button.module.scss";
import cx from "classnames";

export type ButtonProps = HTMLAttributes<HTMLButtonElement> & {
	/**
	 * @default default
	 */
	appearance?: "default" | "primary" | "text" | "danger";
    fill?: boolean;
};

export const Button = (props: ButtonProps) => {
	const { appearance = "default", fill, ...rest } = props;
	const classNames = cx(styles.button, styles[appearance], {
        [styles.fill]: fill
    });
	return <button className={classNames} {...rest} />;
};
