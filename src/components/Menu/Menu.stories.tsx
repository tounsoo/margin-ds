import type { Meta, StoryObj } from "@storybook/react";
import { Menu } from "./Menu";
import { useRef } from "react";
import { useMenu } from "./useMenu";
import { Button } from "../Button";
import { Kbd } from "../Kbd";

const meta = {
	title: "Component/Menu",
	component: Menu,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof Menu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: function Render() {
		const menuRef = useRef<HTMLUListElement>(null);
		const { getAnchorProps, getMenuProps } = useMenu({menuRef});

		return (
			<>
				<Button {...getAnchorProps()}>Actions</Button>
				<Menu
					{...getMenuProps({
						"aria-label": "number list",
						ref: menuRef,
					})}
				>
					<Menu.Item id="01" value="new text file" onClick={console.log}>
						New Text File <Kbd>⌘ N</Kbd>
					</Menu.Item>
					<Menu.Item id="02" value="new file" onClick={console.log}>
						New File... <Kbd>⌃ ⌥ ⌘ N</Kbd>
					</Menu.Item>
					<Menu.Item id="03" value="new window" onClick={console.log}>
						New Window <Kbd>⇧ ⌘ N</Kbd>
					</Menu.Item>
				</Menu>
			</>
		);
	},
};
