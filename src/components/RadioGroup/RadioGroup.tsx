import  { useEffect, useState, type ChangeEvent, type ComponentPropsWithoutRef } from "react";
import styles from "./RadioGroup.module.scss";
import cx from "classnames";
import type { Except, RequireAtLeastOne, SetRequired } from "type-fest";

type RequiredProps = 'id' | 'aria-label' | 'aria-labelledby';
export type RadioGroupProps = Except<ComponentPropsWithoutRef<'div'>, RequiredProps> & RequireAtLeastOne<ComponentPropsWithoutRef<'input'>, RequiredProps> & {
};
export const RadioGroup = (props: RadioGroupProps) => {
    const { className,  defaultValue, ...rest } = props;
    const classNames = cx(styles['radio-group'], className);

	return <div role="radiogroup" className={classNames} {...rest} />;
};

export type RadioGroupItemProps = SetRequired<ComponentPropsWithoutRef<'input'>, 'name'>;
RadioGroup.Radio = (props: RadioGroupItemProps) => {
    const { className, checked, onChange, ...rest } = props;
    const [ checkState, setCheckState ] = useState(checked);
    const classNames = cx(styles.item, className);

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

	return <input type="radio" checked={checkState} className={classNames} onChange={handleOnChange} {...rest} />;
};