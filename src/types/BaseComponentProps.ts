import type { ComponentPropsWithRef, ElementType } from "react";

type StartsWithOn<T extends string> = T extends `on${infer _}` ? T : never;

type KeysAsStrings<T> = Extract<keyof T, string>;

export type BaseComponentProps<
	T extends ElementType,
	P extends keyof ComponentPropsWithRef<T> =
		| "id"
		| "children"
		| "style"
		| "className"
		| "ref",
> = Pick<
	ComponentPropsWithRef<T>,
	P | StartsWithOn<KeysAsStrings<ComponentPropsWithRef<T>>>
> & {
	[X: `aria-${string}`]: string;
	[Y: `data-${string}`]: string;
	id?: ComponentPropsWithRef<T>["id"];
	children?: ComponentPropsWithRef<T>["children"];
	style?: ComponentPropsWithRef<T>["style"];
	className?: ComponentPropsWithRef<T>["className"];
	ref?: ComponentPropsWithRef<T>["ref"];
};
