import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogTitle,
} from "@/components/ui/dialog";
import type { ProjectMedia } from "@/lib/projects";
import { cn } from "@/lib/utils";

export function MediaGallery({ media }: { media: ProjectMedia[] }) {
	const [index, setIndex] = useState<number | null>(null);
	const current = index === null ? null : media[index];

	function step(delta: number) {
		setIndex((value) =>
			value === null ? value : (value + delta + media.length) % media.length,
		);
	}

	return (
		<>
			<div className={cn("grid gap-3", media.length > 1 && "sm:grid-cols-2")}>
				{media.map((item, itemIndex) => (
					<figure key={item.src} className="flex flex-col gap-1">
						<button
							type="button"
							onClick={() => setIndex(itemIndex)}
							className="group relative aspect-video overflow-hidden rounded-[2px] border border-[#c6b083] bg-[#2b2414] shadow-[2px_3px_0_rgb(110_80_30/0.15)] outline-none focus-visible:ring-2 focus-visible:ring-[#316ac5]"
						>
							<MediaThumbnail item={item} />
							{item.type === "video" && (
								<span className="absolute inset-0 flex items-center justify-center">
									<span className="xp-nav-orb size-11 transition group-hover:scale-110">
										<Play className="size-5 translate-x-px fill-white" />
									</span>
								</span>
							)}
							<span className="sr-only">Open {item.alt}</span>
						</button>
						{item.caption && (
							<figcaption className="text-center font-serif text-[13px] text-[#6f5a3a] italic">
								{item.caption}
							</figcaption>
						)}
					</figure>
				))}
			</div>

			<Dialog
				open={current !== null}
				onOpenChange={(open) => !open && setIndex(null)}
			>
				{current && index !== null && (
					<DialogContent
						showCloseButton={false}
						onKeyDown={(event) => {
							if (event.key === "ArrowLeft") step(-1);
							if (event.key === "ArrowRight") step(1);
						}}
						className="xp-window-frame w-[min(980px,96vw)] max-w-none gap-0 overflow-hidden rounded-t-lg rounded-b-none p-[3px] pt-0 ring-0 sm:max-w-none"
					>
						<div className="xp-titlebar -mx-[3px] flex h-[29px] items-center gap-1.5 rounded-t-lg px-2">
							<DialogTitle className="min-w-0 flex-1 truncate font-display text-[13px] font-bold text-white">
								{current.alt} - Windows Picture and Fax Viewer
							</DialogTitle>
							<DialogClose
								aria-label="Close"
								className="xp-caption-btn"
								data-variant="close"
							>
								<svg
									viewBox="0 0 10 10"
									className="size-[10px]"
									aria-hidden="true"
								>
									<path
										d="m1.5 1.5 7 7m0-7-7 7"
										stroke="currentColor"
										strokeWidth="1.8"
										strokeLinecap="round"
									/>
								</svg>
							</DialogClose>
						</div>

						<div className="flex h-[min(70vh,620px)] items-center justify-center bg-white p-2">
							{current.type === "image" ? (
								<img
									key={current.src}
									src={current.src}
									alt={current.alt}
									className="max-h-full max-w-full object-contain"
								/>
							) : (
								// biome-ignore lint/a11y/useMediaCaption: project demos are silent screen recordings without caption files
								<video
									key={current.src}
									src={current.src}
									poster={current.poster}
									aria-label={current.alt}
									controls
									autoPlay
									playsInline
									className="max-h-full max-w-full"
								/>
							)}
						</div>

						<div className="flex items-center gap-2 border-t border-[#c8bc98] bg-xp-chrome px-3 py-1.5 text-[12px] text-black">
							<DialogDescription className="min-w-0 flex-1 truncate text-[12px] text-black">
								{current.caption ?? current.alt}
							</DialogDescription>
							{media.length > 1 && (
								<>
									<Button
										variant="ghost"
										aria-label="Previous"
										className="xp-toolbar-btn"
										onClick={() => step(-1)}
									>
										<span className="xp-nav-orb">
											<ChevronLeft className="size-4" strokeWidth={3} />
										</span>
									</Button>
									<span className="tabular-nums">
										{index + 1} of {media.length}
									</span>
									<Button
										variant="ghost"
										aria-label="Next"
										className="xp-toolbar-btn"
										onClick={() => step(1)}
									>
										<span className="xp-nav-orb">
											<ChevronRight className="size-4" strokeWidth={3} />
										</span>
									</Button>
								</>
							)}
						</div>
					</DialogContent>
				)}
			</Dialog>
		</>
	);
}

function MediaThumbnail({ item }: { item: ProjectMedia }) {
	const className =
		"size-full object-cover transition duration-300 group-hover:scale-[1.03]";

	if (item.type === "image") {
		return <img src={item.src} alt="" loading="lazy" className={className} />;
	}
	if (item.poster) {
		return (
			<img src={item.poster} alt="" loading="lazy" className={className} />
		);
	}
	return (
		<video
			src={`${item.src}#t=0.1`}
			preload="metadata"
			muted
			playsInline
			className={cn(className, "pointer-events-none")}
		/>
	);
}
