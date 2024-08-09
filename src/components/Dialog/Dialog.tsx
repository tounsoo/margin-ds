import {
	type KeyboardEvent,
	type MouseEvent,
	useCallback,
	useEffect,
	useRef,
} from "react";
import styles from "./Dialog.module.scss";
import cx from "classnames";
import { mergeRefs } from "../../functions";
import type { BaseComponentProps } from "../../types";

export type DialogProps = Omit<BaseComponentProps<"dialog">, "open" | "onClose"> & {
	open?: boolean;
	onClose?: (e?: MouseEvent<HTMLDialogElement> | globalThis.MouseEvent) => void;
};

const dialogCountDown = () => {
	const getCounter =
		Number(document.body.getAttribute("data-dialog-counter")) ?? 0;
	if (!getCounter) return;
	if (getCounter === 1) {
		document.body.removeAttribute("data-dialog-counter");
		document.body.style.overflow = "";
	} else {
		document.body.setAttribute("data-dialog-counter", `${+getCounter - 1}`);
	}
};

export const Dialog = (props: DialogProps) => {
	const { children, className, open, onClose, ref, ...rest } = props;
	const dialogRef = useRef<HTMLDialogElement>(null);

	const closeDialog = useCallback(() => {
		if (!onClose) return;
		onClose?.();
		dialogCountDown();
	}, [onClose]);

	const onKeyDownHandler = (e: KeyboardEvent<HTMLDialogElement>) => {
		if (!onClose && e.key === "Escape") {
			e.preventDefault();
		}
        onClose?.()
	};

    // biome-ignore lint/correctness/useExhaustiveDependencies: onClose should not rerender
    useEffect(() => {
        if (!dialogRef.current) return;
        const closeOnClickOutside = (e: globalThis.MouseEvent) => {
            if (e.composedPath()[0] === dialogRef.current) {
                onClose?.(e)
            }

        }
        document.body.addEventListener("click", closeOnClickOutside);

        return () => {
            document.body.removeEventListener("click", closeOnClickOutside);
        }
    }, [])

	useEffect(() => {
		if (!open) {
			dialogRef.current?.close();
			dialogCountDown();
			return;
		}

		document.body.style.overflow = "hidden";
		const getCounter =
			Number(document.body.getAttribute("data-dialog-counter")) ?? 0;
		document.body.setAttribute("data-dialog-counter", `${+getCounter + 1}`);
		dialogRef.current?.showModal();

		dialogRef.current?.addEventListener("close", () => closeDialog);
		return () => {
			dialogRef.current?.removeEventListener("close", () => closeDialog);
		};
	}, [open, closeDialog]);

	return (
		<dialog
			// onClick={onClickHandler}
			className={cx(styles.dialog, className)}
			ref={ mergeRefs(ref, dialogRef) }
			onKeyDown={onKeyDownHandler}
			{...rest}
		>
			{children}
		</dialog>
	);
};
