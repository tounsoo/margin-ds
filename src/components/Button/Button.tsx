import { useRef, type ComponentPropsWithoutRef } from "react";
import styles from "./Button.module.scss";
import cx from "classnames";
import { useA11y } from "../../providers";
import type { a11yProps } from "../../types";
import { useAccessibleTarget } from "../../hooks";
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

    a11y?: a11yProps;
};

export const Button = (props: ButtonProps) => {
	const { appearance = "default", size, fill, children, style, a11y, ...rest } = props;
    const buttonRef = useRef<HTMLButtonElement>(null);
    
	const classNames = cx(styles.button, styles[appearance], {
        [styles.fill]: fill,
        [styles.small]: size === 'small',
    });

    const { level } = useA11y();
    const safetyMargin = useAccessibleTarget({element: buttonRef, level: a11y?.level ?? level, veto: a11y?.veto});

    const hasNoLabel = getLabel(children).length === 0;
    if (hasNoLabel && !(rest["aria-label"] || rest['aria-labelledby'])) {
        console.error(
            "[A11y Violation] Button needs discernible text\n", 
            "• aria-label is missing\n",
            "• aria-labelledby is missing\n",
        )
    }

    const combinedStyle = {
        ...safetyMargin,
        ...style
    }

	return (
        <button 
            ref={buttonRef} 
            className={classNames} 
            style={combinedStyle}
            {...rest}
        >
            {children}
        </button>
    );
};

Button.Group = (props: GroupProps) => {
    const { className, ...rest}= props;
    const classNames = cx(styles['button-group']);
    return <Group className={classNames} {...rest} />
}