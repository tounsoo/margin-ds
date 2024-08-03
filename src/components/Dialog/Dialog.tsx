import {
	type ComponentPropsWithRef,
	type KeyboardEvent,
	type MouseEvent,
	useCallback,
	useEffect,
	useRef,
} from "react";
import styles from "./Dialog.module.scss";
import cx from "classnames";
import { mergeRefs } from "../../functions";

export type DialogProps = Omit<ComponentPropsWithRef<"dialog">, "open"> & {
	open?: boolean;
	onClose?: () => void;
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
	const { children, className, open, onClose, onClick, ref, ...rest } = props;
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
	};

	const onClickHandler = (e: MouseEvent<HTMLDialogElement>) => {
		const xPos = e.pageX;
		const yPos = e.pageY;
		const box = (e.target as HTMLElement).getBoundingClientRect();
		const isOutside =
			xPos > box.right ||
			xPos < box.x ||
			yPos > box.bottom ||
			yPos < box.y;
		if (isOutside) {
			closeDialog();
		}
		onClick?.(e);
	};

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

		dialogRef.current?.addEventListener("close", closeDialog);
		return () => {
			dialogRef.current?.removeEventListener("close", closeDialog);
		};
	}, [open, closeDialog]);

	return (
		<dialog
			onClick={onClickHandler}
			className={cx(styles.dialog, className)}
			ref={ mergeRefs(ref, dialogRef) }
			onKeyDown={onKeyDownHandler}
			{...rest}
		>
			{children}
		</dialog>
	);
};
