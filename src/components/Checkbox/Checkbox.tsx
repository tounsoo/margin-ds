import { type ChangeEvent, type ComponentPropsWithoutRef, useEffect, useState } from "react";
import styles from "./Checkbox.module.scss";
import cx from "classnames";
import type { Except, RequireAtLeastOne } from "type-fest";

type RequiredProps = 'id' | 'aria-label' | 'aria-labelledby';
export type CheckboxProps = Except<ComponentPropsWithoutRef<'input'>, RequiredProps> & RequireAtLeastOne<ComponentPropsWithoutRef<'input'>, RequiredProps>;
export const Checkbox = (props: CheckboxProps) => {
    const { className, checked, onChange, ...rest } = props;
    const [ checkState, setCheckState ] = useState(checked);
    const classNames = cx(styles.checkbox, className);

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
   
	return <input type="checkbox" className={classNames} checked={checkState} onChange={handleOnChange} {...rest} />;
};