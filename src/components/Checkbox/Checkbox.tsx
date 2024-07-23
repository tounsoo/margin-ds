import { type ChangeEvent, type ComponentPropsWithoutRef, useEffect, useRef, useState } from "react";
import styles from "./Checkbox.module.scss";
import cx from "classnames";
import type { Except, RequireAtLeastOne } from "type-fest";
import { useAccessibleTarget } from "../../hooks";
import { useA11y } from "../../providers";
import type { a11yProps } from "../../types";

type RequiredProps = 'id' | 'aria-label' | 'aria-labelledby';
export type CheckboxProps = 
    Except<ComponentPropsWithoutRef<'input'>, RequiredProps> 
    & RequireAtLeastOne<ComponentPropsWithoutRef<'input'>, RequiredProps>
    & {
        a11y?: a11yProps
    };
export const Checkbox = (props: CheckboxProps) => {
    const { className, checked, style, a11y, onChange, ...rest } = props;
    const checkboxRef = useRef<HTMLInputElement>(null);
    const [ checkState, setCheckState ] = useState(checked);
    const classNames = cx(styles.checkbox, className);

    const { level } = useA11y();
    const safetyMargin = useAccessibleTarget({element: checkboxRef, level: a11y?.level ?? level, clear: a11y?.clear});

    useEffect(() => {
        setCheckState(checked)
    }, [checked])

    useEffect(() => {
        if (rest['aria-label'] || rest['aria-labelledby']) return;
        if (!document.querySelectorAll(`[for='${rest.id}']`).length) {
            console.error(
                "[A11y Violation] Form element needs proper label\n", 
                "• aria-label is missing\n",
                "• aria-labelledby is missing\n",
                "• use id with htmlFor\n",
            )
        }
    }, [rest.id, rest['aria-label'], rest['aria-labelledby']])

    function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
        if (typeof checked !== 'undefined') {
            e.target.checked = checked
            onChange?.(e);
            return; 
        }
        onChange?.(e);
    }

    const combinedStyle = {
        ...safetyMargin,
        ...style
    }
   
	return <input type="checkbox" className={classNames} style={combinedStyle} ref={checkboxRef} checked={checkState} onChange={handleOnChange} {...rest} />;
};