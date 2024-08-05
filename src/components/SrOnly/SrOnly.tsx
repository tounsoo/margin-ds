import type { BaseComponentProps } from "../../types";
import styles from "./SrOnly.module.scss";

export const SrOnly = (props: BaseComponentProps<"span">) => {
	const { className, ...rest } = props;
	return <span className={styles["sr-only"]} {...rest} />;
};
