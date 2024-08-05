import {
    useEffect,
	useRef,
	useState,
    type RefObject,
	type ChangeEvent,
} from "react";
import styles from "./RadioGroup.module.scss";
import cx from "classnames";
import type { SetRequired } from "type-fest";
import { useAccessibleTarget } from "../../hooks";
import { useA11y } from "../../providers";
import type { A11yProps, BaseComponentProps } from "../../types";
import { Flexbox } from "../Flexbox";
import { Label } from "../Label";

export type RadioGroupProps =
	BaseComponentProps<"input", "defaultValue">;
export const RadioGroup = (props: RadioGroupProps) => {
	const { className, defaultValue, ...rest } = props;
	const classNames = cx(styles["radio-group"], className);

	return <div role="radiogroup" className={classNames} {...rest} />;
};

export type RadioGroupItemProps = SetRequired<
	BaseComponentProps<"input", "name" | "checked" | "disabled">,
	"name"
> & {
    value: string;
    radioInputRef?: RefObject<HTMLInputElement>
	a11y?: A11yProps;
};

RadioGroup.Item = (props: RadioGroupItemProps) => {
	const { className, checked, onChange, a11y, id, value, ref, children, radioInputRef, ...rest } = props;
	const [checkState, setCheckState] = useState(checked);
	const classNames = cx(styles.item, className);
	const containerRef = useRef<HTMLDivElement>(null);

	const { level } = useA11y();
	const safetyMargin = useAccessibleTarget({
		element: containerRef,
		level: a11y?.level ?? level,
		clear:  { inlineStart: true },
	});

	function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
		if (typeof checked !== "undefined") {
			e.target.checked = checked;
			onChange?.(e);
			return;
		}
		onChange?.(e);
	}

	useEffect(() => {
		setCheckState(checked);
	}, [checked]);

	return (
        <Flexbox alignItems="center" style={{...safetyMargin}} gap=".5rem" ref={containerRef}>
            <input
                type="radio"
                ref={radioInputRef}
                checked={checkState}
                className={classNames}
                id={(value ?? id)}
                value={value}
                onChange={handleOnChange}
                {...rest}
            />
            <Label className={styles.label} htmlFor={(value ?? id)}>{children}</Label>
        </Flexbox>
	);
};
