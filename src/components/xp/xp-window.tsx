import { type PointerEvent, type ReactNode, useRef, useState } from "react";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

interface XpWindowProps {
	title: string;
	icon: ReactNode;
	minimized: boolean;
	maximized: boolean;
	onMinimize: () => void;
	onToggleMaximize: () => void;
	onClose: () => void;
	children: ReactNode;
	className?: string;
}

const WINDOWED_TOP_VH = 3;

export function XpWindow({
	title,
	icon,
	minimized,
	maximized,
	onMinimize,
	onToggleMaximize,
	onClose,
	children,
	className,
}: XpWindowProps) {
	const isMobile = useIsMobile();
	const isMaximized = maximized || isMobile;
	const [offset, setOffset] = useState({ x: 0, y: 0 });
	const drag = useRef<{ x: number; y: number; ox: number; oy: number } | null>(
		null,
	);

	function onPointerDown(event: PointerEvent<HTMLDivElement>) {
		if (isMaximized || event.button !== 0) return;
		if ((event.target as HTMLElement).closest("button")) return;
		drag.current = {
			x: event.clientX,
			y: event.clientY,
			ox: offset.x,
			oy: offset.y,
		};
		event.currentTarget.setPointerCapture(event.pointerId);
	}

	function onPointerMove(event: PointerEvent<HTMLDivElement>) {
		if (!drag.current) return;
		const minY = -(window.innerHeight * WINDOWED_TOP_VH) / 100;
		const maxY = window.innerHeight - 90;
		setOffset({
			x: drag.current.ox + event.clientX - drag.current.x,
			y: Math.min(
				maxY,
				Math.max(minY, drag.current.oy + event.clientY - drag.current.y),
			),
		});
	}

	function onPointerUp() {
		drag.current = null;
	}

	return (
		<section
			aria-label={title}
			inert={minimized}
			className={cn(
				"xp-window-frame absolute z-10 flex flex-col p-[3px] pt-0 transition-[opacity,scale,translate] duration-200 ease-out",
				isMaximized
					? "inset-x-0 top-0 bottom-[30px] rounded-none"
					: "rounded-t-lg",
				minimized &&
					"pointer-events-none translate-y-[45vh] scale-[0.15] opacity-0",
				className,
			)}
			style={
				isMaximized
					? { transformOrigin: "10% 100%" }
					: {
							transformOrigin: "10% 100%",
							left: `calc(50% - min(600px, 48vw) + ${offset.x}px)`,
							top: `calc(${WINDOWED_TOP_VH}vh + ${offset.y}px)`,
							width: "min(1200px, 96vw)",
							height: `calc(100dvh - 30px - ${WINDOWED_TOP_VH * 2}vh)`,
						}
			}
		>
			{/* biome-ignore lint/a11y/noStaticElementInteractions: dragging is a pointer-only enhancement; the caption buttons stay keyboard accessible */}
			<div
				className={cn(
					"xp-titlebar flex h-[29px] shrink-0 touch-none items-center gap-1.5 pr-[2px] pl-1.5 select-none",
					isMaximized ? "rounded-none" : "-mx-[3px] rounded-t-lg px-[7px]",
				)}
				onPointerDown={onPointerDown}
				onPointerMove={onPointerMove}
				onPointerUp={onPointerUp}
				onPointerCancel={onPointerUp}
				onDoubleClick={() => !isMobile && onToggleMaximize()}
			>
				<span className="flex size-4 shrink-0 items-center justify-center">
					{icon}
				</span>
				<h2 className="min-w-0 flex-1 truncate font-display text-[13px] font-bold tracking-wide text-white">
					{title}
				</h2>
				<div className="flex items-center gap-[2px]">
					<CaptionButton label="Minimize" onClick={onMinimize}>
						<svg viewBox="0 0 10 10" className="size-[9px]" aria-hidden="true">
							<rect x="1" y="7" width="6" height="2.4" fill="currentColor" />
						</svg>
					</CaptionButton>
					{!isMobile && (
						<CaptionButton
							label={isMaximized ? "Restore Down" : "Maximize"}
							onClick={onToggleMaximize}
						>
							{isMaximized ? (
								<svg
									viewBox="0 0 10 10"
									className="size-[10px]"
									aria-hidden="true"
								>
									<path
										d="M3 .8h6.2V7M.8 3h6v6.2h-6z"
										fill="none"
										stroke="currentColor"
										strokeWidth="1.4"
									/>
									<path
										d="M3 .8h6.2v1.6H3zM.8 3h6v1.6h-6z"
										fill="currentColor"
									/>
								</svg>
							) : (
								<svg
									viewBox="0 0 10 10"
									className="size-[10px]"
									aria-hidden="true"
								>
									<rect
										x=".8"
										y=".8"
										width="8.4"
										height="8.4"
										fill="none"
										stroke="currentColor"
										strokeWidth="1.4"
									/>
									<rect
										x=".8"
										y=".8"
										width="8.4"
										height="2"
										fill="currentColor"
									/>
								</svg>
							)}
						</CaptionButton>
					)}
					<CaptionButton label="Close" variant="close" onClick={onClose}>
						<svg viewBox="0 0 10 10" className="size-[10px]" aria-hidden="true">
							<path
								d="m1.5 1.5 7 7m0-7-7 7"
								stroke="currentColor"
								strokeWidth="1.8"
								strokeLinecap="round"
							/>
						</svg>
					</CaptionButton>
				</div>
			</div>
			<div className="flex min-h-0 flex-1 flex-col overflow-hidden bg-xp-chrome">
				{children}
			</div>
		</section>
	);
}

function CaptionButton({
	label,
	variant,
	onClick,
	children,
}: {
	label: string;
	variant?: "close";
	onClick: () => void;
	children: ReactNode;
}) {
	return (
		<Tooltip>
			<TooltipTrigger
				render={
					<button
						type="button"
						aria-label={label}
						data-variant={variant}
						className="xp-caption-btn"
						onClick={onClick}
					/>
				}
			>
				{children}
			</TooltipTrigger>
			<TooltipContent side="bottom">{label}</TooltipContent>
		</Tooltip>
	);
}
