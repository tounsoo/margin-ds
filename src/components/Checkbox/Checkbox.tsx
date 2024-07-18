import { type ChangeEvent, type ComponentPropsWithoutRef, useEffect, useState } from "react";
import styles from "./Checkbox.module.scss";
import cx from "classnames";

export type CheckboxProps = ComponentPropsWithoutRef<'input'>;

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
        setCheckState(e.target.checked);
    }

    useEffect(() => {
        setCheckState(checked)
    }, [checked])

	return <input type="checkbox" className={classNames} checked={checkState} onChange={handleOnChange} {...rest} />;
};