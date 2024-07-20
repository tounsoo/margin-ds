import { useEffect, useRef, type ComponentPropsWithoutRef } from "react";
import styles from "./Button.module.scss";
import cx from "classnames";
import { getLabel } from "../../functions";
import { Group, type GroupProps } from "../Group";

export type ButtonProps = ComponentPropsWithoutRef<'button'> & {
	/**
	 * @default default
	 */
	appearance?: "default" | "primary" | "secondary" | "ghost" | "danger";
    /**
     * @default medium
     */
    size?: "small" | "medium";
    fill?: boolean;
    square?: boolean;
};

export const Button = (props: ButtonProps) => {
	const { appearance = "default", size, square, fill, children, ...rest } = props;
    const buttonRef = useRef<HTMLButtonElement>(null);
    const hasNoLabel = getLabel(children).length === 0;
	const classNames = cx(styles.button, styles[appearance], {
        [styles.fill]: fill,
        [styles.small]: size === 'small',
        [styles.square]: square
    });
    
    if (hasNoLabel && !(rest["aria-label"] || rest['aria-labelledby'])) {
        console.error(
            "[A11y Violation] Button needs discernible text\n", 
            "• aria-label is missing\n",
            "• aria-labelledby is missing\n",
        )
    }

	return <button ref={buttonRef} className={classNames} {...rest}>{children}</button>;
};

Button.Group = (props: GroupProps) => {
    const { className, ...rest}= props;
    const classNames = cx(styles['button-group']);
    return <Group className={classNames} {...rest} />
}