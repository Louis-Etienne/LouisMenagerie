import { createFileRoute } from "@tanstack/react-router";
import { ProjectPage } from "@/components/xp/project-page";

export const Route = createFileRoute("/projects/games/Nba2k")({
	component: () => <ProjectPage to="/projects/games/Nba2k" />,
});
