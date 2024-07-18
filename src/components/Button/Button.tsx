import type { ComponentPropsWithoutRef } from "react";
import styles from "./Button.module.scss";
import cx from "classnames";
import { getLabel } from "../../functions";

export type ButtonProps = ComponentPropsWithoutRef<'button'> & {
	/**
	 * @default default
	 */
	appearance?: "default" | "primary" | "text" | "danger";
    fill?: boolean;
};

export const Button = (props: ButtonProps) => {
	const { appearance = "default", fill, children, ...rest } = props;
    const hasNoLabel = getLabel(children).length === 0;
	const classNames = cx(styles.button, styles[appearance], {
        [styles.fill]: fill,
        [styles['no-label']]: hasNoLabel
    });

    
    if (hasNoLabel && !(rest["aria-label"] || rest['aria-labelledby'])) {
        console.error(
            '[A11y Violation: wcag412] Button needs discernible text. Alternatively, use aria-label or aria-labelledby. More Info: https://www.w3.org/WAI/WCAG21/Understanding/name-role-value.html'
        )
    }

	return <button className={classNames} {...rest}>{children}</button>;
};
