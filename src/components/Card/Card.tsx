import type { ComponentPropsWithoutRef, CSSProperties } from "react";
import styles from "./Card.module.scss";
import cx from "classnames";

export type CardProps = ComponentPropsWithoutRef<'div'>;

export const Card = (props: CardProps) => {
	const classNames = cx(styles.card);
	
	return <div className={classNames} {...props} />;
};


export type CardSectionProps = ComponentPropsWithoutRef<'div'> & {
	direction?: CSSProperties["flexDirection"];
	wrap?: CSSProperties["flexWrap"];
	justifyContent?: CSSProperties["justifyContent"];
	alignItems?: CSSProperties["alignItems"];
	gap?: CSSProperties["gap"];
    fill?: boolean;
};

Card.Section = (props: CardSectionProps) => {
	const { fill, direction, wrap, justifyContent, alignItems, gap, style, ...rest } = props;
	const classNames = cx(styles.section, {
        [styles.fill]: fill
    });
	const combinedStyle = {
		flexDirection: direction,
		justifyContent: justifyContent,
		alignItems: alignItems,
		flexWrap: wrap,
        gap,
		...style,
	};

	return <div className={classNames} style={combinedStyle} {...rest} />;
};