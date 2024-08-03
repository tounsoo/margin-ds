import type { ComponentPropsWithRef } from "react";
import cx from "classnames";
import styles from "./Code.module.scss";

export type CodeProps = ComponentPropsWithRef<"code">;
export const Code = (props: CodeProps) => {
	const { className, ...rest } = props;
	return <code className={cx(styles.code, className)} {...rest} />;
};
