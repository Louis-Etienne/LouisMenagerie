import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight, SearchX, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "@/components/ui/empty";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { Separator } from "@/components/ui/separator";
import { parchmentCard } from "@/components/xp/project-page";
import { CategoryIcon } from "@/components/xp/xp-icons";
import {
	type CategoryId,
	categories,
	getCategory,
	searchProjects,
} from "@/lib/projects";

interface ProjectsSearch {
	q?: string;
	category?: CategoryId;
}

export const Route = createFileRoute("/projects/")({
	validateSearch: (search: Record<string, unknown>): ProjectsSearch => ({
		q: typeof search.q === "string" && search.q.trim() ? search.q : undefined,
		category: categories.some((category) => category.id === search.category)
			? (search.category as CategoryId)
			: undefined,
	}),
	component: ProjectsHome,
});

function ProjectsHome() {
	const { q, category } = Route.useSearch();
	const results = searchProjects(q ?? "").filter(
		(project) => !category || project.category === category,
	);
	const visibleCategories = categories.filter((entry) =>
		results.some((project) => project.category === entry.id),
	);
	const filtered = Boolean(q || category);

	return (
		<div className="mx-auto max-w-4xl px-5 py-6 sm:px-8">
			<header className="flex flex-wrap items-end justify-between gap-3">
				<div>
					<h1 className="font-display text-3xl font-bold text-[#2a3f73] [text-shadow:1px_1px_0_rgb(255_255_255/0.6)]">
						{q
							? "Search results"
							: category
								? `My ${getCategory(category).label}`
								: "Welcome to Louis' Menagerie"}
					</h1>
					<p className="mt-1 font-serif text-[15px] text-[#6f5a3a] italic">
						{q
							? `${results.length} project${results.length === 1 ? "" : "s"} matching “${q}”`
							: category
								? getCategory(category).description
								: "A dusty collection of games, software and other weird projects."}
					</p>
				</div>
				{filtered && (
					<Button
						variant="ghost"
						className="xp-toolbar-btn"
						nativeButton={false}
						render={<Link to="/projects" />}
					>
						<X /> Clear filters
					</Button>
				)}
			</header>

			{!filtered && (
				<p className="mt-3 flex flex-wrap items-center gap-1.5 text-[12px] text-[#6f5a3a]">
					Tip: pick a project in the explorer bar, search from the address bar,
					or toggle the bar with
					<KbdGroup>
						<Kbd>Ctrl</Kbd>
						<Kbd>B</Kbd>
					</KbdGroup>
				</p>
			)}

			<Separator className="my-5 bg-[#c6b083]" />

			{results.length === 0 ? (
				<Empty className="border border-[#c6b083] bg-[#f8efd6]/60">
					<EmptyHeader>
						<EmptyMedia variant="icon" className="bg-[#e7d9b2] text-[#6f5a3a]">
							<SearchX />
						</EmptyMedia>
						<EmptyTitle className="font-display text-[#2a3f73]">
							No projects found
						</EmptyTitle>
						<EmptyDescription className="text-[#6f5a3a]">
							Nothing in the menagerie matches “{q}”. Try another word, like
							“Qt”, “physics” or “C#”.
						</EmptyDescription>
					</EmptyHeader>
					<EmptyContent>
						<Button
							variant="ghost"
							className="xp-toolbar-btn border-[#b8ab86]"
							nativeButton={false}
							render={<Link to="/projects" />}
						>
							Show all projects
						</Button>
					</EmptyContent>
				</Empty>
			) : (
				<div className="flex flex-col gap-8">
					{visibleCategories.map((entry) => (
						<section key={entry.id}>
							<h2 className="mb-3 flex items-center gap-2 font-display text-lg font-bold text-[#2a3f73]">
								<CategoryIcon category={entry.id} className="size-5" />
								{entry.label}
								<span className="text-[12px] font-normal text-[#8a7350]">
									— {entry.description}
								</span>
							</h2>
							<div className="grid gap-3 sm:grid-cols-2">
								{results
									.filter((project) => project.category === entry.id)
									.map((project) => (
										<Link
											key={project.to}
											to={project.to}
											className="group outline-none"
										>
											<Card
												size="sm"
												className={`${parchmentCard} h-full transition group-hover:-translate-y-0.5 group-hover:ring-[#316ac5] group-focus-visible:ring-2 group-focus-visible:ring-[#316ac5]`}
											>
												<CardHeader>
													<CardTitle className="font-display text-[15px] font-bold text-[#1c3f94] group-hover:underline">
														{project.title}
													</CardTitle>
													<CardDescription className="font-serif text-[13px] text-[#6f5a3a] italic">
														{project.tagline}
													</CardDescription>
												</CardHeader>
												<CardFooter className="mt-auto flex-wrap gap-1 border-[#d8c69c] bg-[#efe2bf]/60">
													{project.tech.slice(0, 3).map((tech) => (
														<Badge
															key={tech}
															variant="outline"
															className="rounded-[3px] border-[#b8a273] bg-[#fffaf0]/70 text-[10px]"
														>
															{tech}
														</Badge>
													))}
													{project.year && (
														<Badge
															variant="secondary"
															className="rounded-[3px] text-[10px]"
														>
															{project.year}
														</Badge>
													)}
													{project.status === "in-progress" && (
														<Badge
															variant="destructive"
															className="rounded-[3px] text-[10px]"
														>
															WIP
														</Badge>
													)}
													<ChevronRight className="ml-auto size-4 text-[#9a6a1f] transition group-hover:translate-x-0.5" />
												</CardFooter>
											</Card>
										</Link>
									))}
							</div>
						</section>
					))}
				</div>
			)}
		</div>
	);
}
