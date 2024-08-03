import type { CSSProperties, ComponentPropsWithRef } from "react";
import styles from "./Flexbox.module.scss";
import cx from "classnames";

export type FlexboxProps = ComponentPropsWithRef<"div"> & {
	flex?: CSSProperties["flex"];
	flexBasis?: CSSProperties["flexBasis"];
	flexDirection?: CSSProperties["flexDirection"];
	flexFlow?: CSSProperties["flexFlow"];
	flexGrow?: CSSProperties["flexGrow"];
	flexShrink?: CSSProperties["flexShrink"];
	flexWrap?: CSSProperties["flexWrap"];
	justifyContent?: CSSProperties["justifyContent"];
	justifyItems?: CSSProperties["justifyItems"];
	justifySelf?: CSSProperties["justifySelf"];
	alignContent?: CSSProperties["alignContent"];
	alignItems?: CSSProperties["alignItems"];
	alignSelf?: CSSProperties["alignSelf"];
	placeContent?: CSSProperties["placeContent"];
	placeItems?: CSSProperties["placeItems"];
	placeSelf?: CSSProperties["placeSelf"];
	gap?: CSSProperties["gap"];
	inline?: boolean;
};

export const Flexbox = (props: FlexboxProps) => {
	const {
		className,
		flex,
		flexBasis,
		flexDirection,
		flexFlow,
		flexGrow,
		flexShrink,
		flexWrap,
		justifyContent,
		justifyItems,
		justifySelf,
		alignContent,
		alignItems,
		alignSelf,
		placeContent,
		placeItems,
		placeSelf,
		gap,
		inline,
		style,
		...rest
	} = props;
	const classNames = cx(styles.flexbox, className, {
		[styles.inline]: inline,
	});
	const combinedStyle = {
		//shorthands
		flex,
		flexFlow,
		placeContent,
		placeItems,
		placeSelf,

		flexBasis,
		flexDirection,
		flexGrow,
		flexShrink,
		flexWrap,
		justifyContent,
		justifyItems,
		justifySelf,
		alignContent,
		alignItems,
		alignSelf,
		gap,
		...style,
	};

	return <div className={classNames} style={combinedStyle} {...rest} />;
};
