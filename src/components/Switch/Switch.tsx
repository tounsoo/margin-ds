import {
	type MouseEvent,
	useEffect,
	useState,
	useRef,
    useId,
} from "react";
import styles from "./Switch.module.scss";
import cx from "classnames";
import { useA11y } from "../../providers";
import { useAccessibleTarget } from "../../hooks";
import type { A11yProps, BaseComponentProps } from "../../types";
import{ Flexbox, type FlexboxProps } from "../Flexbox";
import { mergeRefs } from "../../functions";
import { Label } from "../Label";


export type SwitchProps = 
			BaseComponentProps<"button", "disabled">
	 & {
		defaultChecked?: boolean;
		checked?: boolean;
		onChange?: (e: boolean) => void;
        container?: FlexboxProps;
		a11y?: A11yProps;
	};

export const Switch = (props: SwitchProps) => {
	const {
		checked,
		defaultChecked,
		className,
		onClick,
		onChange,
        children,
		a11y,
        id,
        container = {},
		...rest
	} = props;
    const containerRef = useRef<HTMLDivElement>(null);
	const [checkState, setCheckState] = useState(
		checked ?? defaultChecked ?? false,
	);
    const {
		style: containerStyle,
		ref: containerRefProp,
		...containerRest
	} = container;

	const onClickHandler = (e: MouseEvent<HTMLButtonElement>) => {
		if (typeof checked === "undefined") {
			onChange?.(!checkState);
			setCheckState(!checkState);
		}
		onClick?.(e);
	};

	const { level } = useA11y();
	const safetyMargin = useAccessibleTarget({
		element: containerRef,
		level: a11y?.level ?? level,
		clear: a11y?.clear,
	});

    const uid = useId();
    const pid = id ?? uid;

	// biome-ignore lint/correctness/useExhaustiveDependencies: onChange should not rerender
	useEffect(() => {
		if (typeof checked === "undefined") return;
		onChange?.(checked);
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
		<button
			type="button"
			role="switch"
			aria-checked={checkState}
			onClick={onClickHandler}
			className={cx(styles.switch, className)}
            aria-labelledby={pid}
			{...rest}
		>
			<span className={styles.toggle} />
		</button>
        {children ? (
				<Label className={styles.label} id={pid}>
					{children}
				</Label>
			) : null}
        </Flexbox>
	);
};
