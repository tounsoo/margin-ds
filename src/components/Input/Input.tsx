import type { ComponentPropsWithoutRef } from "react";
import type { Except, RequireAtLeastOne } from 'type-fest';
import styles from "./Input.module.scss";
import cx from "classnames";

type RequiredProps = 'id' | 'aria-label' | 'aria-labelledby';
export type InputProps = Except<ComponentPropsWithoutRef<'input'>, RequiredProps> & RequireAtLeastOne<ComponentPropsWithoutRef<'input'>, RequiredProps>;

export const Input = (props: InputProps) => {
	const { ...rest } = props;
	const classNames = cx(styles.input);
	return <input className={classNames} {...rest} />;
};
