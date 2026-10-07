import { createFileRoute } from "@tanstack/react-router";
import { ProjectPage } from "@/components/xp/project-page";

export const Route = createFileRoute("/projects/games/TheGame")({
	component: () => <ProjectPage to="/projects/games/TheGame" />,
});
