import type { ComponentPropsWithoutRef } from "react"
import cx from 'classnames'
import styles from './Paragraph.module.scss'

export type ParagraphProps = ComponentPropsWithoutRef<'p'> & {
    size?: 'x-small' | 'small' | 'medium' | 'large' | 'x-large' | 'xx-large';

};
export const Paragraph = (props: ParagraphProps) => {
    const { className, size="medium", ...rest } = props;
    const classNames = cx(styles.paragraph, className, styles[size]);
    return <p className={classNames} {...rest} />
}