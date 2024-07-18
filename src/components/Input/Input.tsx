import type { ComponentPropsWithoutRef } from "react";
import styles from "./Input.module.scss";
import cx from "classnames";

export type InputProps = ComponentPropsWithoutRef<'input'>;


export const Input = (props: InputProps) => {
	const { ...rest } = props;
	const classNames = cx(styles.input);
	return <input className={classNames} {...rest} />;
};
