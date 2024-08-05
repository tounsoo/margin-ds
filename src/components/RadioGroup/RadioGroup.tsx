import {
	useEffect,
	useRef,
	useState,
	type RefObject,
	type ChangeEvent,
} from "react";
import styles from "./RadioGroup.module.scss";
import cx from "classnames";
import type { RequireAtLeastOne, SetRequired } from "type-fest";
import { useAccessibleTarget } from "../../hooks";
import { useA11y } from "../../providers";
import type { A11yProps, BaseComponentProps } from "../../types";
import { Flexbox, type FlexboxProps } from "../Flexbox";
import { Label } from "../Label";
import { mergeRefs } from "../../functions";

export type RadioGroupProps = BaseComponentProps<"input", "defaultValue">;
export const RadioGroup = (props: RadioGroupProps) => {
	const { className, defaultValue, ...rest } = props;
	const classNames = cx(styles["radio-group"], className);

	return <div role="radiogroup" className={classNames} {...rest} />;
};

export type RadioGroupItemProps = RequireAtLeastOne<SetRequired<
	BaseComponentProps<"input", "name" | "checked" | "disabled">,
	"name"
>, 'id' | 'aria-label' | 'aria-labelledby'> & {
	value: string;
	container?: FlexboxProps;
	a11y?: A11yProps;
};

RadioGroup.Item = (props: RadioGroupItemProps) => {
	const {
		className,
		checked,
		onChange,
		a11y,
		id,
		value,
		container = {},
		children,
		...rest
	} = props;
	const [checkState, setCheckState] = useState(checked);
	const classNames = cx(styles.item, className);
	const {
		style: containerStyle,
		ref: containerRefProp,
		...containerRest
	} = container;

	const containerRef = useRef<HTMLDivElement>(null);

	const { level } = useA11y();
	const safetyMargin = useAccessibleTarget({
		element: containerRef,
		level: a11y?.level ?? level,
		clear: { inlineStart: true },
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
		<Flexbox
			alignItems="center"
			style={{ ...safetyMargin, ...containerStyle }}
			gap=".5rem"
			ref={mergeRefs(containerRefProp, containerRef)}
			{...containerRest}
		>
			<input
				type="radio"
				checked={checkState}
				className={classNames}
				id={value ?? id}
				value={value}
				onChange={handleOnChange}
				{...rest}
			/>
			{children ? (
				<Label className={styles.label} htmlFor={value ?? id}>
					{children}
				</Label>
			) : null}
		</Flexbox>
	);
};
