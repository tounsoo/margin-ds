import { type ChangeEvent, useEffect, useRef, useState } from "react";
import styles from "./Checkbox.module.scss";
import cx from "classnames";
import { useAccessibleTarget } from "../../hooks";
import { useA11y } from "../../providers";
import type { A11yProps, BaseComponentProps } from "../../types";
import type { RequireAtLeastOne } from "type-fest";
import { Flexbox, type FlexboxProps } from "../Flexbox";
import { Label } from "../Label";
import { mergeRefs } from "../../functions";

export type CheckboxProps = RequireAtLeastOne<BaseComponentProps<
	"input",
	"checked" | "defaultChecked"
>, 'id' | 'aria-label' | 'aria-labelledby'> & {
	value: string;
	container?: FlexboxProps;
	a11y?: A11yProps;
};
export const Checkbox = (props: CheckboxProps) => {
	const {
		className,
		checked,
		a11y,
		onChange,
		container = {},
		id,
		value,
		children,
		...rest
	} = props;

	const {
		style: containerStyle,
		ref: containerRefProp,
		...containerRest
	} = container;

	const containerRef = useRef<HTMLDivElement>(null);
	const [checkState, setCheckState] = useState(checked);
	const classNames = cx(styles.checkbox, className);

	const { level } = useA11y();
	const safetyMargin = useAccessibleTarget({
		element: containerRef,
		level: a11y?.level ?? level,
		clear: { inlineStart: true },
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

	return (
		<Flexbox
			alignItems="center"
			style={{ ...safetyMargin, ...containerStyle }}
			gap=".5rem"
			ref={mergeRefs(containerRefProp, containerRef)}
			{...containerRest}
		>
			<input
				type="checkbox"
				className={classNames}
				checked={checkState}
				onChange={handleOnChange}
				id={id ?? value}
				value={value}
				{...rest}
			/>
			{children ? (
				<Label className={styles.label} htmlFor={id ?? value}>
					{children}
				</Label>
			) : null}
		</Flexbox>
	);
};
