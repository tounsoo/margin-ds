import cx from "classnames";
import styles from "./Code.module.scss";
import type { BaseComponentProps } from "../../types";

export type CodeProps = BaseComponentProps<"code">;
export const Code = (props: CodeProps) => {
	const { className, ...rest } = props;
	return <code className={cx(styles.code, className)} {...rest} />;
};
