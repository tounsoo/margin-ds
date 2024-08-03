import type { ComponentPropsWithRef } from "react";
import styles from "./Card.module.scss";
import cx from "classnames";

export type CardProps = ComponentPropsWithRef<"div">;

export const Card = (props: CardProps) => {
	const { className, ...rest } = props;
	const classNames = cx(styles.card, className);

	return <div className={classNames} {...rest} />;
};
