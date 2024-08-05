import styles from "./Card.module.scss";
import cx from "classnames";
import type { BaseComponentProps } from "../../types";

export type CardProps = BaseComponentProps<'div'>;

export const Card = (props: CardProps) => {
	const { className, ...rest } = props;
	const classNames = cx(styles.card, className);

	return <div className={classNames} {...rest} />;
};
