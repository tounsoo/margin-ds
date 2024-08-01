import { isValidElement, type ReactElement, type ReactNode } from "react";

export function getLabel(node: ReactNode | object): string {
	if (
		typeof node === "string" ||
		typeof node === "number" ||
		typeof node === "boolean"
	) {
		return node.toString();
	}
	if (!node) {
		return "";
	}
	if (Array.isArray(node)) {
		if (!node.length) return "";
		return node.map((entry) => getLabel(entry)).join("");
	}

	if (isValidElement(node)) {
		const { children } = (node as ReactElement<HTMLElement>).props;
		if (!children) return "";
		return getLabel(children);
	}
	return "";
}
