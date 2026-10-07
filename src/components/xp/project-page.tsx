import { Link } from "@tanstack/react-router";
import {
	ChevronLeft,
	ChevronRight,
	Hammer,
	Images,
	Lightbulb,
	ScrollText,
} from "lucide-react";
import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
	getCategory,
	getProject,
	type Project,
	type ProjectRoute,
	projects,
} from "@/lib/projects";
import { MediaGallery } from "./media-gallery";
import { CategoryIcon } from "./xp-icons";

export const parchmentCard =
	"rounded-[3px] bg-[#f8efd6]/75 shadow-[2px_3px_0_rgb(110_80_30/0.12)] ring-[#c6b083]";

const statusLabel: Record<Project["status"], string> = {
	personnal: "Personnal Project",
	school: "School project",
	"in-progress": "Work in progress",
};

export function ProjectPage({ to }: { to: ProjectRoute }) {
	const project = getProject(to) as Project;
	const category = getCategory(project.category);
	const index = projects.indexOf(project);
	const previous = projects[(index - 1 + projects.length) % projects.length];
	const next = projects[(index + 1) % projects.length];

	return (
		<article className="mx-auto max-w-3xl px-5 py-6 sm:px-8">
			<Breadcrumb>
				<BreadcrumbList className="text-[12px] text-[#7a6440]">
					<BreadcrumbItem>
						<BreadcrumbLink render={<Link to="/projects" />}>
							My Projects
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbLink
							render={
								<Link to="/projects" search={{ category: category.id }} />
							}
						>
							{category.label}
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage className="text-[#3a2a16]">
							{project.title}
						</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>

			<header className="mt-5 flex items-start gap-4">
				<span className="flex size-14 shrink-0 items-center justify-center rounded-[4px] border border-[#c6b083] bg-[#fbf4df] shadow-[inset_0_0_8px_rgb(140_100_40/0.2)]">
					<CategoryIcon category={project.category} className="size-8" />
				</span>
				<div className="min-w-0">
					<h1 className="font-display text-3xl font-bold text-[#2a3f73] [text-shadow:1px_1px_0_rgb(255_255_255/0.6)]">
						{project.title}
					</h1>
					<p className="mt-1 font-serif text-[15px] text-[#6f5a3a] italic">
						{project.tagline}
					</p>
					<div className="mt-2 flex flex-wrap gap-1.5">
						<Badge
							variant={
								project.status === "in-progress" ? "destructive" : "secondary"
							}
							className="rounded-[3px]"
						>
							{statusLabel[project.status]}
						</Badge>
						{project.year && (
							<Badge variant="outline" className="rounded-[3px] bg-white/40">
								{project.year}
							</Badge>
						)}
						{project.context && (
							<Badge variant="outline" className="rounded-[3px] bg-white/40">
								{project.context}
							</Badge>
						)}
					</div>
				</div>
			</header>

			<Separator className="my-5 bg-[#c6b083]" />

			<div className="flex flex-col gap-4 font-serif text-[15px] leading-relaxed">
				<Section icon={<ScrollText />} title="Description">
					{project.summary.map((paragraph) => (
						<p key={paragraph}>{paragraph}</p>
					))}
				</Section>

				{project.media && project.media.length > 0 && (
					<Section icon={<Images />} title="Screenshots & videos">
						<MediaGallery media={project.media} />
					</Section>
				)}

				{project.learned && (
					<Section icon={<Lightbulb />} title="Things I learned">
						<ul className="list-disc space-y-1 pl-5 marker:text-[#b07a2a]">
							{project.learned.map((lesson) => (
								<li key={lesson}>{lesson}</li>
							))}
						</ul>
					</Section>
				)}

				{project.tech.length > 0 && (
					<Section icon={<Hammer />} title="Programs & tools">
						<div className="flex flex-wrap gap-1.5">
							{project.tech.map((tech) => (
								<Badge
									key={tech}
									variant="outline"
									className="rounded-[3px] border-[#b8a273] bg-[#fffaf0]/70 font-sans text-[11px]"
								>
									{tech}
								</Badge>
							))}
						</div>
					</Section>
				)}
			</div>

			<nav className="mt-8 flex items-center justify-between gap-2 border-t border-[#c6b083] pt-4">
				<Button
					variant="ghost"
					className="xp-toolbar-btn max-w-[48%]"
					nativeButton={false}
					render={<Link to={previous.to} />}
				>
					<ChevronLeft />
					<span className="truncate">{previous.title}</span>
				</Button>
				<Button
					variant="ghost"
					className="xp-toolbar-btn max-w-[48%]"
					nativeButton={false}
					render={<Link to={next.to} />}
				>
					<span className="truncate">{next.title}</span>
					<ChevronRight />
				</Button>
			</nav>
		</article>
	);
}

export function Section({
	icon,
	title,
	children,
}: {
	icon: ReactNode;
	title: string;
	children: ReactNode;
}) {
	return (
		<Card className={parchmentCard}>
			<CardHeader>
				<CardTitle className="flex items-center gap-2 font-display text-[16px] font-bold text-[#2a3f73] [&_svg]:size-4 [&_svg]:text-[#9a6a1f]">
					{icon}
					{title}
				</CardTitle>
				<CardDescription className="sr-only">{title}</CardDescription>
			</CardHeader>
			<CardContent className="space-y-3 text-[#3a2a16]">{children}</CardContent>
		</Card>
	);
}
