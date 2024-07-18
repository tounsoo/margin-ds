import { type ChangeEvent, type ComponentPropsWithoutRef, useEffect, useState } from "react";
import styles from "./Checkbox.module.scss";
import cx from "classnames";
import type { Except, RequireAtLeastOne } from "type-fest";

type RequiredProps = 'id' | 'aria-label' | 'aria-labelledby';
export type CheckboxProps = Except<ComponentPropsWithoutRef<'input'>, RequiredProps> & RequireAtLeastOne<ComponentPropsWithoutRef<'input'>, RequiredProps>;
export const Checkbox = (props: CheckboxProps) => {
    const { className, defaultChecked, checked, onChange, ...rest } = props;
    const [ checkState, setCheckState ] = useState(checked ?? defaultChecked);
    const classNames = cx(styles.checkbox, className);

    function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
        if (typeof checked !== 'undefined') {
            e.target.checked = checked
            onChange?.(e);
            return; 
        }
        onChange?.(e);
    }

    useEffect(() => {
        setCheckState(checked)
    }, [checked])

	return <input type="checkbox" className={classNames} checked={checkState} onChange={handleOnChange} {...rest} />;
};