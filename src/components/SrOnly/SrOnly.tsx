import type { ComponentPropsWithRef } from "react";
import styles from "./SrOnly.module.scss";

export const SrOnly = (props: ComponentPropsWithRef<"span">) => {
	const { className, ...rest } = props;
	return <span className={styles["sr-only"]} {...rest} />;
};
