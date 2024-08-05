import {
	type ChangeEvent,
	useEffect,
	useRef,
	useState,
} from "react";
import styles from "./Checkbox.module.scss";
import cx from "classnames";
import { useAccessibleTarget } from "../../hooks";
import { useA11y } from "../../providers";
import type { A11yProps, BaseComponentProps } from "../../types";
import { mergeRefs } from "../../functions";

export type CheckboxProps = BaseComponentProps<"input", "checked" | "defaultChecked"> & {
		a11y?: A11yProps;
	};
export const Checkbox = (props: CheckboxProps) => {
	const { className, checked, style, a11y, onChange, ref, ...rest } = props;
	const checkboxRef = useRef<HTMLInputElement>(null);
	const [checkState, setCheckState] = useState(checked);
	const classNames = cx(styles.checkbox, className);

	const { level } = useA11y();
	const safetyMargin = useAccessibleTarget({
		element: checkboxRef,
		level: a11y?.level ?? level,
		clear: a11y?.clear,
	});

	useEffect(() => {
		setCheckState(checked);
	}, [checked]);

	function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
		if (typeof checked !== "undefined") {
			e.target.checked = checked;
			onChange?.(e);
			return;
		}
		onChange?.(e);
	}

	const combinedStyle = {
		...safetyMargin,
		...style,
	};

	return (
		<input
			type="checkbox"
			className={classNames}
			style={combinedStyle}
			ref={mergeRefs(ref, checkboxRef)}
			checked={checkState}
			onChange={handleOnChange}
			{...rest}
		/>
	);
};
