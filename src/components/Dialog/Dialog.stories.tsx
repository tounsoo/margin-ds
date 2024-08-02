import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../Button";
import { Dialog } from "./Dialog";
import { useState } from "react";
import { Heading } from "../Heading";
import { Flexbox } from "../Flexbox";

const meta = {
	title: "Example/Dialog",
	component: Dialog,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: function Render() {
		const [open, setOpen] = useState(false);
		return (
			<div>
				<Button onClick={() => setOpen(true)}>Open Dialog</Button>
				<Dialog open={open} onClose={() => setOpen(false)}>
					<Flexbox
						flexDirection="column"
						gap="1rem"
						style={{ width: "clamp(200px, 400px, 90svw)" }}
					>
						<Flexbox justifyContent="space-between">
							<Heading as="h3">Dialog Title</Heading>
							<Button
								onClick={() => setOpen(false)}
								appearance="ghost"
								aria-label="Close dialog"
							>
								&times;
							</Button>
						</Flexbox>
						Officia incididunt fugiat cillum esse minim mollit enim
						sunt laboris nostrud ipsum esse eu. Ut ea in deserunt
						culpa sunt anim tempor elit nisi exercitation. Commodo
						proident aliquip duis reprehenderit esse sunt eu
						reprehenderit culpa esse sint laborum commodo id.
						Ullamco duis dolor ullamco irure laborum tempor non
						enim. Nisi duis labore in nulla et anim est.
						<Button onClick={() => setOpen(false)}>
							Close Dialog
						</Button>
					</Flexbox>
				</Dialog>
			</div>
		);
	},
};

export const ContentChanging: Story = {
	render: function Render() {
		const [open, setOpen] = useState(false);
		const [expand, setExpand] = useState(false);
		return (
			<div>
				<Button onClick={() => setOpen(true)}>Open Dialog</Button>
				<Dialog open={open} onClose={() => setOpen(false)}>
					<Flexbox
						flexDirection="column"
						gap="1rem"
						style={{ width: "clamp(200px, 400px, 90svw)" }}
					>
						<Flexbox justifyContent="space-between">
							<Heading as="h3">Dialog Title</Heading>
							<Button
								onClick={() => setOpen(false)}
								appearance="ghost"
								aria-label="Close dialog"
							>
								&times;
							</Button>
						</Flexbox>
						Officia incididunt fugiat cillum esse minim mollit enim
						sunt laboris nostrud ipsum esse eu. Ut ea in deserunt
						culpa sunt anim tempor elit nisi exercitation.
						{expand
							? `Commodo
						proident aliquip duis reprehenderit esse sunt eu
						reprehenderit culpa esse sint laborum commodo id.
						Ullamco duis dolor ullamco irure laborum tempor non
						enim. Nisi duis labore in nulla et anim est.Officia incididunt fugiat cillum esse minim mollit enim
						sunt laboris nostrud ipsum esse eu. Ut ea in deserunt
						culpa sunt anim tempor elit nisi exercitation. Commodo
						proident aliquip duis reprehenderit esse sunt eu
						reprehenderit culpa esse sint laborum commodo id.
						Ullamco duis dolor ullamco irure laborum tempor non
						enim. Nisi duis labore in nulla et anim est.`
							: null}
						<Button onClick={() => setExpand(!expand)}>
							Expand Toggle
						</Button>
						<Button onClick={() => setOpen(false)}>
							Close Dialog
						</Button>
					</Flexbox>
				</Dialog>
			</div>
		);
	},
};
