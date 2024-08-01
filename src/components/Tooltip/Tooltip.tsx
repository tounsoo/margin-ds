import { ComponentProps } from "react";
import styles from "./Tooltip.module.scss";
export type TooltipProps = {
	id: string;
};
export const Tooltip = (props: TooltipProps) => {
	return (
		<>
			<button
				type="button"
				popoverTarget="test"
				className={styles.tooltip}
				style={{ anchorName: "--test" }}
			>
				Hello
			</button>
			<span
				id="test"
				popover="auto"
				style={{
					margin: 0,
					positionAnchor: "--test",
					insetArea: "bottom",
					position: "absolute",
				}}
			>
				Content
			</span>
		</>
	);
};
