import { createFileRoute, Link } from "@tanstack/react-router";
import {
	Briefcase,
	Compass,
	GraduationCap,
	Mail,
	Newspaper,
	ScrollText,
	Trophy,
	UserRound,
} from "lucide-react";
import portrait from "@/assets/louis-etienne_messier.png";
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
import { Separator } from "@/components/ui/separator";
import { Section } from "@/components/xp/project-page";

const EMAIL = "louis-etienne.messier@outlook.com";

const school = [
	{
		title: "Bachelor in Software Engineering",
		place: "Laval University, Quebec City",
		years: "2023-2027",
		detail: "",
	},
	{
		title: "Computer Science & Mathematics",
		place: "CEGEP of Sherbrooke, Sherbrooke",
		years: "2021-2023",
		detail: "",
	},
];

const papers: { title: string; years: string; detail: string }[] = [];

const jobs: { title: string; place: string; years: string; detail: string }[] =
	[];

const extracurricular: {
	title: string;
	place: string;
	years: string;
	detail: string;
}[] = [];

function Entry({
	title,
	place,
	years,
	detail,
}: {
	title: string;
	place?: string;
	years?: string;
	detail?: string;
}) {
	return (
		<div>
			<div className="flex items-baseline justify-between gap-3">
				<p className="font-display font-bold text-[#2a3f73]">{title}</p>
				{years && (
					<p className="shrink-0 font-sans text-[12px] text-[#6f5a3a] tabular-nums">
						{years}
					</p>
				)}
			</div>
			{place && <p className="text-[13px] text-[#6f5a3a]">{place}</p>}
			{detail && <p>{detail}</p>}
		</div>
	);
}

export const Route = createFileRoute("/about/")({
	component: AboutPage,
});

function AboutPage() {
	return (
		<article className="mx-auto max-w-3xl px-5 py-6 sm:px-8">
			<Breadcrumb>
				<BreadcrumbList className="text-[12px] text-[#7a6440]">
					<BreadcrumbItem>
						<BreadcrumbLink render={<Link to="/projects" />}>
							Louis' Menagerie
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage className="text-[#3a2a16]">About</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>

			<header className="mt-5 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
				<figure className="shrink-0 rotate-[-2deg] rounded-[2px] border border-[#c6b083] bg-[#fbf4df] p-1.5 pb-5 shadow-[3px_4px_0_rgb(110_80_30/0.18)]">
					<img
						src={portrait}
						alt="Portrait of Louis-Étienne Messier"
						className="size-28 object-cover sepia-[.25]"
					/>
				</figure>
				<div className="min-w-0">
					<h1 className="font-display text-3xl font-bold text-[#2a3f73] [text-shadow:1px_1px_0_rgb(255_255_255/0.6)]">
						Welcome to Louis' Menagerie!
					</h1>
					<p className="mt-1 font-serif text-[15px] text-[#6f5a3a] italic">
						A weird modern art exhibition, or a slightly unhinged zoo of
						programming projects.
					</p>
					<div className="mt-2 flex flex-wrap gap-1.5">
						<Badge variant="secondary" className="rounded-[3px]">
							Software Engineering student
						</Badge>
						<Badge variant="outline" className="rounded-[3px] bg-white/40">
							Université Laval
						</Badge>
						<Badge variant="outline" className="rounded-[3px] bg-white/40">
							Québec, Canada
						</Badge>
					</div>
				</div>
			</header>

			<Separator className="my-5 bg-[#c6b083]" />

			<div className="flex flex-col gap-4 font-serif text-[15px] leading-relaxed">
				<Section icon={<ScrollText />} title="What is it?">
					<p>
						This website is a little menagerie of unique and strange programming
						projects I made. Don't be scared: you are only going to uncover
						school assignments and personal crazy ideas I turned into projects
						:)
					</p>
					<p>
						Feel free to dig through whatever you find interesting. What are you
						waiting for?
					</p>
				</Section>

				<Section icon={<UserRound />} title="Who am I?">
					<p>
						Name's Louis. I was born and raised in Québec, the awesome and
						mostly obscure French-speaking part of Canada, where I spent my
						childhood fighting polar bears and eating poutine.
					</p>
					<p>
						I'm currently studying Software Engineering at Université Laval. I'm
						just a passionate guy trying to better his knowledge of modern
						technology. Enjoy!
					</p>
				</Section>

				<Section icon={<GraduationCap />} title="School">
					{school.map((entry) => (
						<Entry key={entry.title} {...entry} />
					))}
				</Section>

				<Section icon={<Newspaper />} title="Papers">
					{papers.length === 0 ? (
						<p>No papers yet.</p>
					) : (
						papers.map((entry) => <Entry key={entry.title} {...entry} />)
					)}
				</Section>

				<Section icon={<Briefcase />} title="Jobs">
					{jobs.length === 0 ? (
						<p>No jobs listed yet.</p>
					) : (
						jobs.map((entry) => <Entry key={entry.title} {...entry} />)
					)}
				</Section>

				<Section icon={<Trophy />} title="Extracurricular">
					{extracurricular.length === 0 ? (
						<p>Nothing listed yet.</p>
					) : (
						extracurricular.map((entry) => (
							<Entry key={entry.title} {...entry} />
						))
					)}
				</Section>

				<Section icon={<Mail />} title="How to reach me?">
					<p>
						Complaints? Questions? Deep philosophical questions? The best way to
						get in touch is by email.
					</p>
					<Button
						variant="ghost"
						className="xp-toolbar-btn border-[#b8ab86] font-sans"
						nativeButton={false}
						render={(props) => <a {...props} href={`mailto:${EMAIL}`} />}
					>
						<Mail className="text-[#1f5fc4]" />
						{EMAIL}
					</Button>
				</Section>
			</div>

			<nav className="mt-8 flex justify-end border-t border-[#c6b083] pt-4">
				<Button
					variant="ghost"
					className="xp-toolbar-btn"
					nativeButton={false}
					render={<Link to="/projects" />}
				>
					<Compass />
					Dig in to the projects
				</Button>
			</nav>
		</article>
	);
}
