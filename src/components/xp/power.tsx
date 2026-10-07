import { Moon, Power, RotateCcw } from "lucide-react";
import type { ReactNode } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogTitle,
} from "@/components/ui/dialog";
import { useDesktop } from "./desktop-context";
import { xpButtonClass } from "./xp-dialog";
import { WindowsFlag } from "./xp-icons";

export function TurnOffDialog({
	open,
	onOpenChange,
}: {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}) {
	const { setPower } = useDesktop();

	function turnOff() {
		onOpenChange(false);
		setPower("off");
	}

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent
				showCloseButton={false}
				className="gap-0 overflow-hidden rounded-md bg-[#5a7edc] p-0 text-white ring-1 ring-[#0b2e8f] sm:max-w-[330px]"
			>
				<div className="flex items-center justify-between bg-[#0a2a8c] px-4 py-3">
					<DialogTitle className="font-display text-[17px] text-white">
						Turn off computer
					</DialogTitle>
					<WindowsFlag className="size-7" />
				</div>
				<DialogDescription className="sr-only">
					Choose how to turn off the computer.
				</DialogDescription>
				<div className="flex justify-around bg-[linear-gradient(180deg,#5a7edc,#7d9be6)] px-4 py-6">
					<PowerChoice
						label="Stand By"
						color="bg-[linear-gradient(180deg,#f8c64c,#d98b07)]"
						onClick={turnOff}
					>
						<Moon />
					</PowerChoice>
					<PowerChoice
						label="Turn Off"
						color="bg-[linear-gradient(180deg,#f07b5b,#c4290e)]"
						onClick={turnOff}
					>
						<Power />
					</PowerChoice>
					<PowerChoice
						label="Restart"
						color="bg-[linear-gradient(180deg,#7bd36f,#2f8a2c)]"
						onClick={() => window.location.reload()}
					>
						<RotateCcw />
					</PowerChoice>
				</div>
				<div className="flex justify-end bg-[#0a2a8c] px-4 py-2">
					<DialogClose render={<Button className={xpButtonClass} />}>
						Cancel
					</DialogClose>
				</div>
			</DialogContent>
		</Dialog>
	);
}

function PowerChoice({
	label,
	color,
	onClick,
	children,
}: {
	label: string;
	color: string;
	onClick: () => void;
	children: ReactNode;
}) {
	return (
		<button
			type="button"
			onClick={onClick}
			className="group flex flex-col items-center gap-1.5 text-[12px] text-white outline-none"
		>
			<span
				className={`${color} flex size-9 items-center justify-center rounded-[5px] border border-white/70 shadow-md transition group-hover:brightness-115 group-focus-visible:ring-2 group-focus-visible:ring-white [&_svg]:size-5 [&_svg]:stroke-3`}
			>
				{children}
			</span>
			{label}
		</button>
	);
}

export function PowerOverlay() {
	const { power, setPower } = useDesktop();

	if (power === "on") return null;

	if (power === "off") {
		return (
			<button
				type="button"
				onClick={() => setPower("welcome")}
				className="fixed inset-0 z-[100] flex animate-in flex-col items-center justify-center gap-6 bg-black font-display text-[#f39c32] duration-1000 fade-in"
			>
				<p className="text-2xl">It is now safe to turn off your computer.</p>
				<p className="text-sm text-white/40">(click anywhere to power on)</p>
			</button>
		);
	}

	return (
		<div className="fixed inset-0 z-[100] flex animate-in flex-col bg-[#5a7edc] duration-500 fade-in">
			<div className="h-[12vh] bg-[#00309c]" />
			<div className="h-[2px] bg-[linear-gradient(90deg,#5a7edc,#c3d4f9_30%,#5a7edc)]" />
			<div className="flex flex-1 flex-col items-center justify-center gap-8 px-6 md:flex-row md:gap-0">
				<div className="flex flex-col items-center gap-3 text-white md:w-1/2 md:items-end md:pr-10">
					<WindowsFlag className="size-20" />
					<p className="font-display text-3xl font-bold italic">
						Windows<sup className="text-sm">XP</sup>
					</p>
					<p className="text-[15px]">To begin, click your user name</p>
				</div>
				<div className="hidden h-[45vh] w-px bg-[linear-gradient(180deg,transparent,#c3d4f9,transparent)] md:block" />
				<div className="md:w-1/2 md:pl-10">
					<button
						type="button"
						onClick={() => setPower("on")}
						className="flex items-center gap-4 rounded-lg p-2 pr-8 text-left text-white transition hover:bg-[linear-gradient(90deg,#00309c,transparent)]"
					>
						<Avatar className="size-16 rounded-[5px] border-2 border-white/80 after:rounded-[5px]">
							<AvatarFallback className="rounded-[5px] bg-[linear-gradient(135deg,#f7d36a,#e0761c)] font-display text-2xl font-bold text-white">
								L
							</AvatarFallback>
						</Avatar>
						<span className="font-display text-xl">Louis</span>
					</button>
				</div>
			</div>
			<div className="h-[2px] bg-[linear-gradient(90deg,#5a7edc,#f99736_30%,#5a7edc)]" />
			<div className="flex h-[12vh] items-center bg-[#00309c] px-8 text-[13px] text-white">
				<button
					type="button"
					onClick={() => setPower("off")}
					className="flex items-center gap-2 hover:underline"
				>
					<span className="flex size-7 items-center justify-center rounded-[4px] bg-[linear-gradient(180deg,#f07b5b,#c4290e)]">
						<Power className="size-4" strokeWidth={3} />
					</span>
					Turn off computer
				</button>
			</div>
		</div>
	);
}
