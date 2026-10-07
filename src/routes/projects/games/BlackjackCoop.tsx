import { createFileRoute } from "@tanstack/react-router";
import { ProjectPage } from "@/components/xp/project-page";

export const Route = createFileRoute("/projects/games/BlackjackCoop")({
	component: () => <ProjectPage to="/projects/games/BlackjackCoop" />,
});
