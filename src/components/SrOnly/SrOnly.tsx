import type { ComponentPropsWithoutRef } from "react";
import styles from "./SrOnly.module.scss";

export const SrOnly = (props: ComponentPropsWithoutRef<'span'>) => {
    const { className, ...rest } = props;
    return <span className={styles['sr-only']} {...rest} />
}