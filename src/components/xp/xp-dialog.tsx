import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export const xpButtonClass =
	"h-[23px] min-w-[75px] rounded-[3px] border border-[#003c74] bg-[linear-gradient(180deg,#fff_0%,#ecebe6_86%,#d6d0c5_100%)] px-3 text-[11px] font-normal text-black hover:shadow-[inset_-1px_1px_#fff0cf,inset_1px_2px_#fdd889,inset_-2px_2px_#fbc761,inset_2px_-2px_#e5a01a] focus-visible:shadow-[inset_-1px_1px_#cee7ff,inset_1px_2px_#98b8ea,inset_-2px_2px_#bcd4f6,inset_1px_-1px_#89ade4,inset_2px_-2px_#89ade4] focus-visible:ring-0";

interface XpDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	title: string;
	icon?: ReactNode;
	description?: ReactNode;
	children?: ReactNode;
	className?: string;
}

export function XpDialog({
	open,
	onOpenChange,
	title,
	icon,
	description,
	children,
	className,
}: XpDialogProps) {
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent
				showCloseButton={false}
				className={cn(
					"xp-window-frame gap-0 overflow-hidden rounded-t-lg rounded-b-none p-[3px] pt-0 ring-0 sm:max-w-md",
					className,
				)}
			>
				<div className="xp-titlebar -mx-[3px] flex h-[29px] items-center gap-1.5 rounded-t-lg px-2">
					{icon}
					<DialogTitle className="flex-1 font-display text-[13px] font-bold text-white">
						{title}
					</DialogTitle>
					<DialogClose
						aria-label="Close"
						className="xp-caption-btn"
						data-variant="close"
					>
						<svg viewBox="0 0 10 10" className="size-[10px]" aria-hidden="true">
							<path
								d="m1.5 1.5 7 7m0-7-7 7"
								stroke="currentColor"
								strokeWidth="1.8"
								strokeLinecap="round"
							/>
						</svg>
					</DialogClose>
				</div>
				<div className="bg-xp-chrome p-4 text-[12px] text-black">
					{description && (
						<DialogDescription className="text-[12px] text-black">
							{description}
						</DialogDescription>
					)}
					{children}
					<DialogFooter className="mt-4 -mx-4 -mb-4 rounded-none border-t-0 bg-transparent p-4 pt-0">
						<DialogClose render={<Button className={xpButtonClass} />}>
							OK
						</DialogClose>
					</DialogFooter>
				</div>
			</DialogContent>
		</Dialog>
	);
}
