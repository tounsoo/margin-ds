import { useRef } from "react";
import type { RequireAtLeastOne } from "type-fest";
import styles from "./Input.module.scss";
import cx from "classnames";
import type { A11yProps, BaseComponentProps } from "../../types";
import { useAccessibleTarget } from "../../hooks";
import { useA11y } from "../../providers";
import { mergeRefs } from "../../functions";

export type InputProps = RequireAtLeastOne<
	BaseComponentProps<"input", "defaultValue" | "value">,
	"id" | "aria-label" | "aria-labelledby"
> & {
	a11y?: A11yProps;
};

export const Input = (props: InputProps) => {
	const { style, a11y, ref, ...rest } = props;
	const inputRef = useRef<HTMLInputElement>(null);
	const classNames = cx(styles.input);

	const { level } = useA11y();
	const safetyMargin = useAccessibleTarget({
		element: inputRef,
		level: a11y?.level ?? level,
		clear: a11y?.clear,
	});

	const combinedStyle = {
		...safetyMargin,
		...style,
	};
    
	return (
		<input
			ref={mergeRefs(ref, inputRef)}
			style={combinedStyle}
			className={classNames}
			{...rest}
		/>
	);
};
